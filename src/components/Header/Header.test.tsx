import { render, screen } from "@testing-library/react";
import { test, describe, expect } from "vitest";
import Header from "./Header";

describe("Header Component", () => {
  test("renders header component", () => {
    render(<Header header="Hello world" />);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeTruthy();
  });
});
