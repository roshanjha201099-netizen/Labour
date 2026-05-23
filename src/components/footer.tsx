import { Link } from 'react-router-dom'

import { Separator } from './ui/separator'

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold text-primary-foreground">L</span>
              </div>
              <span className="font-semibold text-foreground">Labour</span>
            </Link>
            <p className="text-sm text-foreground/70">
              Direct connection for skilled workers
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Product</p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="/#features" className="transition-colors hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Company</p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="/#mission" className="transition-colors hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">Legal</p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <p className="text-sm text-foreground/50">(c) 2025 Labour. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-foreground/50 transition-colors hover:text-foreground">
              Twitter
            </a>
            <a href="#" className="text-sm text-foreground/50 transition-colors hover:text-foreground">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-foreground/50 transition-colors hover:text-foreground">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
