import { Button } from "../../shadcn-ui-components/button";
import { Input } from "../../shadcn-ui-components/input";
import { Textarea } from "../../shadcn-ui-components/textarea";
import type { TextArea } from "../CarouselSection/CarouselSection.types";
import PopoverDropdown from "../Popover/Popover";

export type TextAreaSectionProps = {
  config: TextArea;
  onChange: (config: TextArea) => void;
};

const TextareaSection = ({ config, onChange }: TextAreaSectionProps) => {
  const { title, description, titleColor, descriptionColor } = config;
  const currentTitleColor = titleColor || "#ffffff";
  const currentDescColor = descriptionColor || "#4b5563";

  return (
    <div
      className="flex flex-col gap-4 w-full max-w-xs mx-auto mb-[6.5rem]"
      data-testid="textarea-container"
    >
      <div>
        {title && (
          <h2
            style={{ color: currentTitleColor }}
            className="text-xl font-bold transition-colors"
            data-testid="textarea-title"
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            style={{ color: currentDescColor }}
            className="whitespace-pre-wrap transition-colors"
            data-testid="textarea-description"
          >
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => onChange({ ...config, title: e.target.value })}
          data-testid="textarea-input"
          id="title-input"
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => onChange({ ...config, description: e.target.value })}
          data-testid="textarea-box"
          id="textarea"
        />
      </div>
      <PopoverDropdown
        content1={
          <Input
            type="color"
            value={currentTitleColor}
            onChange={(e) =>
              onChange({ ...config, titleColor: e.target.value })
            }
            className="h-8 w-full cursor-pointer p-0.5"
          />
        }
        content2={
          <Input
            type="color"
            value={currentDescColor}
            onChange={(e) =>
              onChange({ ...config, descriptionColor: e.target.value })
            }
            className="h-8 w-full cursor-pointer p-0.5"
            id="color-input"
          />
        }
        cta1Text="Title color"
        cta2Text="Desc color"
      />
    </div>
  );
};

export default TextareaSection;
