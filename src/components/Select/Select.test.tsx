import { render, screen, fireEvent } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import SelectDropdown from "./Select";
import type { Display } from "../CarouselSection/CarouselSection.types";

// Mock select components
vi.mock("../../shadcn-ui-components/select", () => {
  let globalOnValueChange: (val: string) => void;

  return {
    Select: ({ children, onValueChange }: any) => {
      globalOnValueChange = onValueChange;
      return <div data-testid="mock-select">{children}</div>;
    },
    SelectTrigger: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    SelectValue: ({ placeholder }: any) => (
      <span data-testid="mock-select-value">{placeholder}</span>
    ),
    SelectContent: ({ children, className }: any) => (
      <div className={className}>{children}</div>
    ),
    SelectItem: ({ children, value }: any) => (
      <button
        data-testid="mock-select-item"
        value={value}
        onClick={() => globalOnValueChange(value)}
      >
        {children}
      </button>
    ),
  };
});

vi.mock("../CarouselSection/CarouselSection.types", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("../CarouselSection/CarouselSection.types")
    >();
  return {
    ...actual,
    displayOptions: ["square", "landscape", "portrait"] as Display[],
  };
});

describe("SelectDropdown", () => {
  test("renders the dropdown trigger and placeholder text", () => {
    render(<SelectDropdown value="square" onChange={vi.fn()} />);

    const trigger = screen.getByLabelText("image-orientation-dropdown");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveClass("w-[11.25rem]");
    expect(screen.getByTestId("mock-select-value")).toHaveTextContent(
      "Select a display",
    );
  });

  test("renders all image orientation options", () => {
    render(<SelectDropdown value="square" onChange={vi.fn()} />);

    const items = screen.getAllByTestId("mock-select-item");
    expect(items).toHaveLength(3);

    expect(items[0]).toHaveTextContent("Square");
    expect(items[1]).toHaveTextContent("Landscape");
    expect(items[2]).toHaveTextContent("Portrait");
  });

  test("calls onChange with the correct value when an option is clicked", () => {
    const onChange = vi.fn();
    render(<SelectDropdown value="square" onChange={onChange} />);

    const landscapeOption = screen.getByRole("button", { name: "Landscape" });
    fireEvent.click(landscapeOption);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("landscape");
  });
});
