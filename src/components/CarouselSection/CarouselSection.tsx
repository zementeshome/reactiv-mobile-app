import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../../shadcn-ui-components/card";
import { Input } from "../../shadcn-ui-components/input";
import { Button } from "../../shadcn-ui-components/button";
import type { ReactivCarouselProps } from "./CarouselSection.types";
import type { Display } from "./CarouselSection.types";
import { cn } from "../../lib/utils";
import SelectDropdown from "../Select/Select";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import clsx from "clsx";

const ReactivCarousel = (props: ReactivCarouselProps) => {
  const { config, onChange, className } = props;
  const { images, display } = config;
  const [hasError, setHasError] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src =
      "https://images.unsplash.com/photo-1568145675395-66a2eda0c6d7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhdGVyfGVufDB8fDB8fHww";

    setHasError(true);
  };

  // Clamp the index whenever images shrink after adding more or deleting

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, Math.max(images.length - 1, 0)));
  }, [images.length]);

  // Go to the newest image whenever a new one is added
  const prevLengthRef = useRef(images.length);
  useEffect(() => {
    if (images.length > prevLengthRef.current) {
      setCurrentIndex(images.length - 1);
    }
    prevLengthRef.current = images.length;
  }, [images.length]);

  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const goNext = () =>
    setCurrentIndex((i) => Math.min(i + 1, images.length - 1));

  // Handle form submission locally, then pass data to the parent
  const handleAddImage = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    onChange({
      ...config,
      images: [
        ...images,
        { url: inputUrl, alt: `Uploaded image ${images.length + 1}` },
      ],
    });

    setInputUrl("");
  };

  const handleDeleteImage = (index: number) => {
    onChange({ ...config, images: images.filter((_, i) => i !== index) });
  };

  // Image orientation change
  const handleDisplayChange = (newDisplay: Display) => {
    onChange({ ...config, display: newDisplay });
  };

  // Image display settings
  const displaySettings: Record<Display, string> = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[16/9]",
    square: "aspect-square",
  };

  const currentDisplay = displaySettings[display];

  return (
    <div
      className="mx-auto w-[10rem] mb-[6.5rem] sm:w-[12.5rem]"
      data-testid="carousel-container"
    >
      <div data-testid="image-section">
        <div className="flex flex-col">
          {images.length > 0 ? (
            <div>
              <div className="relative flex-col" data-testid="carousel-section">
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={image.url}
                        className={cn("w-full shrink-0", className)}
                        data-testid="carousel-item"
                      >
                        <Card
                          className="relative m-[0.1rem] mb-[0.5rem]"
                          data-testid="card"
                        >
                          <CardContent
                            className={cn(
                              "flex items-center justify-center p-[0.5rem]",
                              currentDisplay,
                            )}
                            data-testid="card-content"
                          >
                            <img
                              src={image.url}
                              alt={image.alt}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover"
                              data-testid="uploaded-image"
                              onError={handleImageError}
                            />
                          </CardContent>
                        </Card>
                        <Button
                          type="button"
                          aria-label="delete"
                          size="sm"
                          className="bg-red-200 text-red-600 hover:bg-red-300 border border-red-600 mb-3 mt-2 text-[0.625rem] h-[1rem]"
                          onClick={() => handleDeleteImage(index)}
                          data-testid="image-delete-button"
                        >
                          Delete image
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute -left-12 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  aria-label="previous slide"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute -right-12 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                  onClick={goNext}
                  disabled={currentIndex === images.length - 1}
                  aria-label="next slide"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div
                className="pt-0 pb-[1rem] text-center text-xs text-muted-foreground"
                data-testid="carousel-image-count"
              >
                Slide {currentIndex + 1} of {images.length}
              </div>
            </div>
          ) : (
            <p
              className="text-center text-muted-foreground text-sm pb-3"
              data-testid="carousel-title"
            >
              Upload images for your carousel below.
            </p>
          )}
        </div>
      </div>
      <div data-testid="edit-section" className="flex flex-col-reverse">
        <SelectDropdown
          value={display}
          onChange={handleDisplayChange}
          data-testid="carousel-image-display-dropdown"
        />
        <form onSubmit={handleAddImage} className="flex gap-2 mb-3">
          <Input
            type="url"
            placeholder="URL here"
            value={inputUrl}
            onChange={(e) => {
              setInputUrl(e.target.value);
              setHasError(false);
            }}
            className={clsx("flex-1", {
              "border-2 border-red-800 p-4": hasError,
            })}
            required
            data-testid="carousel-image-url"
            id="input-value"
          />
          <Button
            type="submit"
            variant="outline"
            data-testid="carousel-image-add-button"
          >
            Add
          </Button>
        </form>
        {hasError && (
          <div className="flex items-center gap-1.5 text-xs text-destructive font-medium mb-3">
            <AlertCircle className="h-10 w-10 text-red-800" />
            <span className="text-left text-xs">
              Failed to load image. Loaded default backup image.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactivCarousel;
