import { useState } from "react";
import { 
  Bell, 
  Layers, 
  UserX, 
  SlidersHorizontal, 
  BarChart3, 
  Smartphone, 
  ArrowRight,
  Target,
  Lightbulb,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { DemoFormModal } from "@/components/DemoFormModal";

const features = [
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Get instant notifications the moment a vehicle matching your criteria is listed. Never miss a deal because you were too slow.",
  },
  {
    icon: Layers,
    title: "Multi-Platform Aggregation",
    description: "One dashboard for Facebook Marketplace, Craigslist, Autotrader, and Cars.com. Stop wasting hours browsing multiple sites.",
  },
  {
    icon: UserX,
    title: "Private Party Only",
    description: "Our smart filters automatically exclude dealer listings. Focus only on real private-party opportunities with better margins.",
  },
  {
    icon: SlidersHorizontal,
    title: "Smart Filters",
    description: "Set your exact criteria—year, make, model, price range, mileage, and location radius. See only what matters to your business.",
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description: "Understand local pricing trends and inventory levels. Make data-driven decisions on what to buy and when.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Access Backlist anywhere. Get alerts on your phone and respond to sellers while you're on the lot or at the auction.",
  },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To help independent dealers compete with the big players by giving them first access to private-party inventory at better prices.",
  },
  {
    icon: Lightbulb,
    title: "The Problem We Solve",
    description: "Auctions are expensive, competitive, and often leave dealers with slim margins. Private-party vehicles offer better deals—but finding them is time-consuming.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "We believe in transparency, speed, and putting dealers first. Every feature we build is designed to save you time and increase your profits.",
  },
];

const Features = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Powerful Features for <span className="text-primary">Smarter Sourcing</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Everything you need to find, track, and acquire private-party vehicles 
              before your competition.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="hover-lift">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About / Values Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Why We Built Backlist</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We understand the challenges independent dealers face every day.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to transform your sourcing?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              See these features in action with a personalized demo.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8 gap-2"
              onClick={() => setDemoModalOpen(true)}
            >
              Get a Demo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <DemoFormModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </Layout>
  );
};

export default Features;
