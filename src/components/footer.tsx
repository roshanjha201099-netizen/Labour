import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white">
                LOD
              </div>
              <div>
                <p className="text-sm font-black tracking-[0.18em]">LOD</p>
                <p className="text-xs text-white/62">Labour ON Demand</p>
              </div>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/68">
              Connecting customers with local skilled professionals.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Links
            </p>
            <div className="mt-4 grid gap-3 text-sm text-white/72">
              <a href="/#home" className="hover:text-white">
                About
              </a>
              <a href="/#services" className="hover:text-white">
                Services
              </a>
              <a href="/#providers" className="hover:text-white">
                Join Provider
              </a>
              <a href="/#contact" className="hover:text-white">
                Contact
              </a>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
              Contact
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/72">
              <p>Phone / WhatsApp: +91 6290 123 186</p>
              <p>Email: support@lod_app.in</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/8 pt-6 text-sm text-white/48">
          (c) 2026 LOD - Labour ON Demand. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
