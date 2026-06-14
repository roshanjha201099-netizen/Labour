import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { resolveRoleRoute } from '@/lib/auth'
import { useData } from '@/context/DataWrapper'

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Services', href: '/#services' },
  { label: 'For Providers', href: '/#providers' },
  { label: 'Why LOD', href: '/#why-lod' },
  { label: 'Contact', href: '/#contact' },
]

export function Navigation() {
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useData()
  const dashboardTarget = user ? resolveRoleRoute(user.role) : '/sign-in'
  const bookServiceTarget =
    isAuthenticated && user?.role === 'customer' ? dashboardTarget : '/sign-up'
  const providerTarget =
    isAuthenticated && user?.role === 'service provider'
      ? dashboardTarget
      : '/apply-provider'

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white">
            LOD
          </div>
          <div className="leading-tight">
            <p className="text-sm font-black tracking-[0.18em] text-white">LOD</p>
            <p className="text-xs text-white/62">Labour ON Demand</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 hover:text-white"
                onClick={() => navigate(dashboardTarget)}
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/15 bg-transparent text-white hover:bg-white/10"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 hover:text-white"
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Button>
          )}

          <Button
            size="sm"
            className="bg-white text-slate-950 hover:bg-stone-100"
            onClick={() => navigate(bookServiceTarget)}
          >
            Book a Service
          </Button>
          <Button
            size="sm"
            className="bg-orange-500 text-white hover:bg-orange-400"
            onClick={() => navigate(providerTarget)}
          >
            Join as Provider
          </Button>
        </div>
      </div>
    </nav>
  )
}
