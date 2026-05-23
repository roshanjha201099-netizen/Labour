import { Users, TrendingUp } from 'lucide-react';

const customerBenefits = [
  'Quick access to local workers',
  'Easy comparison of nearby providers',
  'Direct communication without middlemen',
  'Saves time and effort',
];

const workerBenefits = [
  'Increase local visibility',
  'Get more customer leads',
  'Build a professional online presence',
  'Grow business without expensive marketing',
];

export function Benefits() {
  return (
    <section id="benefits" className="w-full border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          {/* For Customers */}
          <div className="flex flex-col gap-8 rounded-2xl border border-border bg-background p-8">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">For Customers</p>
                <h3 className="text-2xl font-bold text-foreground">Reliable local help without the middleman.</h3>
              </div>
            </div>

            <ul className="space-y-3">
              {customerBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-foreground/80">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* For Service Providers */}
          <div className="flex flex-col gap-8 rounded-2xl border border-border bg-background p-8">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-accent">For Service Providers</p>
                <h3 className="text-2xl font-bold text-foreground">More visibility, more trust, more business.</h3>
              </div>
            </div>

            <ul className="space-y-3">
              {workerBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-foreground/80">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
