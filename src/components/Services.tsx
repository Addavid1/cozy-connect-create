import hairImg from "@/assets/service-hair.jpg";
import makeupImg from "@/assets/service-makeup.jpg";
import nailsImg from "@/assets/service-nails.jpg";

const services = [
  {
    title: "Hair Styling",
    description: "Braids, weaves, treatments & custom styles for every occasion.",
    image: hairImg,
  },
  {
    title: "Makeup Artistry",
    description: "Flawless glam for events, bridal looks & everyday beauty.",
    image: makeupImg,
  },
  {
    title: "Nail Care",
    description: "Manicures, pedicures, gel nails & stunning nail art.",
    image: nailsImg,
  },
];

const Services = () => {
  return (
    <section className="py-24 px-6 bg-background" id="services">
      <div className="max-w-6xl mx-auto">
        <p className="text-center font-body text-gold tracking-[0.3em] uppercase text-sm mb-3">
          What We Offer
        </p>
        <h2 className="text-center font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
          Our Services
        </h2>
        <div className="divider-gold w-24 mx-auto mb-16" />

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-lg bg-card"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  width={640}
                  height={800}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-2xl text-cream mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-cream/70 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
