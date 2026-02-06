const logos = [
  "Independent Dealers",
  "Auto Groups",
  "Multi-rooftop Stores",
  "Franchise Dealers",
  "Wholesale Operations",
];

export function TrustedBy() {
  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="container-wide">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by dealerships nationwide
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-lg font-semibold text-muted-foreground/60"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
