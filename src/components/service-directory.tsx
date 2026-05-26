import { Clock3, MapPin, MessageCircle, Phone, ShieldCheck, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { serviceData, slugifyService, type ServiceCategory } from '@/data/services'
import { cn } from '@/lib/utils'

type ServiceDirectoryProps = {
  activeService: ServiceCategory
}

export function ServiceDirectory({ activeService }: ServiceDirectoryProps) {
  return (
    <section className="w-full border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-24">
        <div className="flex flex-col gap-4">
          <div className="w-fit text-sm font-semibold text-primary">
            Service Directory
          </div>
          <h1 className="max-w-4xl text-balance text-4xl font-bold text-foreground md:text-5xl">
            One route. Different service data. Cleaner browsing experience.
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            This page template stays the same for every service. Only the
            service name, summary, and provider cards change.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {serviceData.map((category) => {
            const isActive = category.name === activeService.name

            return (
              <Link
                key={category.name}
                to={`/services/${slugifyService(category.name)}`}
                className={cn(
                  'rounded-xl border px-5 py-3 text-left text-base transition-all',
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-accent/40',
                )}
              >
                {category.name}
              </Link>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1.9fr]">
          <article className="rounded-3xl border border-border bg-card p-8 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.7)]">
            <div className="mb-6 flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                {activeService.name}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Dynamic service page
              </span>
            </div>

            <h2 className="text-3xl font-bold text-foreground">
              {activeService.name} near you
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {activeService.blurb}
            </p>
            <p className="mt-4 rounded-2xl border border-border bg-background/70 p-4 text-sm text-foreground/90">
              {activeService.highlight}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Pricing Snapshot
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {activeService.averageRate}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Response Window
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {activeService.responseWindow}
                </p>
              </div>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {activeService.providers.map((provider) => (
              <article
                key={provider.name}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/90 bg-card/95 p-6 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.72)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_-34px_rgba(15,23,42,0.82)]"
                style={{
                  boxShadow: `0 24px 70px -34px ${provider.avatar.color}33`,
                }}
              >
                <div
                  className="absolute inset-x-6 top-0 h-1 rounded-b-full opacity-90"
                  style={{
                    background: `linear-gradient(90deg, ${provider.avatar.color}, color-mix(in srgb, ${provider.avatar.color} 30%, white))`,
                  }}
                />

                <div
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `${provider.avatar.color}22`,
                  }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.4rem] border border-white/10 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
                      style={{
                        background: `linear-gradient(135deg, ${provider.avatar.color}, rgba(15, 23, 42, 0.92))`,
                      }}
                    >
                      {provider.avatar.initials}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Trusted provider
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-foreground">
                        {provider.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {provider.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-full border border-border bg-background/80 px-4 py-2 text-base font-medium text-foreground shadow-sm">
                    {provider.rate}
                  </div>
                </div>

                <div className="relative mt-6 rounded-[1.6rem] border border-border/80 bg-background/65 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Availability
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {provider.availability}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Starting rate
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {provider.rate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {provider.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="rounded-xl border-border/80 bg-background/55 px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 rounded-xl bg-background/45 px-3 py-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="text-foreground">{provider.rating}</span>
                    <span>{provider.jobs}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-background/45 px-3 py-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{provider.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-background/45 px-3 py-2">
                    <Clock3 className="h-4 w-4 text-primary" />
                    <span>{provider.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-background/45 px-3 py-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span>{provider.availability}</span>
                  </div>
                </div>

                <div className="mt-auto grid gap-3 pt-6 sm:grid-cols-2">
                  <Button
                    className="w-full rounded-2xl shadow-[0_12px_30px_-18px_rgba(0,0,0,0.55)]"
                    onClick={() => window.open(`tel:${provider.phone}`, '_self')}
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl bg-background/75"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`,
                        '_blank',
                        'noopener,noreferrer',
                      )
                    }
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
