import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "500+", label: "Dealerships Served" },
  { value: "$2.1M", label: "Saved in Auction Fees" },
  { value: "15,000+", label: "Vehicles Sourced" },
  { value: "4.9/5", label: "Customer Rating" },
];

const testimonials = [
  {
    quote: "Backlist has completely changed how we source inventory. We're finding better deals faster and saving a fortune on auction fees.",
    author: "Mike Johnson",
    role: "Owner, Johnson Auto Sales",
  },
  {
    quote: "The real-time alerts are a game-changer. We've acquired dozens of quality vehicles that we would have missed before.",
    author: "Sarah Chen",
    role: "GM, Premier Motors Group",
  },
];

export function SocialProof() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Stats */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary">{stat.value}</div>
              <div className="mt-2 text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author}>
              <CardContent className="p-6">
                <blockquote className="text-lg italic text-foreground">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
