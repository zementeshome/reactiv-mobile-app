import { render, screen, fireEvent } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import TextareaSection from "./TextareaSection";
import type { TextArea } from "../CarouselSection/CarouselSection.types";

// Mock Popover component
vi.mock("../Popover/Popover", () => ({
  __esModule: true,
  default: ({ content1, content2, cta1Text, cta2Text }: any) => (
    <div data-testid="mock-popover">
      <span>{cta1Text}</span>
      <div data-testid="popover-panel-1">{content1}</div>
      <span>{cta2Text}</span>
      <div data-testid="popover-panel-2">{content2}</div>
    </div>
  ),
}));

const baseConfig: TextArea = {
  title: "Hello World",
  description: "This is a description",
  titleColor: "#ffffff",
  descriptionColor: "#4b5563",
};

describe("TextareaSection", () => {
  test("renders text headings and form inputs with initial values", () => {
    render(<TextareaSection config={baseConfig} onChange={vi.fn()} />);

    const titleElement = screen.getByTestId("textarea-title");
    const descElement = screen.getByTestId("textarea-description");

    expect(titleElement).toHaveTextContent("Hello World");
    expect(titleElement).toHaveStyle({ color: "#ffffff" });
    expect(descElement).toHaveTextContent("This is a description");
    expect(descElement).toHaveStyle({ color: "#4b5563" });

    expect(screen.getByPlaceholderText("Title")).toHaveValue("Hello World");
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      "This is a description",
    );
  });

  test("hides preview headers if title or description properties are empty strings", () => {
    const emptyConfig: TextArea = {
      title: "",
      description: "",
    };
    render(<TextareaSection config={emptyConfig} onChange={vi.fn()} />);

    expect(screen.queryByTestId("textarea-title")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("textarea-description"),
    ).not.toBeInTheDocument();
  });

  test("calls onChange callback when the Title input changes value", () => {
    const onChange = vi.fn();
    render(<TextareaSection config={baseConfig} onChange={onChange} />);

    const titleInput = screen.getByPlaceholderText("Title");
    fireEvent.change(titleInput, { target: { value: "New Title text" } });

    expect(onChange).toHaveBeenCalledWith({
      ...baseConfig,
      title: "New Title text",
    });
  });

  test("calls onChange callback when the Description textarea field changes value", () => {
    const onChange = vi.fn();
    render(<TextareaSection config={baseConfig} onChange={onChange} />);

    const textareaBox = screen.getByPlaceholderText("Description");
    fireEvent.change(textareaBox, {
      target: { value: "New Description layout block" },
    });

    expect(onChange).toHaveBeenCalledWith({
      ...baseConfig,
      description: "New Description layout block",
    });
  });

  test("calls onChange when custom color inputs inside the popovers trigger changes", () => {
    const onChange = vi.fn();
    render(<TextareaSection config={baseConfig} onChange={onChange} />);

    const titleColorInput = screen
      .getByTestId("popover-panel-1")
      .querySelector("input");
    if (titleColorInput) {
      fireEvent.change(titleColorInput, { target: { value: "#ff0000" } });
      expect(onChange).toHaveBeenCalledWith({
        ...baseConfig,
        titleColor: "#ff0000",
      });
    }

    const descColorInput = screen
      .getByTestId("popover-panel-2")
      .querySelector("input");
    if (descColorInput) {
      fireEvent.change(descColorInput, { target: { value: "#00ff00" } });
      expect(onChange).toHaveBeenCalledWith({
        ...baseConfig,
        descriptionColor: "#00ff00",
      });
    }
  });
});
