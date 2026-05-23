import { Check } from 'lucide-react';

const features = [
  'Find nearby trusted service providers',
  'Direct booking through Call or WhatsApp',
  'Easy profile creation for workers',
  'Location-based service discovery',
  'Fast and hassle-free communication',
  'Multiple service categories supported',
];

export function Features() {
  return (
    <section id="features" className="w-full border-t border-border bg-card/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-24">
        <div className="flex flex-col gap-4">
          <div className="w-fit text-sm font-semibold text-primary">Core Value</div>
          <h2 className="text-balance text-4xl font-bold text-foreground md:text-5xl">
            Simple, direct, and built for immediate help.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature}
              className="group flex gap-4 rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:bg-background/50"
            >
              <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <p className="text-foreground/80">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
