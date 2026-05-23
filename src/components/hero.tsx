import { useNavigate } from 'react-router-dom'
import { ArrowRight, Phone, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen w-full pt-16">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2">
            <span className="text-sm font-medium text-primary">Now available in your area</span>
          </div>

          <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Book skilled local workers in minutes.
          </h1>

          <p className="text-pretty max-w-2xl text-lg text-foreground/70">
            A minimal platform that connects customers with trusted electricians, plumbers, carpenters, and more. 
            Direct calls, no middlemen, real local help.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => navigate('/services')}
            >
              Explore Services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/services/technicians')}
            >
              For Service Providers
            </Button>
          </div>
        </div>

        <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
          <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">Direct Contact</h3>
            <p className="text-foreground/70">
              Call or message service providers directly. No apps, no sign-ups, just fast help.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">Location-Based</h3>
            <p className="text-foreground/70">
              Find trusted workers nearby. Compare profiles, rates, and availability instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
