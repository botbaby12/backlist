import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoFormModal } from "@/components/DemoFormModal";

export function HeroSection() {
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
