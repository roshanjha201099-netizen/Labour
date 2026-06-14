import { Activity, ShieldCheck, UserCog, Users } from 'lucide-react'

const overviewCards = [
  {
    title: 'Platform users',
    value: '12,480',
    detail: 'Customers and providers active this month.',
    icon: Users,
  },
  {
    title: 'Provider approvals',
    value: '86',
    detail: 'Applications waiting for admin review.',
    icon: UserCog,
  },
  {
    title: 'Trust checks',
    value: '98.7%',
    detail: 'Recent requests passing policy validation.',
    icon: ShieldCheck,
  },
  {
    title: 'Live activity',
    value: '214',
    detail: 'Open requests currently moving through the platform.',
    icon: Activity,
  },
]

export function AdminDashboardPage() {
  return (
    <section className="min-h-screen w-full border-t border-border bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.14),_transparent_28%),linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(10,14,25,1))]">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.75)]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Admin Control Room
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Monitor platform activity, review providers, and manage operations.
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            This admin route is the post-login landing page for backend users with the
            admin role. You can replace this mock layout with real moderation and
            analytics modules whenever your backend is ready.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((card) => {
            const Icon = card.icon

            return (
              <article
                key={card.title}
                className="rounded-[1.75rem] border border-border/80 bg-card/95 p-6 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.78)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  {card.title}
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">{card.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {card.detail}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
