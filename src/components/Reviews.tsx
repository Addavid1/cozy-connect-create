import { Star } from "lucide-react";

const reviews = [
  {
    name: "Jaelis",
    rating: 5,
    text: "Nice place, will recommend if you want a cozy environment, respectful staffs and delicious food 😘",
    time: "3 years ago",
  },
  {
    name: "Adaeze O.",
    rating: 5,
    text: "My go-to spot for hair and makeup! The stylists really listen to what you want and deliver every time.",
    time: "1 year ago",
  },
  {
    name: "Tolu B.",
    rating: 4,
    text: "Beautiful salon with great attention to detail. The braiding was perfect and lasted weeks. Will be back!",
    time: "6 months ago",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i <= rating ? "text-gold fill-gold" : "text-muted-foreground/30"}`}
      />
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section className="py-24 px-6 bg-background" id="reviews">
      <div className="max-w-6xl mx-auto">
        <p className="text-center font-body text-gold tracking-[0.3em] uppercase text-sm mb-3">
          Testimonials
        </p>
        <h2 className="text-center font-display text-4xl md:text-5xl font-semibold text-foreground mb-2">
          What Our Clients Say
        </h2>
        <div className="flex items-center justify-center gap-3 mb-4">
          <StarRating rating={4} />
          <span className="font-display text-2xl text-foreground">4.4</span>
          <span className="text-muted-foreground text-sm font-body">(216 reviews)</span>
        </div>
        <div className="divider-gold w-24 mx-auto mb-16" />

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-card rounded-lg p-8 border border-border"
            >
              <StarRating rating={review.rating} />
              <p className="font-body text-muted-foreground mt-4 mb-6 leading-relaxed text-sm italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="font-display text-gold text-sm font-semibold">
                    {review.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-body text-foreground text-sm font-medium">{review.name}</p>
                  <p className="font-body text-muted-foreground text-xs">{review.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
