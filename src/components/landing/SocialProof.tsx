
const stats = [
  { value: "$650", label: "Saved on Auction Fees" },
  { value: "$300", label: "Saved on Transport" },
  { value: "$800", label: "Lower Recon Costs" },
  { value: "$1,750+", label: "Total Per-Unit Savings" },
];

export function SocialProof() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <h2 className="text-3xl font-bold text-center mb-12">Average Per-Unit Savings</h2>
        {/* Stats */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary">{stat.value}</div>
              <div className="mt-2 text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
