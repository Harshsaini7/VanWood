// ===========================
// Testimonials Section Component
// Displays 3 customer review cards with star ratings, name, and quote.
// Cards have hover effects and a warm design.
// ===========================

import { FiStar } from "react-icons/fi";

// Placeholder testimonial data
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    quote:
      "The dining table we ordered is absolutely stunning! You can feel the quality in every detail. Our guests always compliment it. Truly a masterpiece from Saharanpur.",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Rahul Gupta",
    location: "Mumbai",
    rating: 5,
    quote:
      "I was skeptical about ordering furniture online, but VanWood exceeded all expectations. The bookshelf is gorgeous and the delivery was smooth. Highly recommend!",
    avatar: "RG",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore",
    rating: 4,
    quote:
      "Beautiful carved mirror for our living room. The craftsmanship is incredible — you can see the artisan's dedication. Will definitely order more pieces.",
    avatar: "AP",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            ⭐ Reviews
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-darkwood mb-4">
            What Our Customers Say
          </h2>
          <p className="text-primary/50 max-w-xl mx-auto">
            Don&apos;t take our word for it — hear from the families who brought
            VanWood into their homes.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-2xl p-7 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-beige/50"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={16}
                    className={
                      i < testimonial.rating
                        ? "text-gold fill-gold"
                        : "text-beige"
                    }
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-primary/70 leading-relaxed mb-6 text-sm sm:text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-beige">
                {/* Avatar Circle */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                  <span className="text-cream text-sm font-bold">
                    {testimonial.avatar}
                  </span>
                </div>

                {/* Name & Location */}
                <div>
                  <h4 className="font-semibold text-darkwood text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-primary/40 text-xs">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
