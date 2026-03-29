import { useState } from "react";
import galleryBraids from "@/assets/gallery-braids-new.jpg";
import galleryBridal from "@/assets/gallery-bridal.jpg";
import galleryLounge from "@/assets/gallery-lounge.jpg";
import galleryNailart from "@/assets/gallery-nailart-new.jpg";
import galleryLocs from "@/assets/gallery-locs.jpg";
import galleryProducts from "@/assets/gallery-products.png";
import heroSalon from "@/assets/hero-salon.jpg";
import serviceHair from "@/assets/service-hair.jpg";
import { X } from "lucide-react";

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

const categories = ["All", "Hair", "Makeup", "Nails", "Interior"];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);

  return (
    <section className="py-24 px-6 bg-card" id="gallery">
      <div className="max-w-6xl mx-auto">
        <p className="text-center font-body text-gold tracking-[0.3em] uppercase text-sm mb-3">
          Portfolio
        </p>
        <h2 className="text-center font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
          Our Work
        </h2>
        <div className="divider-gold w-24 mx-auto mb-10" />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-body text-sm tracking-wide px-5 py-2 rounded-full border transition-all duration-300 ${
                filter === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-gold hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-ish grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div
              key={img.alt}
              className="break-inside-avoid overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-espresso/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-cream/70 hover:text-cream transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={filtered[lightbox].src}
            alt={filtered[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
