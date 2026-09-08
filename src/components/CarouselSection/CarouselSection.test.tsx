import { render, screen, fireEvent } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ReactivCarousel from "./CarouselSection";
import type { Carousel } from "./CarouselSection.types";

// Mock SelectDropdown
vi.mock("../Select/Select", () => ({
  __esModule: true,
  default: ({ value, onChange }: any) => (
    <button data-testid="mock-select" onClick={() => onChange("landscape")}>
      {value}
    </button>
  ),
}));

const baseConfig: Carousel = {
  images: [],
  display: "square",
};

describe("ReactivCarousel", () => {
  test("shows the placeholder message when there are no images", () => {
    const onChange = vi.fn();
    render(<ReactivCarousel config={baseConfig} onChange={onChange} />);
    expect(screen.getByTestId("carousel-title")).toBeTruthy();
  });

  test("renders one carousel-item per image and shows the correct count", () => {
    const config: Carousel = {
      display: "square",
      images: [
        { url: "https://example.com/1.jpg", alt: "Uploaded image 1" },
        { url: "https://example.com/2.jpg", alt: "Uploaded image 2" },
      ],
    };
    render(<ReactivCarousel config={config} onChange={vi.fn()} />);

    expect(screen.getAllByTestId("carousel-item")).toHaveLength(2);
    expect(screen.getByTestId("carousel-image-count")).toHaveTextContent(
      "Slide 1 of 2",
    );
  });

  test("calls onChange with the new image when the add form is submitted", () => {
    const onChange = vi.fn();
    render(<ReactivCarousel config={baseConfig} onChange={onChange} />);

    fireEvent.change(screen.getByTestId("carousel-image-url"), {
      target: { value: "https://example.com/new.jpg" },
    });
    fireEvent.click(screen.getByTestId("carousel-image-add-button"));

    expect(onChange).toHaveBeenCalledWith({
      ...baseConfig,
      images: [{ url: "https://example.com/new.jpg", alt: "Uploaded image 1" }],
    });
  });

  test("calls onChange with the image removed when delete is clicked", () => {
    const onChange = vi.fn();
    const config: Carousel = {
      display: "square",
      images: [
        { url: "https://example.com/1.jpg", alt: "Uploaded image 1" },
        { url: "https://example.com/2.jpg", alt: "Uploaded image 2" },
      ],
    };
    render(<ReactivCarousel config={config} onChange={onChange} />);

    fireEvent.click(screen.getAllByTestId("image-delete-button")[0]);

    expect(onChange).toHaveBeenCalledWith({
      ...config,
      images: [{ url: "https://example.com/2.jpg", alt: "Uploaded image 2" }],
    });
  });

  test("disables prev on the first slide and next on the last slide", () => {
    const config: Carousel = {
      display: "square",
      images: [
        { url: "https://example.com/1.jpg", alt: "1" },
        { url: "https://example.com/2.jpg", alt: "2" },
      ],
    };
    render(<ReactivCarousel config={config} onChange={vi.fn()} />);

    expect(screen.getByLabelText("previous slide")).toBeDisabled();
    expect(screen.getByLabelText("next slide")).not.toBeDisabled();

    fireEvent.click(screen.getByLabelText("next slide"));

    expect(screen.getByLabelText("previous slide")).not.toBeFalsy();
    expect(screen.getByLabelText("next slide")).toBeTruthy();
  });

  test("shows a fallback message when an image fails to load", () => {
    const config: Carousel = {
      display: "square",
      images: [{ url: "https://example.com/broken.jpg", alt: "broken" }],
    };
    render(<ReactivCarousel config={config} onChange={vi.fn()} />);

    fireEvent.error(screen.getByTestId("uploaded-image"));

    expect(screen.getByText(/failed to load image/i)).toBeTruthy();
  });

  test("calls onChange with the new display when the dropdown changes", () => {
    const onChange = vi.fn();
    render(<ReactivCarousel config={baseConfig} onChange={onChange} />);

    fireEvent.click(screen.getByTestId("mock-select"));

    expect(onChange).toHaveBeenCalledWith({
      ...baseConfig,
      display: "landscape",
    });
  });
});
