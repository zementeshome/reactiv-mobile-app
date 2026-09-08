import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { test, describe, expect, vi, beforeEach } from "vitest";
import Home from "./Home";

// Mock HomeContext
const mockAddSection = vi.fn();
const mockUpdateSection = vi.fn();
const mockDeleteSection = vi.fn();
const mockMoveSection = vi.fn();
const mockExportConfig = vi.fn();
const mockImportConfig = vi.fn();

vi.mock("../../Contexts/HomeContext", () => ({
  usePreview: () => ({
    sections: [
      { id: "1", type: "carousel", config: { images: [] } },
      { id: "2", type: "textarea", config: { title: "Hello" } },
    ],
    addSection: mockAddSection,
    updateSection: mockUpdateSection,
    deleteSection: mockDeleteSection,
    moveSection: mockMoveSection,
    exportConfig: mockExportConfig,
    importConfig: mockImportConfig,
  }),
}));

// Mock child components
vi.mock("../../components/CarouselSection/CarouselSection", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-carousel">Carousel Section</div>,
}));
vi.mock("../../components/TextareaSection/TextareaSection", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-textarea">Text Area Section</div>,
}));
vi.mock("../../components/CTASection/CTASection", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-cta">CTA Section</div>,
}));
vi.mock("../../components/MobilePreview/MobilePreview", () => ({
  __esModule: true,
  default: ({ children }: any) => (
    <div data-testid="mock-mobile-preview">{children}</div>
  ),
}));

describe("Home Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders navbar actions, title, and initial mock sections inside the preview", () => {
    render(<Home />);

    expect(screen.getByText("Home Screen Editor")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add a carousel/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add a text area/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add a button/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("mock-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("mock-textarea")).toBeInTheDocument();
  });

  test("triggers addSection with the proper type strings when clicked", () => {
    render(<Home />);

    fireEvent.click(screen.getByRole("button", { name: /add a carousel/i }));
    expect(mockAddSection).toHaveBeenCalledWith("carousel");

    fireEvent.click(screen.getByRole("button", { name: /add a text area/i }));
    expect(mockAddSection).toHaveBeenCalledWith("textarea");
  });

  test("calls moveSection context handlers when up/down arrangement keys are pressed", () => {
    render(<Home />);

    const moveUpButtons = screen.getAllByRole("button", { name: "move up" });
    const moveDownButtons = screen.getAllByRole("button", {
      name: "move down",
    });

    expect(moveUpButtons[0]).toBeDisabled();

    fireEvent.click(moveDownButtons[0]);
    expect(mockMoveSection).toHaveBeenCalledWith(0, 1);
  });

  test("triggers deleteSection context function when the removal button is clicked", () => {
    render(<Home />);

    const deleteButtons = screen.getAllByRole("button", { name: "x" });
    fireEvent.click(deleteButtons[0]);

    expect(mockDeleteSection).toHaveBeenCalledWith("1");
  });

  test("validates file structures and outputs alerts on broken import JSON schema", async () => {
    render(<Home />);

    const fileInput = screen.getByTestId("import-input");

    const invalidFile = new File(
      [JSON.stringify({ version: 1, sections: "not-an-array" })],
      "corrupted.json",
      { type: "application/json" },
    );

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    await waitFor(() => {
      expect(screen.getByTestId("import-error")).toHaveTextContent(
        "This file isn't a valid preview configuration.",
      );
    });
    expect(mockImportConfig).not.toHaveBeenCalled();
  });
});
