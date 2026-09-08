import { render, screen } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import PopoverDropdown from "./Popover";

// Mock Popover components
vi.mock("../../shadcn-ui-components/popover", () => ({
  Popover: ({ children }: any) => (
    <div data-testid="mock-popover">{children}</div>
  ),
  PopoverTrigger: ({ children }: any) => (
    <div data-testid="mock-trigger">{children}</div>
  ),
  PopoverContent: ({ children, className }: any) => (
    <div data-testid="mock-content" className={className}>
      {children}
    </div>
  ),
}));

// Mock Button component
vi.mock("../../shadcn-ui-components/button", () => ({
  Button: ({ children, className, style, ...props }: any) => (
    <button className={className} style={style} {...props}>
      {children}
    </button>
  ),
}));

describe("PopoverDropdown", () => {
  const baseProps = {
    cta1Text: "Text Color",
    cta2Text: "Bg Color",
    content1: <div data-testid="test-content-1">Content One</div>,
    content2: <div data-testid="test-content-2">Content Two</div>,
  };

  test("renders both popover triggers with correct text labels", () => {
    render(<PopoverDropdown {...baseProps} />);

    expect(
      screen.getByRole("button", { name: /text color/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /bg color/i }),
    ).toBeInTheDocument();
  });

  test("projects custom content nodes into their respective popover sheets", () => {
    render(<PopoverDropdown {...baseProps} />);

    expect(screen.getByTestId("test-content-1")).toBeInTheDocument();
    expect(screen.getByText("Content One")).toBeInTheDocument();

    expect(screen.getByTestId("test-content-2")).toBeInTheDocument();
    expect(screen.getByText("Content Two")).toBeInTheDocument();
  });

  test("applies provided fallback colors to indicator dots", () => {
    render(<PopoverDropdown {...baseProps} />);

    const buttons = screen.getAllByRole("button");

    const dot1 = buttons[0].querySelector("span");
    expect(dot1).toHaveStyle({ backgroundColor: "#ffffff" });

    const dot2 = buttons[1].querySelector("span");
    expect(dot2).toHaveStyle({ backgroundColor: "#4b5563" });
  });

  test("overrides default fallback colors when explicit color props are passed", () => {
    const customProps = {
      ...baseProps,
      titleColor: "#ff0000",
      descriptionColor: "#00ff00",
    };
    render(<PopoverDropdown {...customProps} />);

    const buttons = screen.getAllByRole("button");

    const dot1 = buttons[0].querySelector("span");
    expect(dot1).toHaveStyle({ backgroundColor: "#ff0000" });

    const dot2 = buttons[1].querySelector("span");
    expect(dot2).toHaveStyle({ backgroundColor: "#00ff00" });
  });
});
