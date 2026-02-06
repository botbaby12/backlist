import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendly } from "@/hooks/useCalendly";

const CALENDLY_URL = "https://calendly.com/bennett-english/backlist-io-demo";

export function CTASection() {
  const { openCalendly } = useCalendly();

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to find your next deal?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Join hundreds of dealerships already saving time and money with Backlist.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 gap-2"
            onClick={() => openCalendly(CALENDLY_URL)}
          >
            Book a Demo <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
