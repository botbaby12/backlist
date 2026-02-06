import { ExternalLink, X, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DealBadge } from "@/components/DealBadge";
import { SourceIcon } from "@/components/SourceIcon";
import type { Listing } from "@/types/listing";

interface AlertCardProps {
  alert: Listing & { receivedAt: string };
  onDismiss: (id: string) => void;
}

export function AlertCard({ alert, onDismiss }: AlertCardProps) {
  const savings = alert.estimatedValue - alert.price;
  const timeAgo = getTimeAgo(alert.receivedAt);

  return (
    <Card className="relative overflow-hidden border-l-4 border-l-primary animate-in slide-in-from-right duration-300">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6"
        onClick={() => onDismiss(alert.id)}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <CardContent className="p-4">
        <div className="flex gap-4">
          {alert.imageUrl && (
            <img
              src={alert.imageUrl}
              alt={alert.title}
              className="w-24 h-24 object-cover rounded-md"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <SourceIcon source={alert.source} className="h-4 w-4" />
              <DealBadge grade={alert.dealGrade} />
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeAgo}
              </span>
            </div>
            
            <h3 className="font-semibold text-sm truncate">{alert.title}</h3>
            
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-bold text-primary">
                ${alert.price.toLocaleString()}
              </span>
              {savings > 0 && (
                <span className="text-xs font-medium text-primary/80">
                  Save ${savings.toLocaleString()}
                </span>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground mt-1">
              {alert.mileage.toLocaleString()} mi • {alert.location}
            </p>
            
            <Button
              variant="outline"
              size="sm"
              className="mt-2 h-7 text-xs"
              asChild
            >
              <a href={alert.originalUrl} target="_blank" rel="noopener noreferrer">
                View Listing <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getTimeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
