import { MessageSquare, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import hondaAccord from "@/assets/car-honda-accord.png";
import toyotaTacoma from "@/assets/car-toyota-tacoma.png";
import fordExplorer from "@/assets/car-ford-explorer.png";
import logoFacebook from "@/assets/logo-facebook.png";
import logoCarscom from "@/assets/logo-carscom.png";
import logoAutotrader from "@/assets/logo-autotrader.png";

const vehicles = [
  {
    image: hondaAccord,
    name: "2022 Honda Accord Sport",
    price: "$24,500",
    marketValue: "$28,900",
    profit: "+$4,400",
    profitPercent: "+18%",
    source: "Marketplace",
    sourceLogo: logoFacebook,
    sourceColor: "bg-blue-500",
  },
  {
    image: toyotaTacoma,
    name: "2021 Toyota Tacoma TRD",
    price: "$32,900",
    marketValue: "$38,200",
    profit: "+$5,300",
    profitPercent: "+16%",
    source: "Cars.com",
    sourceLogo: logoCarscom,
    sourceColor: "bg-orange-500",
    featured: true,
  },
  {
    image: fordExplorer,
    name: "2020 Ford Explorer XLT",
    price: "$28,750",
    marketValue: "$33,400",
    profit: "+$4,650",
    profitPercent: "+16%",
    source: "Autotrader",
    sourceLogo: logoAutotrader,
    sourceColor: "bg-red-500",
  },
];

export function ProductPreview() {
  return (
    <section className="section-padding bg-muted/30 overflow-hidden">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            See deals the moment they drop
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Track new listings, price changes, and market opportunities in real-time—so you catch deals before other dealers do.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative mx-auto max-w-5xl">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-3xl blur-3xl -z-10" />

          {/* Main vehicle cards grid */}
          <div className="grid gap-6 md:grid-cols-3 relative pt-6 md:pt-8">
            {vehicles.map((vehicle, index) => (
              <Card
                key={index}
                className={`hover-lift bg-card border-2 relative ${
                  vehicle.featured
                    ? "border-primary/30 md:scale-105 shadow-xl z-10"
                    : ""
                } ${index === 0 ? "overflow-visible" : "overflow-hidden"}`}
              >
                {/* Vehicle image container */}
                <div className="relative">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-auto object-contain bg-muted/30"
                  />
                  {vehicle.featured && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Under Market
                    </Badge>
                  )}
                  {/* Floating notification on first card */}
                  {index === 0 && (
                    <div className="absolute -top-3 -left-3 z-20 hidden md:block">
                      <Card className="glass-card p-2 shadow-xl flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">New message from seller</p>
                          <p className="text-[10px] text-muted-foreground">Just now</p>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>

                <div className="p-4 pt-3">
                  <p className="text-primary font-semibold">{vehicle.name}</p>
                  <p className="text-2xl font-bold mt-1">{vehicle.price}</p>

                  {/* Source badge */}
                  <div className="flex items-center gap-2 mt-2">
                    <img src={vehicle.sourceLogo} alt={vehicle.source} className="h-4 w-auto" />
                    <span className="text-sm text-muted-foreground">{vehicle.source}</span>
                  </div>

                  {/* Market Value & Profit */}
                  <div className="mt-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Est. Market Value</span>
                      <span className="font-semibold">{vehicle.marketValue}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1.5">
                      <span className="text-muted-foreground">Potential Profit</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-accent">{vehicle.profit}</span>
                        <Badge variant="secondary" className="bg-accent/20 text-accent text-xs px-1.5 py-0">
                          {vehicle.profitPercent}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex justify-center">
            <div className="bg-card/80 backdrop-blur border shadow-lg rounded-full px-6 py-3 flex items-center gap-6 md:gap-10">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">47</p>
                <p className="text-xs text-muted-foreground">Deals Today</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold">$4,783</p>
                <p className="text-xs text-muted-foreground">Avg. Profit</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">17%</p>
                <p className="text-xs text-muted-foreground">Below Market</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
