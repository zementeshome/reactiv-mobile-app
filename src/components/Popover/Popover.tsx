import { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../shadcn-ui-components/popover";
import { Button } from "../../shadcn-ui-components/button";

export type PopoverDropdownProps = {
  titleColor?: string;
  descriptionColor?: string;
  buttonTextColor?: string;
  buttonBackgroundColor?: string;
  content1: ReactNode;
  content2: ReactNode;
  cta1Text: string;
  cta2Text: string;
};

const PopoverDropdown = ({
  titleColor,
  descriptionColor,
  buttonTextColor,
  buttonBackgroundColor,
  cta1Text,
  cta2Text,
  content1,
  content2,
}: PopoverDropdownProps) => {
  const currentTitleColor = titleColor || "#ffffff";
  const currentDescColor = descriptionColor || "#4b5563";
  const currentTextColor = buttonTextColor || "#000000";
  const currentBackgroundColor = buttonBackgroundColor || "#ffffff";

  return (
    <div className="flex gap-2 mb-[3rem]" data-testid="popover-container">
      <Popover data-testid="popover">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 text-xs"
            data-testid="popover-button"
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full border border-muted"
              style={{
                backgroundColor: currentTitleColor || currentTextColor,
              }}
            />
            {cta1Text}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[7.1875rem] p-2 m-2"
          side="bottom"
          avoidCollisions={false}
          data-testid="popover-content"
        >
          {content1}
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild className="mb-2">
          <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
            <span
              className="h-3 w-3 shrink-0 rounded-full border border-muted"
              style={{
                backgroundColor: currentDescColor || currentBackgroundColor,
              }}
              data-testid="popover-button"
            />
            {cta2Text}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[7.1875rem] p-2 m-2"
          side="bottom"
          avoidCollisions={false}
          data-testid="popover-content"
        >
          {content2}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverDropdown;
