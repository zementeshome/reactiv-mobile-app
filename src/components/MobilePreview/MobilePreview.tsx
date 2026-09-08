import React, { useEffect, useRef, ReactNode } from "react";
import { Card, CardContent } from "../../shadcn-ui-components/card";

export type MobilePreviewProps = {
  children: ReactNode;
};

const MobilePreview = ({ children }: MobilePreviewProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // wheel events inside the mobile preview

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Check if scroll is happening at the top or the bottom of the mobile preview
      const isAtTop = e.deltaY < 0 && scrollTop <= 0;
      const isAtBottom =
        e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 1;

      if (isAtTop || isAtBottom) {
        e.preventDefault();
      } else {
        container.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    // Passive: false allows the use of e.preventDefault()
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <Card
      className="relative mx-auto rounded-[2.75rem] w-[20rem] border-[0.875rem] border-zinc-950 bg-zinc-950 shadow-2xl overflow-hidden sm:w-[31.25rem]"
      data-testid="mobile-preview"
    >
      <CardContent
        ref={scrollContainerRef}
        className="px-[2rem] w-full h-[50rem] overflow-y-auto rounded-[1.875rem] bg-background relative [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        data-testid="mobile-preview-content"
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default MobilePreview;
