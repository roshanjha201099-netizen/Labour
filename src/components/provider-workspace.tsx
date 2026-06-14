import { useState, type ChangeEvent } from 'react'
import {
  Bell,
  BriefcaseBusiness,
  Clock3,
  IndianRupee,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
} from 'lucide-react'

import { useData } from '@/context/DataWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'

type ProviderProfile = {
  fullName: string
  expertise: string
  price: string
  experience: string
  city: string
  availability: string
  bio: string
}

type ProviderRequest = {
  id: string
  customer: string
  service: string
  budget: string
  location: string
  time: string
  summary: string
  urgency: string
  quote: string
  eta: string
  status: 'new' | 'quoted'
}

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'
}

const initialProfile: ProviderProfile = {
  fullName: 'Rakesh Sharma',
  expertise: 'Electrical repairs, AC wiring, switchboard upgrades',
  price: '799',
  experience: '6 years',
  city: 'Noida Sector 62',
  availability: 'Mon-Sat, 8 AM to 8 PM',
  bio: 'Residential and small commercial electrician focused on fast home visits, clean finishing, and clear estimates before work starts.',
}

const initialRequests: ProviderRequest[] = [
  {
    id: 'req-1',
    customer: 'Ananya Verma',
    service: 'Fan repair and wiring check',
    budget: '1,200',
    location: 'Sector 18, Noida',
    time: '3 min ago',
    summary:
      'Ceiling fan is making noise and one switchboard is heating up. Needs same-day inspection.',
    urgency: 'Priority',
    quote: '950',
    eta: 'Today, 5 PM',
    status: 'new',
  },
  {
    id: 'req-2',
    customer: 'Rohit Saini',
    service: 'Inverter backup issue',
    budget: '2,500',
    location: 'Indirapuram',
    time: '14 min ago',
    summary:
      'Home inverter is not taking full load. Customer wants troubleshooting and possible battery inspection.',
    urgency: 'Standard',
    quote: '1800',
    eta: 'Tomorrow, 11 AM',
    status: 'new',
  },
  {
    id: 'req-3',
    customer: 'Mira Singh',
    service: 'New light installation',
    budget: '1,800',
    location: 'Vaishali',
    time: '28 min ago',
    summary:
      'Three decorative lights need installation in the living room with concealed alignment.',
    urgency: 'Planned',
    quote: '1500',
    eta: 'Tomorrow, 4 PM',
    status: 'quoted',
  },
]

const stats = [
  {
    label: 'Profile strength',
    value: '92%',
    detail: 'Complete profile gets more request visibility.',
    icon: ShieldCheck,
  },
  {
    label: 'Average quote',
    value: 'Rs.1,420',
    detail: 'Based on your latest 12 responses.',
    icon: IndianRupee,
  },
  {
    label: 'Response time',
    value: '11 min',
    detail: 'Fast replies help you win more jobs.',
    icon: Clock3,
  },
]

export function ProviderWorkspace() {
  const { user } = useData()
  const apiBaseUrl = getApiBaseUrl()
  const [profile, setProfile] = useState<ProviderProfile>(initialProfile)
  const [requests, setRequests] = useState<ProviderRequest[]>(initialRequests)
  const [isSendingQuoteFor, setIsSendingQuoteFor] = useState<string | null>(null)
  const [quoteStatusMessage, setQuoteStatusMessage] = useState('')

  if (!user) {
    return null
  }

  const handleProfileChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setProfile((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleRequestChange = (
    requestId: string,
    field: 'quote' | 'eta',
    value: string,
  ) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId ? { ...request, [field]: value } : request,
      ),
    )
  }

  const handleSendQuote = async (requestId: string) => {
    const selectedRequest = requests.find((request) => request.id === requestId)

    if (!selectedRequest) {
      setQuoteStatusMessage('Could not find the selected customer request.')
      return
    }

    setIsSendingQuoteFor(requestId)
    setQuoteStatusMessage('')

    try {
      const payload = {
        provider: {
          name: profile.fullName,
          email: user.userProfile.email,
          phone: user.userProfile.phone,
          serviceArea: profile.city,
          expertise: profile.expertise,
          experience: profile.experience,
          availability: profile.availability,
          startingPrice: profile.price,
          bio: profile.bio,
        },
        customerRequest: {
          requestId: selectedRequest.id,
          customerName: selectedRequest.customer,
          service: selectedRequest.service,
          budget: selectedRequest.budget,
          location: selectedRequest.location,
          summary: selectedRequest.summary,
          urgency: selectedRequest.urgency,
          requestedAt: selectedRequest.time,
        },
        quote: {
          quotedPrice: selectedRequest.quote,
          visitTiming: selectedRequest.eta,
          status: 'quoted',
        },
      }

      const response = await axios.post(`${apiBaseUrl}/api/provider/send-quote`, payload)

      if (response.status < 200 || response.status >= 300) {
        throw new Error('Could not send quote to customer.')
      }

      setRequests((current) =>
        current.map((request) =>
          request.id === requestId ? { ...request, status: 'quoted' } : request,
        ),
      )
      setQuoteStatusMessage(`Quote sent successfully for ${selectedRequest.customer}.`)
    } catch (error) {
      setQuoteStatusMessage(
        error instanceof Error ? error.message : 'Could not send quote right now.',
      )
    } finally {
      setIsSendingQuoteFor(null)
    }
  }

  const pendingCount = requests.filter((request) => request.status === 'new').length

  return (
    <section className="min-h-screen w-full border-t border-border bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.16),_transparent_24%),linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(10,14,25,1))]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.75)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Service Provider Desk
                </p>
                <h1 className="mt-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
                  Manage your profile, set your pricing, and answer requests quickly.
                </h1>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">
                  This workspace helps service providers stay bookable. Keep your
                  experience, expertise, and rates updated, then send quotes as soon
                  as new customer requests arrive.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-border bg-background/60 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Active requests
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{pendingCount}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Waiting for your quote
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-border bg-background/60 px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Provider rating
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <p className="text-3xl font-bold text-foreground">4.8</p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Based on recent job completions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <article
                  key={stat.label}
                  className="rounded-[1.6rem] border border-border/80 bg-card/95 p-6 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.78)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {stat.detail}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.75)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Profile Settings
                </p>
                <h2 className="mt-2 text-3xl font-bold text-foreground">
                  Your public provider profile
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Visible to matching customers
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Full name</span>
                <Input
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleProfileChange}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Primary expertise</span>
                <Input
                  name="expertise"
                  value={profile.expertise}
                  onChange={handleProfileChange}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Starting price</span>
                <Input
                  name="price"
                  type="number"
                  value={profile.price}
                  onChange={handleProfileChange}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Experience</span>
                <Input
                  name="experience"
                  value={profile.experience}
                  onChange={handleProfileChange}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">City / service area</span>
                <Input
                  name="city"
                  value={profile.city}
                  onChange={handleProfileChange}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-foreground">Availability</span>
                <Input
                  name="availability"
                  value={profile.availability}
                  onChange={handleProfileChange}
                />
              </label>
            </div>

            <label className="mt-6 grid gap-2">
              <span className="text-sm font-medium text-foreground">About your service</span>
              <Textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                className="min-h-36"
              />
            </label>

            <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Keep your rates, expertise, and timing current so customers get better
                quotes and your profile ranks higher in local matches.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save Profile
              </Button>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.75)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              User Profile
            </p>
            <div className="mt-5 flex items-center gap-4">
              <img
                src={user.userProfile.imageUrl}
                alt={user.name}
                className="h-16 w-16 rounded-2xl object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                <p className="text-sm capitalize text-muted-foreground">{user.role}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-background/55 px-4 py-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                {user.userProfile.email}
              </div>
              <div className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-background/55 px-4 py-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                {user.userProfile.phone}
              </div>
              <div className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-background/55 px-4 py-3 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4 text-primary" />
                Wallet balance: {user.wallet.balance} points
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-[0_32px_90px_-40px_rgba(0,0,0,0.75)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Request Notifications
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Quote new customer jobs
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Each request includes the customer brief, expected budget, and place of
                  work so you can answer with a quick estimate.
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <Bell className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {quoteStatusMessage ? (
                <div className="rounded-[1.2rem] border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  {quoteStatusMessage}
                </div>
              ) : null}
              {requests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-[1.6rem] border border-border bg-background/55 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {request.service}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {request.customer}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        request.status === 'quoted'
                          ? 'bg-emerald-500/12 text-emerald-400'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {request.status === 'quoted' ? 'Quote Sent' : request.urgency}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-primary" />
                      Customer budget: Rs.{request.budget}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {request.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness className="h-4 w-4 text-primary" />
                      {request.time}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {request.summary}
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-foreground">
                        Your quote
                      </span>
                      <Input
                        type="number"
                        value={request.quote}
                        onChange={(event) =>
                          handleRequestChange(request.id, 'quote', event.target.value)
                        }
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-foreground">
                        Visit timing
                      </span>
                      <Input
                        value={request.eta}
                        onChange={(event) =>
                          handleRequestChange(request.id, 'eta', event.target.value)
                        }
                      />
                    </label>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      {request.status === 'quoted'
                        ? 'The customer can now review this quote and timing.'
                        : 'Send a quote quickly to improve your chance of getting this job.'}
                    </p>
                    <Button
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                      onClick={() => handleSendQuote(request.id)}
                      disabled={isSendingQuoteFor === request.id}
                    >
                      <Send className="h-4 w-4" />
                      {isSendingQuoteFor === request.id
                        ? 'Sending Quote...'
                        : request.status === 'quoted'
                          ? 'Update Quote'
                          : 'Send Quote'}
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
