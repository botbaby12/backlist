import { Bell, Wifi, WifiOff, Trash2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { AlertCard } from "@/components/AlertCard";
import { useAlerts } from "@/hooks/useAlerts";

export default function AlertsPage() {
  const { alerts, isConnected, clearAlerts, dismissAlert } = useAlerts();

  return (
    <AppLayout>
      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Live Alerts</h1>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-muted">
              {isConnected ? (
                <>
                  <Wifi className="h-3 w-3 text-primary" />
                  <span className="text-primary">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-destructive" />
                  <span className="text-destructive">Disconnected</span>
                </>
              )}
            </div>
          </div>
          
          {alerts.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAlerts}>
              <Trash2 className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-medium text-muted-foreground">
              No alerts yet
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              New deals will appear here in real-time
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onDismiss={dismissAlert}
              />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
