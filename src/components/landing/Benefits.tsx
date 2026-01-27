import { Zap, DollarSign, Users, Clock, Shield, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

export function Benefits() {
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
