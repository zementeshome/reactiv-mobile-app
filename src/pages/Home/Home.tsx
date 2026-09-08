// Home.tsx
import React, { useState } from "react";
import type {
  Carousel,
  TextArea,
  CTA,
} from "../../components/CarouselSection/CarouselSection.types";
import ReactivCarousel from "../../components/CarouselSection/CarouselSection";
import TextaraSection from "../../components/TextareaSection/TextareaSection";
import CTASection from "../../components/CTASection/CTASection";
import { Button } from "../../shadcn-ui-components/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import Header from "../../components/Header/Header";
import MobilePreview from "../../components/MobilePreview/MobilePreview";
import { usePreview } from "../../Contexts/HomeContext";

const Home = () => {
  const {
    sections,
    addSection,
    updateSection,
    deleteSection,
    moveSection,
    exportConfig,
    importConfig,
  } = usePreview();

  const [importError, setImportError] = useState<string | null>(null);

  const handleExport = () => {
    const config = exportConfig();
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "preview-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);

        if (
          typeof parsed !== "object" ||
          parsed === null ||
          parsed.version !== 1 ||
          !Array.isArray(parsed.sections)
        ) {
          setImportError("This file isn't a valid preview configuration.");
          return;
        }

        const validTypes = ["carousel", "textarea", "cta"];
        const sectionsValid = parsed.sections.every(
          (s: any) =>
            typeof s.id === "string" &&
            validTypes.includes(s.type) &&
            typeof s.config === "object" &&
            s.config !== null,
        );

        if (!sectionsValid) {
          setImportError("This file contains invalid section data.");
          return;
        }

        importConfig(parsed);
        setImportError(null);
      } catch {
        setImportError("Couldn't read this file — make sure it's valid JSON.");
      }
    };
    reader.readAsText(file);

    e.target.value = ""; // allow re-importing the same filename later
  };

  return (
    <>
      <div
        className="flex flex-col items-center gap-6 mt-4 w-max m-auto w-full"
        data-testid="homepage"
      >
        <nav
          data-testid="homepage-nav"
          className="flex flex-wrap justify-center"
        >
          <ul className="sm:flex sm:mt-2">
            <li>
              <Button
                onClick={() => addSection("carousel")}
                className="font-mono"
              >
                Add a Carousel
              </Button>
            </li>
            <li>
              <Button
                onClick={() => addSection("textarea")}
                className="font-mono"
              >
                Add a Text Area
              </Button>
            </li>
            <li>
              <Button onClick={() => addSection("cta")} className="font-mono">
                Add a Button
              </Button>
            </li>
          </ul>
        </nav>
        <div
          className="flex gap-2 items-center"
          data-testid="import-export-section"
        >
          <Button
            onClick={handleExport}
            variant="outline"
            data-testid="export-button"
          >
            Export JSON
          </Button>
          <label>
            <input
              type="file"
              accept="application/json"
              onChange={handleImportFile}
              className="hidden"
              data-testid="import-input"
            />
            <Button asChild variant="outline">
              <span data-testid="import-button">Import JSON</span>
            </Button>
          </label>
        </div>
        {importError && (
          <p className="text-sm text-destructive" data-testid="import-error">
            {importError}
          </p>
        )}
        <MobilePreview>
          <div className="flex flex-col gap-4 w-full max-w-xs mt-2 sm:max-w-md">
            <Header header="Home Screen Editor" />
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="relative flex gap-5 flex-col sm:flex-row-reverse"
              >
                <div className="flex justify-center gap-3 pt-2 pl-[0.5rem]">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={index === 0}
                    onClick={() => moveSection(index, -1)}
                    aria-label="move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={index === sections.length - 1}
                    onClick={() => moveSection(index, 1)}
                    aria-label="move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="bg-red-200 text-red-600 hover:bg-red-300 border border-red-600"
                    onClick={() => deleteSection(section.id)}
                  >
                    x
                  </Button>
                </div>
                <div className="flex-1 relative">
                  {section.type === "carousel" && (
                    <ReactivCarousel
                      config={section.config as Carousel}
                      onChange={(config) => updateSection(section.id, config)}
                    />
                  )}
                  {section.type === "textarea" && (
                    <TextaraSection
                      config={section.config as TextArea}
                      onChange={(config) => updateSection(section.id, config)}
                    />
                  )}
                  {section.type === "cta" && (
                    <CTASection
                      config={section.config as CTA}
                      onChange={(config) => updateSection(section.id, config)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </MobilePreview>
      </div>
    </>
  );
};

export default Home;
