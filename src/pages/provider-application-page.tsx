import { useState, type ChangeEvent, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type ApplicationFormState = {
  fullName: string
  phone: string
  email: string
  city: string
  pin: string
  serviceType: string
  experience: string
  address: string
  availability: string
  about: string
}

const initialFormState: ApplicationFormState = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  pin: '',
  serviceType: '',
  experience: '',
  address: '',
  availability: '',
  about: '',
}

export function ProviderApplicationPage() {
  const [formData, setFormData] = useState<ApplicationFormState>(initialFormState)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setFormData(initialFormState)
    setShowSuccessPopup(true)
  }

  return (
    <section className="w-full border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-24">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-primary">Service Provider Application</p>
          <h1 className="max-w-3xl text-balance text-4xl font-bold text-foreground md:text-5xl">
            Apply to join as a verified local service provider.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Fill in your professional details and submit your application. Our team
            will review it before listing you on the platform.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.72)]"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Full name</span>
              <Input
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Phone number</span>
              <Input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Email address</span>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">City / Area</span>
              <Input
                name="city"
                placeholder="Enter your city or locality"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">PIN code</span>
              <Input
                name="pin"
                placeholder="Enter your PIN code"
                value={formData.pin}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Service type</span>
              <Input
                name="serviceType"
                placeholder="Electrician, plumber, carpenter..."
                value={formData.serviceType}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Years of experience</span>
              <Input
                name="experience"
                placeholder="e.g. 5 years"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="mt-6 grid gap-6">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Full address</span>
              <Input
                name="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">Availability</span>
              <Input
                name="availability"
                placeholder="Weekdays, weekends, emergency calls, etc."
                value={formData.availability}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-foreground">About your work</span>
              <Textarea
                name="about"
                placeholder="Tell us about your skills, certifications, and the kind of jobs you handle."
                value={formData.about}
                onChange={handleChange}
                className="min-h-32"
                required
              />
            </label>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              After submission, your application will be reviewed before approval.
            </p>
            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </div>

      {showSuccessPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
          <div className="w-full max-w-md rounded-[2rem] border border-border bg-card p-8 text-center shadow-[0_24px_70px_-34px_rgba(15,23,42,0.9)]">
            <p className="text-sm font-semibold text-primary">Application Received</p>
            <h2 className="mt-3 text-2xl font-bold text-foreground">
              Your application is added for review.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We will review your details and contact you once the verification process is complete.
            </p>
            <Button
              className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setShowSuccessPopup(false)}
            >
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
