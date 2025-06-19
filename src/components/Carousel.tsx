import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Example usage of shadcn Card

interface CarouselProps {
  slides: React.ReactNode[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
}) => {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  console.log("Rendering Carousel with", slides.length, "slides");

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide, index) => (
          <div className="embla__slide flex-[0_0_100%] min-w-0" key={index}>
            <Card className="m-1 sm:m-2 md:m-4 h-full"> {/* Added h-full for consistent height if slides vary */}
              <CardContent className="flex aspect-video items-center justify-center p-2 sm:p-4 md:p-6">
                {slide}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* Consider adding Prev/Next buttons and Dots for better UX if needed */}
    </div>
  );
};

export default Carousel;