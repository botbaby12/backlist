import { Search, Bell, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Aggregate",
    description: "We scan Facebook Marketplace, Craigslist, Autotrader, and Cars.com for private-party listings in your area.",
  },
  {
    icon: Bell,
    title: "Alert",
    description: "Get instant notifications when vehicles matching your criteria hit the market—before your competition sees them.",
  },
  {
    icon: ShoppingCart,
    title: "Acquire",
    description: "Connect directly with sellers and close deals faster, without auction fees eating into your margins.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">How Backlist Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to source better inventory at lower costs.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border md:block" style={{ left: "75%" }} />
              )}
              <span className="mt-4 inline-block rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                Step {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
