import { MessageSquare, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import hondaAccord from "@/assets/car-honda-accord.png";
import toyotaTacoma from "@/assets/car-toyota-tacoma.png";
import fordExplorer from "@/assets/car-ford-explorer.png";

const vehicles = [
  {
    image: hondaAccord,
    name: "2022 Honda Accord Sport",
    price: "$24,500",
    marketValue: "$28,900",
    profit: "+$4,400",
    profitPercent: "+18%",
    source: "Marketplace",
    sourceColor: "bg-blue-500",
  },
  {
    image: toyotaTacoma,
    name: "2021 Toyota Tacoma TRD",
    price: "$32,900",
    marketValue: "$38,200",
    profit: "+$5,300",
    profitPercent: "+16%",
    source: "Marketplace",
    sourceColor: "bg-blue-500",
    featured: true,
  },
  {
    image: fordExplorer,
    name: "2020 Ford Explorer XLT",
    price: "$28,750",
    marketValue: "$33,400",
    profit: "+$4,650",
    profitPercent: "+16%",
    source: "Craigslist",
    sourceColor: "bg-purple-500",
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
          {/* Floating notification - top left */}
          <div className="absolute -left-4 -top-4 z-20 animate-fade-in hidden md:block" style={{ animationDelay: "0.3s" }}>
            <Card className="glass-card p-3 shadow-xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">New message from seller</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </Card>
          </div>

          {/* Main vehicle cards grid */}
          <div className="grid gap-6 md:grid-cols-3 relative pt-8">
            {vehicles.map((vehicle, index) => (
              <Card 
                key={index}
                className={`hover-lift overflow-visible bg-card border-2 relative ${
                  vehicle.featured 
                    ? "border-primary/30 md:scale-105 md:-mt-4 md:mb-4 shadow-xl z-10" 
                    : ""
                }`}
              >
                {/* Vehicle image container - pops out of card */}
                <div className="relative -mt-8 mx-4">
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {vehicle.featured && (
                    <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Under Market
                    </Badge>
                  )}
                </div>

                <div className="p-4 pt-3">
                  <p className="text-primary font-semibold">{vehicle.name}</p>
                  <p className="text-2xl font-bold mt-1">{vehicle.price}</p>
                  
                  {/* Source badge */}
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="secondary" className={`${vehicle.sourceColor}/10 hover:${vehicle.sourceColor}/20`}>
                      <div className={`h-2 w-2 rounded-full ${vehicle.sourceColor} mr-1.5`} />
                      {vehicle.source}
                    </Badge>
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

          {/* Floating chat bubble - below cards, centered */}
          <div className="mt-12 flex justify-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Card className="glass-card p-4 shadow-xl max-w-sm animate-float">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-sm">👤</span>
                </div>
                <div>
                  <p className="text-sm bg-muted rounded-lg p-2 rounded-tl-none">
                    Yes, it's available. You're first in line, when can you come see it?
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-2 justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-2 text-sm rounded-tr-none">
                  I'll be there in 30 minutes
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
