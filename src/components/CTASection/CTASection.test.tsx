import { render, screen, fireEvent } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import CTASection from "./CTASection";
import type { CTA } from "../CarouselSection/CarouselSection.types";

// Mock child components
vi.mock("../Popover/Popover", () => ({
  __esModule: true,
  default: ({ content1, content2, cta1Text, cta2Text }: any) => (
    <div data-testid="mock-popover">
      <span>{cta1Text}</span>
      {content1}
      <span>{cta2Text}</span>
      {content2}
    </div>
  ),
}));

// Mock urlChecker
const mockUrlChecker = vi.fn();
vi.mock("../../lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../lib/utils")>();
  return {
    ...actual,
    urlChecker: (url: string) => mockUrlChecker(url),
  };
});

const baseConfig: CTA = {
  label: "Click Me",
  href: "https://example.com",
  buttonBackgroundColor: "#ffffff",
  buttonTextColor: "#000000",
};

describe("CTASection", () => {
  test("renders component elements with correct initial data", () => {
    mockUrlChecker.mockReturnValue(true);
    render(<CTASection config={baseConfig} onChange={vi.fn()} />);
    const buttonLink = screen.getByRole("link", { name: "Click Me" });

    expect(buttonLink).toBeInTheDocument();
    expect(buttonLink).toHaveAttribute("href", "https://example.com");

    expect(screen.getByPlaceholderText("Button text")).toHaveValue("Click Me");
    expect(screen.getByPlaceholderText("Link URL")).toHaveValue(
      "https://example.com",
    );

    expect(
      screen.queryByText("Please enter a valid URL"),
    ).not.toBeInTheDocument();
  });

  test("calls onChange when the Button Text input changes", () => {
    mockUrlChecker.mockReturnValue(true);
    const onChange = vi.fn();
    render(<CTASection config={baseConfig} onChange={onChange} />);

    const labelInput = screen.getByPlaceholderText("Button text");
    fireEvent.change(labelInput, { target: { value: "New Label" } });

    expect(onChange).toHaveBeenCalledWith({
      ...baseConfig,
      label: "New Label",
    });
  });

  test("calls onChange when the Link URL input changes", () => {
    mockUrlChecker.mockReturnValue(true);
    const onChange = vi.fn();
    render(<CTASection config={baseConfig} onChange={onChange} />);

    const urlInput = screen.getByPlaceholderText("Link URL");
    fireEvent.change(urlInput, { target: { value: "https://newlink.com" } });

    expect(onChange).toHaveBeenCalledWith({
      ...baseConfig,
      href: "https://newlink.com",
    });
  });

  test("shows validation styling and message when URL is invalid", () => {
    mockUrlChecker.mockReturnValue(false); // Force invalid URL status
    render(<CTASection config={baseConfig} onChange={vi.fn()} />);

    expect(screen.getByText("Please enter a valid URL")).toBeInTheDocument();

    const urlInput = screen.getByPlaceholderText("Link URL");
    expect(urlInput).toHaveClass("border-red-800");
  });

  test("calls onChange when color pickers inside the popover are adjusted", () => {
    mockUrlChecker.mockReturnValue(true);
    const onChange = vi.fn();
    render(<CTASection config={baseConfig} onChange={onChange} />);

    const textColorPicker = screen.getByTestId("cta-text-color-picker");
    fireEvent.change(textColorPicker, { target: { value: "#ff0000" } });
    expect(onChange).toHaveBeenCalledWith({
      ...baseConfig,
      buttonTextColor: "#ff0000",
    });

    const bgColorPicker = screen.getByTestId("cta-background-color-picker");
    fireEvent.change(bgColorPicker, { target: { value: "#0000ff" } });
    expect(onChange).toHaveBeenCalledWith({
      ...baseConfig,
      buttonBackgroundColor: "#0000ff",
    });
  });
});
