import { Route, Routes } from 'react-router-dom'

import { Footer } from './components/footer'
import { Navigation } from './components/navigation'
import { HomePage } from './pages/home-page'
import { ServicesPage } from './pages/services-page'

export default function App() {
  return (
    <main className="w-full bg-background">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceSlug" element={<ServicesPage />} />
      </Routes>
      <Footer />
    </main>
  )
}
