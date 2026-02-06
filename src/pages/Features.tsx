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
  Heart,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import { useCalendly } from "@/hooks/useCalendly";
import hondaAccord from "@/assets/car-honda-accord.png";
import fordExplorer from "@/assets/car-ford-explorer.png";

const CALENDLY_URL = "https://calendly.com/bennett-english/backlist-io-demo";

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
  const { openCalendly } = useCalendly();

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Powerful Features for <span className="text-primary">Smarter Sourcing</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Everything you need to find, track, and acquire private-party vehicles
                before your competition.
              </p>
            </div>

            {/* Right side - Dynamic car showcase */}
            <div className="relative h-[480px] md:h-[520px]">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl blur-3xl" />

              {/* Main car card */}
              <div className="absolute top-0 left-0 right-0 mx-auto w-[90%] bg-card border-2 border-primary/20 shadow-2xl rounded-2xl overflow-hidden z-10">
                <div className="relative">
                  <img
                    src={hondaAccord}
                    alt="2022 Honda Accord Sport"
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-500 text-white border-0">
                      <span className="font-bold mr-1">f</span> Marketplace
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500/90 text-white border-0 animate-pulse">
                      NEW
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-primary font-semibold">2022 Honda Accord Sport</p>
                      <p className="text-2xl font-bold">$24,500</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Est. Value</p>
                      <p className="font-semibold text-muted-foreground line-through">$28,900</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge className="bg-accent/20 text-accent border border-accent/30">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +$4,400 profit
                    </Badge>
                    <Badge variant="outline" className="text-xs">4.2 mi away</Badge>
                  </div>
                </div>
              </div>

              {/* Secondary card - peeking from behind */}
              <div className="absolute -top-3 left-4 right-4 mx-auto w-[85%] h-12 bg-muted/50 border rounded-2xl -z-0" />

              {/* Floating notification */}
              <div className="absolute -left-4 top-1/2 bg-card border shadow-xl rounded-xl p-3 z-20 hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">New match found!</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
              </div>

              {/* Floating chat response */}
              <div className="absolute -right-4 bottom-20 bg-card border shadow-xl rounded-xl p-3 max-w-[180px] z-20 hidden md:block">
                <p className="text-xs text-muted-foreground mb-1">Seller:</p>
                <p className="text-sm">"Yes! You're first in line."</p>
                <div className="mt-2 bg-primary text-primary-foreground text-xs rounded-lg px-2 py-1 text-center">
                  Reply in 30s
                </div>
              </div>

              {/* Stats pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur border shadow-lg rounded-full px-4 py-2 flex items-center gap-4 z-20">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">18%</p>
                  <p className="text-[10px] text-muted-foreground">Below Market</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold">12s</p>
                  <p className="text-[10px] text-muted-foreground">Posted</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold text-green-500">#1</p>
                  <p className="text-[10px] text-muted-foreground">In Line</p>
                </div>
              </div>
            </div>
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
              onClick={() => openCalendly(CALENDLY_URL)}
            >
              Get a Demo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
