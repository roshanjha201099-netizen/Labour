import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Mail, Phone, ShieldCheck, UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useData, type UserRole } from '@/context/DataWrapper'
import { resolveRoleRoute } from '@/lib/auth'

function GoogleMark() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-900">
      G
    </span>
  )
}

export function SignUpPage() {
  const navigate = useNavigate()
  const { authError, isAuthenticated, isLoading, signUp, user } = useData()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [role, setRole] = useState<UserRole>('customer')
  const [password, setPassword] = useState('')

  if (isAuthenticated && user) {
    return <Navigate to={resolveRoleRoute(user.role)} replace />
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const authenticatedUser = await signUp({
        name: fullName,
        email,
        phone,
        role,
        password,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
      })
      navigate(resolveRoleRoute(authenticatedUser.role), { replace: true })
    } catch {
      // Error state is handled by context and rendered below.
    }
  }

  return (
    <section className="min-h-screen w-full border-t border-border bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.14),_transparent_30%),linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(10,14,25,1))]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.78)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Join Labour
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Create your account and start using the platform.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            Choose whether you're joining to request services or offer them.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-border bg-background/55 p-5">
              <UserPlus className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-base font-semibold text-foreground">
                Easy onboarding
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Create an account in a few steps and start posting requests.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-background/55 p-5">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-base font-semibold text-foreground">
                Secure account
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Keep your request data and conversations protected.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-background/55 p-5">
              <Phone className="h-6 w-6 text-primary" />
              <h2 className="mt-4 text-base font-semibold text-foreground">
                Flexible login
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Later you can continue with email, phone, or Google.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.78)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Sign Up
              </p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">
                Build your new account
              </h2>
            </div>
            <Link to="/sign-in" className="text-sm font-medium text-primary hover:underline">
              Already have an account?
            </Link>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Full name</span>
                <Input
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </label>

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
                <span className="text-sm font-medium text-foreground">Phone number</span>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Address line 1</span>
                <Input
                  placeholder="House number, street, area"
                  value={addressLine1}
                  onChange={(event) => setAddressLine1(event.target.value)}
                  required
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Address line 2</span>
                <Input
                  placeholder="Landmark, apartment, locality"
                  value={addressLine2}
                  onChange={(event) => setAddressLine2(event.target.value)}
                />
              </label>

              <div className="grid gap-5 md:grid-cols-3">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground">City</span>
                  <Input
                    placeholder="Enter your city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground">State</span>
                  <Input
                    placeholder="Enter your state"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    required
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-foreground">PIN code</span>
                  <Input
                    placeholder="Enter your PIN code"
                    value={pincode}
                    onChange={(event) => setPincode(event.target.value)}
                    required
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Sign up as</span>
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value as UserRole)}
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <option value="customer">Customer</option>
                  <option value="service provider">Service Provider</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Password</span>
                <Input
                  type="password"
                  placeholder="Create a password"
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="outline" size="lg" className="w-full">
                <Mail className="h-4 w-4" />
                Use Email
              </Button>
              <Button type="button" variant="outline" size="lg" className="w-full">
                <Phone className="h-4 w-4" />
                Use Phone
              </Button>
            </div>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full bg-background/70"
            >
              <GoogleMark />
              Sign Up with Google
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Already registered?{' '}
            <Link to="/sign-in" className="font-medium text-primary hover:underline">
              Go to sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
