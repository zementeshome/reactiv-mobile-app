import { Input } from "../../shadcn-ui-components/input";
import { Button } from "../../shadcn-ui-components/button";
import type { CTA } from "../CarouselSection/CarouselSection.types";
import PopoverDropdown from "../Popover/Popover";
import { AlertCircle } from "lucide-react";
import { urlChecker } from "../../lib/utils";

interface CTASectionProps {
  config: CTA;
  onChange: (config: CTA) => void;
}

const CTASection = ({ config, onChange }: CTASectionProps) => {
  const { label, href, buttonBackgroundColor, buttonTextColor } = config;
  const currentTextColor = buttonTextColor || "#000000";
  const currentBackgroundColor = buttonBackgroundColor || "#ffffff";

  return (
    <div
      className="flex flex-col gap-3 w-full max-w-xs mx-auto mb-[6.5rem]"
      data-testid="cta-section"
    >
      <Button
        asChild
        className="m-auto bg-white text-black hover:bg-grey border border-black w-fit mb-2"
        size="sm"
        style={{
          color: buttonTextColor,
          backgroundColor: buttonBackgroundColor,
        }}
        data-testid="cta-user"
        onClick={(e) => !urlChecker(href) && e.preventDefault()}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label || "Button preview"}
        </a>
      </Button>
      <Input
        placeholder="Button text"
        value={label}
        onChange={(e) => onChange({ ...config, label: e.target.value })}
        key={crypto.randomUUID()}
      />
      <Input
        placeholder="Link URL"
        value={href}
        onChange={(e) => onChange({ ...config, href: e.target.value })}
        type="url"
        className={!urlChecker(href) ? "border-2 border-red-800 p-4" : ""}
        key={crypto.randomUUID()}
      />
      <div className="flex items-center gap-1.5 text-xs text-destructive font-medium">
        {!urlChecker(href) ? (
          <>
            <AlertCircle className="h-3 w-3 text-red-800" />
            <span className="text-left text-xs">Please enter a valid URL</span>
          </>
        ) : null}
      </div>
      <PopoverDropdown
        content1={
          <Input
            type="color"
            value={currentTextColor}
            onChange={(e) =>
              onChange({ ...config, buttonTextColor: e.target.value })
            }
            className="h-8 w-full cursor-pointer p-0.5"
            data-testid="cta-text-color-picker"
          />
        }
        content2={
          <Input
            type="color"
            value={currentBackgroundColor}
            onChange={(e) =>
              onChange({ ...config, buttonBackgroundColor: e.target.value })
            }
            className="h-8 w-full cursor-pointer p-0.5"
            data-testid="cta-background-color-picker"
          />
        }
        cta1Text="Text color"
        cta2Text="Bg color"
      />
    </div>
  );
};

export default CTASection;
