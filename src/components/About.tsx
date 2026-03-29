import { Sparkles, Heart, Users } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Premium Products", desc: "Only the finest beauty products for your skin and hair." },
  { icon: Heart, title: "Cozy Atmosphere", desc: "A warm, welcoming space designed for your comfort." },
  { icon: Users, title: "Expert Stylists", desc: "Respectful, skilled professionals who listen to you." },
];

const About = () => {
  return (
    <section className="py-24 px-6 bg-card" id="about">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-body text-gold tracking-[0.3em] uppercase text-sm mb-3">
          About Us
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
          Your Beauty, Our Passion
        </h2>
        <div className="divider-gold w-24 mx-auto mb-10" />
        <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-16">
          Imani Studio is a premier beauty salon located in Surulere, Lagos.
          We specialize in creating stunning looks in a cozy environment with
          respectful, professional staff. Whether it's a fresh hairstyle,
          flawless makeup, or beautiful nails — we've got you covered.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
