import { Link } from 'react-router-dom'

import { Badge } from './ui/badge'
import { serviceData, slugifyService } from '@/data/services'

export function Categories() {
  return (
    <section id="categories" className="w-full border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-24">
        <div className="flex flex-col gap-4">
          <div className="w-fit text-sm font-semibold text-primary">
            Service Categories
          </div>
          <h2 className="max-w-4xl text-balance text-4xl font-bold text-foreground md:text-5xl">
            One platform for the skilled workers people search for daily.
          </h2>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Choose any category to open its own route and browse a cleaner set
            of provider cards on a dedicated page.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {serviceData.map((category) => (
            <Link
              key={category.name}
              to={`/services/${slugifyService(category.name)}`}
            >
              <Badge
                variant="secondary"
                className="cursor-pointer border-border/50 px-4 py-2 text-base transition-all hover:border-primary/50 hover:bg-primary/10"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
