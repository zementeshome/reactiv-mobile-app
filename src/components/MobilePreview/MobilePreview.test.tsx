import React, { forwardRef } from "react";
import { render, screen } from "@testing-library/react";
import { test, describe, expect, vi } from "vitest";
import MobilePreview from "./MobilePreview";

// Mock Card components
vi.mock("../../shadcn-ui-components/card", () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  CardContent: forwardRef(
    ({ children, className, ...props }: any, ref: any) => (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    ),
  ),
}));

describe("MobilePreview", () => {
  test("renders the container and displays children correctly", () => {
    render(
      <MobilePreview>
        <div data-testid="test-child">Hello from inside the preview</div>
      </MobilePreview>,
    );

    expect(screen.getByTestId("mobile-preview")).toBeInTheDocument();

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(
      screen.getByText("Hello from inside the preview"),
    ).toBeInTheDocument();
  });

  test("scrolls container and prevents default on wheel events when in the middle of content", () => {
    render(
      <MobilePreview>
        <div style={{ height: "2000px" }}>Tall Content</div>
      </MobilePreview>,
    );

    const contentContainer = screen.getByTestId("mobile-preview-content");

    Object.defineProperties(contentContainer, {
      scrollTop: { value: 100, writable: true },
      clientHeight: { value: 800 },
      scrollHeight: { value: 2000 },
    });

    const wheelEvent = new WheelEvent("wheel", { deltaY: 50 });
    const preventDefaultSpy = vi.spyOn(wheelEvent, "preventDefault");

    contentContainer.dispatchEvent(wheelEvent);

    expect(contentContainer.scrollTop).toBe(150);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  test("prevents outer window scrolling when hitting the top scroll boundary", () => {
    render(
      <MobilePreview>
        <div>Content</div>
      </MobilePreview>,
    );

    const contentContainer = screen.getByTestId("mobile-preview-content");

    Object.defineProperties(contentContainer, {
      scrollTop: { value: 0 },
      clientHeight: { value: 800 },
      scrollHeight: { value: 2000 },
    });

    const wheelEvent = new WheelEvent("wheel", { deltaY: -50 });
    const preventDefaultSpy = vi.spyOn(wheelEvent, "preventDefault");

    contentContainer.dispatchEvent(wheelEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  test("prevents outer window scrolling when hitting the bottom scroll boundary", () => {
    render(
      <MobilePreview>
        <div>Content</div>
      </MobilePreview>,
    );

    const contentContainer = screen.getByTestId("mobile-preview-content");

    Object.defineProperties(contentContainer, {
      scrollTop: { value: 1200 },
      clientHeight: { value: 800 },
      scrollHeight: { value: 2000 },
    });

    const wheelEvent = new WheelEvent("wheel", { deltaY: 50 });
    const preventDefaultSpy = vi.spyOn(wheelEvent, "preventDefault");

    contentContainer.dispatchEvent(wheelEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
