import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Download,
  IndianRupee,
  MessageSquareQuote,
  PhoneCall,
  QrCode,
  ShieldCheck,
  Smartphone,
  Star,
  UserRoundSearch,
  Wallet,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useData } from '@/context/DataWrapper'
import { resolveRoleRoute } from '@/lib/auth'

const trustPoints = [
  'Verified Service Providers',
  'Multiple Quotations',
  'Transparent Pricing',
  'Direct Payment to Provider',
  'No Commission on Work Payment',
  'Local Professionals Near You',
]

const customerSteps = [
  {
    title: 'Post Your Requirement',
    description: 'Upload details, photos, video, location and preferred time.',
  },
  {
    title: 'Receive Multiple Quotations',
    description: 'Nearby providers submit quotations.',
  },
  {
    title: 'Compare & Choose',
    description: 'Compare price, ratings, start time and completion time.',
  },
  {
    title: 'Contact Directly',
    description: 'Unlock contact and talk directly with the provider.',
  },
  {
    title: 'Pay Directly',
    description: 'Customer pays the provider directly after work.',
  },
]

const providerSteps = [
  {
    title: 'Receive Job Alert',
    description: 'Get nearby customer requirements.',
  },
  {
    title: 'Submit Quotation',
    description: 'Choose Fixed Price, Per Day Price, or Approximate Price.',
  },
  {
    title: 'Customer Selects You',
    description: 'Customer compares quotations and chooses the best provider.',
  },
  {
    title: 'Talk & Work',
    description: 'Contact customer directly, visit site and complete work.',
  },
  {
    title: 'Get Paid Directly',
    description:
      'Customer pays you directly. LOD does not take commission from your work payment.',
  },
]

const services = [
  'Electrician',
  'Plumber',
  'Carpenter',
  'Painter',
  'Mason',
  'Driver',
  'Maid',
  'Helper',
  'AC Technician',
  'Appliance Repair',
  'Welder',
  'Cook',
  'Pandit',
  'Contractor',
]

const quotationTypes = [
  {
    title: 'Fixed Price',
    description: 'For small or clear work.',
    example: 'Example: Fan installation Rs 500.',
  },
  {
    title: 'Per Day Price',
    description: 'For daily work.',
    example: 'Example: Painter Rs 900/day.',
  },
  {
    title: 'Approximate Price',
    description: 'For work that needs site visit.',
    example: 'Example: House wiring Rs 5,000 approx. Final price after discussion.',
  },
]

const customerBenefits = [
  'Post once, get multiple quotes',
  'Save time',
  'Compare prices',
  'Find nearby professionals',
  'Direct call/WhatsApp coordination',
  'Pay directly to provider',
  'Transparent service process',
]

const providerBenefits = [
  'More customers',
  'More work',
  'No commission',
  'Direct payment from customer',
  'Build profile and reputation',
  'Choose your own price',
  'Work on your own time',
  'Free early registration',
]

const faqs = [
  {
    question: 'Does LOD take payment for work?',
    answer: 'No. Customer pays the service provider directly.',
  },
  {
    question: 'Does LOD take commission from providers?',
    answer: 'No. Providers keep 100% of their work earning.',
  },
  {
    question: 'Can providers give different types of quotation?',
    answer: 'Yes. Fixed Price, Per Day Price and Approximate Price.',
  },
  {
    question: 'Can customer compare multiple quotations?',
    answer: 'Yes. Customer can compare price, timing, rating and profile.',
  },
  {
    question: 'Is registration free?',
    answer: 'Early provider registration is free.',
  },
]

export function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useData()
  const dashboardTarget = user ? resolveRoleRoute(user.role) : '/sign-up'
  const postRequirementTarget =
    isAuthenticated && user?.role === 'customer' ? dashboardTarget : '/sign-up'
  const providerTarget =
    isAuthenticated && user?.role === 'service provider'
      ? dashboardTarget
      : '/apply-provider'

  return (
    <div className="bg-[linear-gradient(180deg,_rgba(8,12,20,1)_0%,_rgba(13,18,31,1)_24%,_rgba(242,236,228,1)_24%,_rgba(247,242,234,1)_100%)]">
      <section id="home" className="relative overflow-hidden pt-24 text-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-orange-200">
              <ShieldCheck className="h-4 w-4" />
              LOD - Labour ON Demand
            </div>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-black leading-tight md:text-6xl lg:text-7xl">
              Post Your Work Requirement. Get Multiple Quotations. Choose the Best
              Professional.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
              LOD connects customers with nearby skilled service providers like
              electricians, plumbers, carpenters, painters, drivers, maids, helpers,
              masons and more.
            </p>
            <p className="mt-4 text-base font-semibold text-amber-300">
              No middleman. No confusion. Direct connection between customer and
              provider.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-orange-500 text-white hover:bg-orange-400"
                onClick={() => navigate(postRequirementTarget)}
              >
                Post Requirement
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                onClick={() => navigate(providerTarget)}
              >
                Join as Service Provider
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 hidden rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl lg:block">
              <p className="text-xs uppercase tracking-[0.2em] text-orange-200">
                Customer request
              </p>
              <p className="mt-2 text-lg font-semibold">Kitchen pipe leakage</p>
              <p className="mt-1 text-sm text-white/65">Photos, timing, budget posted</p>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/8 p-4 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.75)] backdrop-blur">
              <div className="rounded-[1.8rem] bg-[#fffaf2] p-5 text-slate-900">
                <div className="flex items-center justify-between rounded-[1.4rem] bg-slate-950 px-5 py-4 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-orange-200">
                      LOD App
                    </p>
                    <p className="mt-1 text-lg font-bold">Quotation Dashboard</p>
                  </div>
                  <Smartphone className="h-8 w-8 text-orange-300" />
                </div>

                <div className="mt-4 rounded-[1.4rem] border border-orange-100 bg-orange-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Customer posting requirement
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Plumbing | Salt Lake | Today 4 PM
                      </p>
                    </div>
                    <div className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                      Live
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    ['Provider A', 'Rs 1,500', 'Can start today'],
                    ['Provider B', 'Rs 1,250', 'Available in 2 hours'],
                    ['Provider C', 'Rs 1,700', 'High rated professional'],
                  ].map(([name, price, note]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{name}</p>
                        <p className="text-sm text-slate-500">{note}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">{price}</p>
                        <p className="text-xs text-slate-500">Compare & choose</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 right-0 hidden rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-2xl lg:block">
              <p className="text-xs uppercase tracking-[0.2em] text-orange-200">
                Direct choice
              </p>
              <p className="mt-2 text-lg font-semibold">Customer comparing quotations</p>
              <p className="mt-1 text-sm text-white/65">Price, timing, ratings, profile</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-[#f3eee6]">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 md:grid-cols-3 xl:grid-cols-6">
          {trustPoints.map((point) => (
            <div
              key={point}
              className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-center text-sm font-semibold text-slate-700 shadow-sm"
            >
              {point}
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-[#f7f2ea] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
              How It Works
            </p>
            <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
              One platform for both customers and service professionals.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_30px_90px_-55px_rgba(15,23,42,0.5)]">
              <div className="flex items-center gap-3">
                <UserRoundSearch className="h-6 w-6 text-orange-600" />
                <h3 className="text-2xl font-bold text-slate-950">
                  How LOD Works For Customers
                </h3>
              </div>
              <div className="mt-8 space-y-5">
                {customerSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4 rounded-2xl bg-stone-50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-slate-950 p-8 text-white shadow-[0_30px_90px_-55px_rgba(15,23,42,0.7)]">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-6 w-6 text-amber-300" />
                <h3 className="text-2xl font-bold">How LOD Works For Providers</h3>
              </div>
              <div className="mt-8 space-y-5">
                {providerSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-4 rounded-2xl bg-white/6 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-300 font-bold text-slate-950">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/72">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
                Services
              </p>
              <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
                Popular local services people book through LOD.
              </h2>
            </div>
            <Button
              variant="outline"
              className="border-slate-300"
              onClick={() => navigate('/services')}
            >
              View All Services
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-[1.5rem] border border-stone-200 bg-[#fcfaf6] px-5 py-5 text-base font-semibold text-slate-800 shadow-sm"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2ea] py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
              Quotation System
            </p>
            <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
              3 simple quotation types that fit real-world jobs.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Providers can quote clearly based on the type of work, and customers can
              compare quotations without confusion.
            </p>
          </div>

          <div className="space-y-5">
            {quotationTypes.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-stone-200 bg-white p-6 shadow-[0_22px_70px_-50px_rgba(15,23,42,0.45)]"
              >
                <div className="flex items-center gap-3">
                  <MessageSquareQuote className="h-5 w-5 text-orange-600" />
                  <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{item.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-lod" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-stone-200 bg-[#fffaf2] p-8">
              <div className="flex items-center gap-3">
                <Star className="h-6 w-6 text-orange-600" />
                <h3 className="text-2xl font-bold text-slate-950">
                  Why Customers Choose LOD
                </h3>
              </div>
              <div className="mt-6 space-y-4">
                {customerBenefits.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange-600" />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="providers"
              className="rounded-[2rem] border border-slate-800 bg-slate-950 p-8 text-white"
            >
              <div className="flex items-center gap-3">
                <Wallet className="h-6 w-6 text-amber-300" />
                <h3 className="text-2xl font-bold">Why Providers Join LOD</h3>
              </div>
              <div className="mt-6 space-y-4">
                {providerBenefits.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-amber-300" />
                    <p className="text-sm leading-6 text-white/78">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f2ea] py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-stone-200 bg-slate-950 p-8 text-white shadow-[0_30px_90px_-55px_rgba(15,23,42,0.75)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              Provider CTA
            </p>
            <h2 className="mt-4 text-4xl font-black">Are You a Service Professional?</h2>
            <p className="mt-4 text-base leading-7 text-white/74">
              Join LOD and start receiving customer requirements from your area.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Free Registration',
                'No Joining Fee',
                'No Commission',
                'Direct Customer Leads',
                'Direct Payment From Customer',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/6 px-4 py-3 text-sm">
                  {item}
                </div>
              ))}
            </div>
            <Button
              size="lg"
              className="mt-8 bg-amber-300 text-slate-950 hover:bg-amber-200"
              onClick={() => navigate(providerTarget)}
            >
              Register as Provider
            </Button>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_30px_90px_-55px_rgba(15,23,42,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
              Customer CTA
            </p>
            <h2 className="mt-4 text-4xl font-black text-slate-950">
              Need Work Done at Home or Office?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Post your requirement and receive multiple quotations from nearby
              professionals.
            </p>
            <div className="mt-6 rounded-[1.6rem] bg-[#fff4e5] p-5">
              <p className="text-sm font-semibold text-slate-900">
                Great for urgent and planned work
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Home repairs, office setup, AC issues, painting, cleaning, helper jobs,
                drivers, and more.
              </p>
            </div>
            <Button
              size="lg"
              className="mt-8 bg-orange-500 text-white hover:bg-orange-400"
              onClick={() => navigate(postRequirementTarget)}
            >
              Post Requirement Now
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
              Download the App
            </p>
            <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
              Download the LOD App
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Post requirements, receive quotations, compare profiles, and stay
              connected with local professionals from one app.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-slate-950 text-white hover:bg-slate-800">
                <Download className="h-4 w-4" />
                Google Play
              </Button>
              
            </div>
          </div>

          
        </div>
      </section>

      <section className="bg-[#f7f2ea] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-600">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-black text-slate-950 md:text-5xl">
              Clear answers before you start.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.8rem] border border-stone-200 bg-white p-6 shadow-sm"
              >
                <p className="text-lg font-bold text-slate-950">{faq.question}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              Contact LOD
            </p>
            <h2 className="mt-3 text-3xl font-black">Need help getting started?</h2>
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/78 sm:flex-row sm:items-center sm:gap-6">
            <div className="inline-flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-amber-300" />
              +91 6290 123 186
            </div>
            <div className="inline-flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-amber-300" />
              Direct payment to provider
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
