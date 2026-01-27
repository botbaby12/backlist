import { MessageSquare, TrendingUp, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
          <div className="absolute -left-4 top-8 z-20 animate-fade-in hidden md:block" style={{ animationDelay: "0.3s" }}>
            <Card className="glass-card p-3 shadow-xl flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">New message from seller</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </Card>
          </div>

          {/* Main vehicle cards grid */}
          <div className="grid gap-6 md:grid-cols-3 relative">
            {/* Card 1 */}
            <Card className="hover-lift overflow-hidden bg-card border-2">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-6xl">🚗</div>
              </div>
              <div className="p-4">
                <p className="text-primary font-semibold">2022 Honda Accord Sport</p>
                <p className="text-2xl font-bold mt-1">$24,500</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>12 miles away</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-1" />
                    Marketplace
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Card 2 - Featured/Larger */}
            <Card className="hover-lift overflow-hidden bg-card border-2 border-primary/30 md:scale-105 md:-mt-4 md:mb-4 shadow-xl z-10">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                <div className="text-7xl">🛻</div>
                <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Under Market
                </Badge>
              </div>
              <div className="p-4">
                <p className="text-primary font-semibold">2021 Toyota Tacoma TRD</p>
                <p className="text-2xl font-bold mt-1">$32,900</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Posted 5 min ago</span>
                  </div>
                </div>
                <div className="mt-3 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Est. Market Value</span>
                    <span className="font-semibold text-green-500">$38,200</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Potential Profit</span>
                    <span className="font-bold text-green-500">+$5,300</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="hover-lift overflow-hidden bg-card border-2">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-6xl">🚙</div>
              </div>
              <div className="p-4">
                <p className="text-primary font-semibold">2020 Ford Explorer XLT</p>
                <p className="text-2xl font-bold mt-1">$28,750</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>8 miles away</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">
                    <div className="h-3 w-3 rounded-full bg-purple-500 mr-1" />
                    Craigslist
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Floating chat bubble - bottom right */}
          <div className="absolute -right-4 bottom-16 z-20 animate-fade-in hidden md:block" style={{ animationDelay: "0.5s" }}>
            <Card className="glass-card p-4 shadow-xl max-w-xs">
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
