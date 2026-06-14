import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { KeyRound, Mail, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useData } from '@/context/DataWrapper'
import { resolveRoleRoute } from '@/lib/auth'

function GoogleMark() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-900">
      G
    </span>
  )
}

export function SignInPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, login, authError, user } = useData()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isAuthenticated && user) {
    return <Navigate to={resolveRoleRoute(user.role)} replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const authenticatedUser = await login({ email, password })
      navigate(resolveRoleRoute(authenticatedUser.role), { replace: true })
    } catch {
      // Error state is handled by context and rendered below.
    }
  }

  return (
    <section className="min-h-screen w-full border-t border-border bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.14),_transparent_30%),linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(10,14,25,1))]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.78)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Welcome Back
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Sign in to manage requests, providers, and updates.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            Access your customer dashboard, service provider activity, or admin tools
            from one place.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-border bg-background/55 p-5">
              <Mail className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-base font-semibold text-foreground">
                Email access
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use email and password to continue securely.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-background/55 p-5">
              <Phone className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-base font-semibold text-foreground">
                Phone sign in
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Log in quickly using your registered phone number.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-background/55 p-5">
              <KeyRound className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-base font-semibold text-foreground">
                Fast recovery
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Regain access easily if you forget your password later.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.78)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Sign In
              </p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">
                Continue to your account
              </h2>
            </div>
            <Link to="/sign-up" className="text-sm font-medium text-primary hover:underline">
              Create account
            </Link>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Email address</span>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Password</span>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>

            {authError ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {authError}
              </div>
            ) : null}

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In with Email'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Or use phone
                </span>
              </div>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Phone number</span>
              <Input type="tel" placeholder="Enter your phone number" />
            </label>

            <Button type="button" variant="outline" size="lg" className="w-full">
              <Phone className="h-4 w-4" />
              Sign In with Phone
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full bg-background/70"
            >
              <GoogleMark />
              Continue with Google
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            New here?{' '}
            <Link to="/sign-up" className="font-medium text-primary hover:underline">
              Create a sign up account
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
