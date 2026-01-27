import { Card, CardContent } from "@/components/ui/card";
import logoFacebook from "@/assets/logo-facebook.png";
import logoCraigslist from "@/assets/logo-craigslist.png";
import logoAutotrader from "@/assets/logo-autotrader.png";
import logoCarscom from "@/assets/logo-carscom.png";

const sources = [
  { 
    name: "Facebook Marketplace", 
    logo: logoFacebook,
    description: "Private party listings"
  },
  { 
    name: "Craigslist", 
    logo: logoCraigslist,
    description: "Local classifieds"
  },
  { 
    name: "Autotrader", 
    logo: logoAutotrader,
    description: "Private sellers"
  },
  { 
    name: "Cars.com", 
    logo: logoCarscom,
    description: "Owner listings"
  },
];

export function DataSources() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">All Your Sources, One Dashboard</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop checking multiple sites. Backlist brings every private-party listing to you.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sources.map((source) => (
            <Card key={source.name} className="hover-lift border-2 group cursor-pointer">
              <CardContent className="flex flex-col items-center p-6">
                <div className="h-16 w-16 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden p-2">
                  <img 
                    src={source.logo} 
                    alt={`${source.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-center">{source.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{source.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Connection lines visual */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
              <span className="text-primary font-bold text-lg">→</span>
            </div>
            <div className="h-px w-16 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
        </div>
        <p className="text-center mt-4 text-muted-foreground">
          Aggregated into <span className="text-primary font-semibold">one powerful dashboard</span>
        </p>
      </div>
    </section>
  );
}
