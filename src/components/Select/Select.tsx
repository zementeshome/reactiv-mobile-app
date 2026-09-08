import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn-ui-components/select";
import type { Display } from "../CarouselSection/CarouselSection.types";
import { displayOptions } from "../CarouselSection/CarouselSection.types";

interface SelectDropdownProps {
  value: Display;
  onChange: (value: Display) => void;
}

const SelectDropdown = ({ value, onChange }: SelectDropdownProps) => {
  return (
    <Select
      value={value}
      onValueChange={(value: Display) => onChange(value)}
      data-testid="select"
    >
      <SelectTrigger
        className="w-[11.25rem]"
        data-testid="select-trigger"
        aria-label="image-orientation-dropdown"
      >
        <SelectValue
          placeholder="Select a display"
          data-testid="select-value"
        />
      </SelectTrigger>
      <SelectContent
        data-testid="select-content"
        className="static !position-static block w-full mt-1"
      >
        {displayOptions.map((option) => (
          <SelectItem key={option} value={option} data-testid="select-item">
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
