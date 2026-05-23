import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from './theme-toggle'

export function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const servicesTarget = location.pathname.startsWith('/services')
    ? location.pathname
    : '/services'

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">L</span>
          </div>
          <span className="text-lg font-semibold text-foreground">Labour</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/#features"
            className="text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            Features
          </a>
          <Link
            to={servicesTarget}
            className="text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            Services
          </Link>
          <a
            href="/#benefits"
            className="text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            Benefits
          </a>
          <a
            href="/#mission"
            className="text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            Mission
          </a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => navigate('/services')}
          >
            Browse Services
          </Button>
        </div>
      </div>
    </nav>
  )
}
