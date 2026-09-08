export type Image = {
  url: string;
  alt?: string;
  fallbackUrl?: string;
};

export const displayOptions = ["portrait", "landscape", "square"] as const;
export type Display = (typeof displayOptions)[number];

export type Carousel = {
  images: Image[];
  display: Display;
};

export type TextArea = {
  title: string;
  description: string;
  titleColor?: string;
  descriptionColor?: string;
};

export type CTA = {
  label: string;
  href: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
};
export const sectionOptions = ["carousel", "textarea", "cta"] as const;
export type SectionType = (typeof sectionOptions)[number];

export type SectionConfig = Carousel | TextArea | CTA;

export type Section<T extends SectionConfig = SectionConfig> = {
  id: string;
  type: SectionType;
  config: T;
};

// JSON for exporting/importing

export type HomeConfig = {
  version: 1;
  sections: Section[];
};

export type ReactivCarouselProps = {
  config: Carousel;
  onChange: (config: Carousel) => void;
  className?: string;
};
