import heroImage from "@/assets/hero-salon.jpg";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Imani Studio interior"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/50 to-espresso/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="font-body text-gold-light tracking-[0.35em] uppercase text-sm mb-4">
          Beauty & Wellness
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-cream mb-6 leading-tight">
          Imani Studio
        </h1>
        <div className="divider-gold w-32 mx-auto mb-6" />
        <p className="font-body text-cream/80 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
          Where beauty meets artistry. Experience luxury treatments in a cozy,
          welcoming atmosphere in the heart of Surulere, Lagos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            variant="default"
            size="lg"
            className="bg-gold-gradient text-primary-foreground font-body tracking-wide uppercase text-sm px-8 py-6 hover:opacity-90 transition-opacity"
            asChild
          >
            <a href="tel:08033609957">
              <Phone className="w-4 h-4 mr-2" />
              Book Now
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-gold-light/40 text-cream font-body tracking-wide uppercase text-sm px-8 py-6 hover:bg-cream/10 bg-transparent"
            asChild
          >
            <a
              href="https://maps.google.com/?q=10+Tafawa+Balewa+Cres+Surulere+Lagos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </a>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-cream/60 text-sm font-body">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gold" />
            10 Tafawa Balewa Cres, Surulere
          </span>
          <span className="hidden sm:block text-gold/30">|</span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            Mon–Sat · 9 AM – 7 PM
          </span>
          <span className="hidden sm:block text-gold/30">|</span>
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold" />
            0803 360 9957
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
