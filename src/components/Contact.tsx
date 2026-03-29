import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="py-24 px-6 bg-espresso" id="contact">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-body text-gold tracking-[0.3em] uppercase text-sm mb-3">
          Visit Us
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-cream mb-4">
          Get In Touch
        </h2>
        <div className="divider-gold w-24 mx-auto mb-14" />

        <div className="grid md:grid-cols-3 gap-10 mb-14">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-display text-lg text-cream mb-1">Location</h3>
            <p className="font-body text-cream/60 text-sm leading-relaxed">
              10 Tafawa Balewa Cres,<br />
              Surulere, Lagos 101283
            </p>
            <p className="font-body text-cream/40 text-xs mt-1">Located in: FCMB Adeniran Ogunsanya Branch</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-display text-lg text-cream mb-1">Phone</h3>
            <a href="tel:08033609957" className="font-body text-cream/60 text-sm hover:text-gold transition-colors">
              0803 360 9957
            </a>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-display text-lg text-cream mb-1">Hours</h3>
            <p className="font-body text-cream/60 text-sm leading-relaxed">
              Monday – Saturday<br />
              9:00 AM – 7:00 PM
            </p>
            <p className="font-body text-cream/40 text-xs mt-1">Closed on Sundays</p>
          </div>
        </div>

        <Button
          className="bg-gold-gradient text-primary-foreground font-body tracking-wide uppercase text-sm px-10 py-6 hover:opacity-90 transition-opacity"
          asChild
        >
          <a href="tel:08033609957">
            <Phone className="w-4 h-4 mr-2" />
            Call to Book Appointment
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Contact;
