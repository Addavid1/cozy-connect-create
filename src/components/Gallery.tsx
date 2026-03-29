import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CinemaAudience from "./CinemaAudience";
import galleryBraids from "@/assets/gallery-braids-new.jpg";
import galleryBridal from "@/assets/gallery-bridal.jpg";
import galleryLounge from "@/assets/gallery-lounge.jpg";
import galleryNailart from "@/assets/gallery-nailart-new.jpg";
import galleryLocs from "@/assets/gallery-locs.jpg";
import galleryProducts from "@/assets/gallery-products.png";
import heroSalon from "@/assets/hero-salon.jpg";
import serviceHair from "@/assets/service-hair.jpg";

const images = [
  { src: galleryBraids, alt: "Box braids styling", category: "Hair" },
  { src: galleryBridal, alt: "Bridal makeup glam", category: "Makeup" },
  { src: galleryLounge, alt: "Salon lounge area", category: "Interior" },
  { src: galleryNailart, alt: "Gold accent nail art", category: "Nails" },
  { src: galleryLocs, alt: "Styled locs updo", category: "Hair" },
  { src: galleryProducts, alt: "Premium beauty products", category: "Interior" },
  { src: heroSalon, alt: "Salon styling stations", category: "Interior" },
  { src: serviceHair, alt: "Professional braiding", category: "Hair" },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClapping, setIsClapping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [displayIndex, setDisplayIndex] = useState(0);

  const triggerTransition = useCallback(
    (newIndex: number, direction: "left" | "right") => {
      if (isTransitioning) return;
      setIsClapping(true);
      setIsTransitioning(true);
      setSlideDirection(direction);

      // After the film-reel bars come in, swap the image
      setTimeout(() => {
        setDisplayIndex(newIndex);
        setCurrentIndex(newIndex);
      }, 400);

      // After the transition completes, reset
      setTimeout(() => {
        setIsTransitioning(false);
        setIsClapping(false);
      }, 900);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    triggerTransition(newIndex, "right");
  }, [currentIndex, triggerTransition]);

  const goPrev = useCallback(() => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    triggerTransition(newIndex, "left");
  }, [currentIndex, triggerTransition]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  return (
    <section className="py-24 px-4 bg-card overflow-hidden" id="gallery">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <p className="text-center font-body text-gold tracking-[0.3em] uppercase text-sm mb-3">
          Portfolio
        </p>
        <h2 className="text-center font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
          Our Work
        </h2>
        <div className="divider-gold w-24 mx-auto mb-12" />

        {/* Cinema Theatre */}
        <div className="relative">
          {/* Theatre frame / proscenium arch */}
          <div className="relative mx-auto max-w-4xl">
            {/* Curtain drapes - decorative top */}
            <div className="absolute -top-4 left-0 right-0 h-8 z-10">
              <svg viewBox="0 0 800 32" className="w-full h-full" preserveAspectRatio="none">
                <path
                  d="M0,0 L800,0 L800,8 Q700,32 600,12 Q500,32 400,12 Q300,32 200,12 Q100,32 0,8 Z"
                  fill="hsl(30 30% 12%)"
                />
              </svg>
            </div>

            {/* Screen border */}
            <div
              className="relative rounded-lg border-4 overflow-hidden"
              style={{
                borderColor: "hsl(30 30% 12%)",
                boxShadow:
                  "0 0 60px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.15)",
              }}
            >
              {/* Film reel transition overlay */}
              <div
                className="absolute inset-0 z-20 pointer-events-none flex flex-col"
                style={{
                  opacity: isTransitioning ? 1 : 0,
                  transition: "opacity 0.15s ease",
                }}
              >
                {/* Horizontal film bars */}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{
                      backgroundColor: "hsl(30 30% 12%)",
                      transform: isTransitioning
                        ? `translateX(${slideDirection === "right" ? (i % 2 === 0 ? "0%" : "0%") : (i % 2 === 0 ? "0%" : "0%")})`
                        : `translateX(${slideDirection === "right" ? "105%" : "-105%"})`,
                      transition: `transform 0.35s cubic-bezier(0.65, 0, 0.35, 1) ${i * 0.06}s`,
                    }}
                  />
                ))}
              </div>

              {/* Sprocket holes overlay during transition */}
              {isTransitioning && (
                <div className="absolute inset-y-0 left-0 w-6 z-30 flex flex-col justify-around items-center pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: "hsl(30 15% 20%)", border: "1px solid hsl(30 10% 30%)" }}
                    />
                  ))}
                </div>
              )}
              {isTransitioning && (
                <div className="absolute inset-y-0 right-0 w-6 z-30 flex flex-col justify-around items-center pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: "hsl(30 15% 20%)", border: "1px solid hsl(30 10% 30%)" }}
                    />
                  ))}
                </div>
              )}

              {/* Grain texture overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                }}
              />

              {/* The gallery image */}
              <div className="aspect-[16/10] bg-espresso relative">
                <img
                  src={images[displayIndex].src}
                  alt={images[displayIndex].alt}
                  className="w-full h-full object-cover"
                  style={{
                    transition: "opacity 0.3s ease",
                  }}
                />

                {/* Vignette effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)",
                  }}
                />
              </div>
            </div>

            {/* Wooden floor / stage */}
            <div
              className="h-16 md:h-20 relative -mt-1"
              style={{
                background: `linear-gradient(180deg, hsl(25 35% 28%) 0%, hsl(25 30% 22%) 100%)`,
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
              }}
            >
              {/* Floor planks */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${(i / 12) * 100}%`,
                    width: "1px",
                    background: "hsl(25 20% 20% / 0.4)",
                  }}
                />
              ))}

              {/* Floor shine */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(35 30% 96% / 0.08) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Character on stage */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
              <SilhouetteCharacter isClapping={isClapping} />
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              disabled={isTransitioning}
              className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30"
              style={{
                backgroundColor: "hsl(30 30% 12% / 0.7)",
                backdropFilter: "blur(4px)",
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-cream" />
            </button>
            <button
              onClick={goNext}
              disabled={isTransitioning}
              className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30"
              style={{
                backgroundColor: "hsl(30 30% 12% / 0.7)",
                backdropFilter: "blur(4px)",
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-cream" />
            </button>
          </div>

          {/* Audience seats - faint shadows */}
          <div className="flex justify-center gap-1 mt-2 opacity-20">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="rounded-t-full"
                style={{
                  width: `${18 + Math.sin(i * 0.8) * 4}px`,
                  height: `${14 + Math.cos(i * 1.2) * 3}px`,
                  backgroundColor: "hsl(30 30% 12%)",
                  transform: `translateY(${Math.sin(i * 0.5) * 2}px)`,
                }}
              />
            ))}
          </div>
          <div className="flex justify-center gap-1 mt-0.5 opacity-10 px-8">
            {[...Array(19)].map((_, i) => (
              <div
                key={i}
                className="rounded-t-full"
                style={{
                  width: `${16 + Math.sin(i * 0.6) * 3}px`,
                  height: `${12 + Math.cos(i * 0.9) * 2}px`,
                  backgroundColor: "hsl(30 30% 12%)",
                  transform: `translateY(${Math.sin(i * 0.7) * 2}px)`,
                }}
              />
            ))}
          </div>

          {/* Image caption & counter */}
          <div className="text-center mt-6">
            <p className="font-display text-lg text-foreground">
              {images[displayIndex].alt}
            </p>
            <p className="font-body text-sm text-muted-foreground mt-1 tracking-wider">
              {displayIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
