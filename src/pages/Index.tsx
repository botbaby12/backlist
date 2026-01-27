import { useState } from "react";
import { ArrowRight, Search, Bell, ShoppingCart, Zap, DollarSign, Users, Clock, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DemoFormModal } from "@/components/DemoFormModal";
import { Layout } from "@/components/Layout";

// Hero Section
function HeroSection() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden section-padding">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Skip the auction.{" "}
              <span className="text-primary">Buy direct</span> from private sellers.
            </h1>
            <p className="mt-6 animate-fade-in text-lg text-muted-foreground sm:text-xl md:text-2xl" style={{ animationDelay: "0.1s" }}>
              Backlist aggregates private-party vehicle listings from Facebook Marketplace, 
              Craigslist, Autotrader, and Cars.com—so your dealership finds better deals first.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-fade-in sm:flex-row" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="gap-2" onClick={() => setDemoModalOpen(true)}>
                Get a Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <DemoFormModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </>
  );
}

// Trusted By Section
function TrustedBySection() {
  const logos = [
    "Independent Dealers",
    "Auto Groups",
    "Used Car Lots",
    "Franchise Dealers",
    "Buy Here Pay Here",
  ];

  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="container-wide">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by dealerships nationwide
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-lg font-semibold text-muted-foreground/60"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
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
              <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-x-1/2 bg-border md:block" style={{ left: "75%" }} />
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

// Data Sources Section
function DataSourcesSection() {
  const sources = [
    { name: "Facebook Marketplace", color: "bg-blue-500" },
    { name: "Craigslist", color: "bg-purple-500" },
    { name: "Autotrader", color: "bg-orange-500" },
    { name: "Cars.com", color: "bg-green-500" },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">All Your Sources, One Dashboard</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop checking multiple sites. Backlist brings every private-party listing to you.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sources.map((source) => (
            <Card key={source.name} className="hover-lift border-2">
              <CardContent className="flex flex-col items-center p-6">
                <div className={`h-12 w-12 rounded-lg ${source.color} flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white">
                    {source.name[0]}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold">{source.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Benefits Section
function BenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get alerts in real-time, not hours later. Be first to contact sellers.",
    },
    {
      icon: DollarSign,
      title: "Save Thousands",
      description: "Skip auction fees averaging $500-1,500 per vehicle. Keep more profit.",
    },
    {
      icon: Users,
      title: "Private Party Only",
      description: "Automatically filter out dealer listings. Focus on real opportunities.",
    },
    {
      icon: Clock,
      title: "Save Hours Daily",
      description: "Stop browsing four different sites. One dashboard does it all.",
    },
    {
      icon: Shield,
      title: "Verified Listings",
      description: "Smart filters remove duplicates and flag suspicious listings.",
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Access deals on the go. Never miss an opportunity.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Why Dealers Choose Backlist</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Built specifically for dealerships looking to source smarter.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Social Proof Section
function SocialProofSection() {
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

// CTA Section
function CTASection() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <>
      <section className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to find your next deal?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Join hundreds of dealerships already saving time and money with Backlist.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8 gap-2"
              onClick={() => setDemoModalOpen(true)}
            >
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <DemoFormModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </>
  );
}

// Main Homepage Component
const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustedBySection />
      <HowItWorksSection />
      <DataSourcesSection />
      <BenefitsSection />
      <SocialProofSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
