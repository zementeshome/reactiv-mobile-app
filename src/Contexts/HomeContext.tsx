// context/PreviewContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type {
  Section,
  SectionType,
  SectionConfig,
  Carousel as CarouselConfig,
  TextArea as TextAreaConfig,
  CTA as CTAConfig,
  HomeConfig,
} from "../components/CarouselSection/CarouselSection.types";

const STORAGE_KEY = "preview-screen-config";

const defaultConfigs: Record<SectionType, SectionConfig> = {
  carousel: { images: [], display: "square" } as CarouselConfig,
  textarea: { title: "", description: "" } as TextAreaConfig,
  cta: { label: "", href: "" } as CTAConfig,
};

interface PreviewContextValue {
  sections: Section[];
  addSection: (type: SectionType) => void;
  updateSection: (id: string, config: SectionConfig) => void;
  deleteSection: (id: string) => void;
  moveSection: (index: number, direction: -1 | 1) => void;
  exportConfig: () => HomeConfig;
  importConfig: (json: HomeConfig) => void;
}

const PreviewContext = createContext<PreviewContextValue | null>(null);

export const PreviewProvider = ({ children }: { children: ReactNode }) => {
  const [sections, setSections] = useState<Section[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: HomeConfig = JSON.parse(saved);
        return parsed.sections ?? [];
      }
    } catch {
      // Corrupt or missing data — fall back to empty
    }
    return [];
  });

  useEffect(() => {
    const config: HomeConfig = { version: 1, sections };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [sections]);

  const addSection = (type: SectionType) => {
    setSections((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type, config: defaultConfigs[type] },
    ]);
  };

  const updateSection = (id: string, config: SectionConfig) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, config } : s)),
    );
  };

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    setSections((prev) => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const exportConfig = (): HomeConfig => ({ version: 1, sections });

  const importConfig = (json: HomeConfig) => {
    setSections(json.sections);
  };

  return (
    <PreviewContext.Provider
      value={{
        sections,
        addSection,
        updateSection,
        deleteSection,
        moveSection,
        exportConfig,
        importConfig,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
};
