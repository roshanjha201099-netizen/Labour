import { Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './components/protected-route'
import { Footer } from './components/footer'
import { Navigation } from './components/navigation'
import { AdminDashboardPage } from './pages/admin-dashboard-page'
import { CustomerDashboardPage } from './pages/customer-dashboard-page'
import { HomePage } from './pages/home-page'
import { ProviderApplicationPage } from './pages/provider-application-page'
import { ProviderDashboardPage } from './pages/provider-dashboard-page'
import { ServicesPage } from './pages/services-page'
import { SignInPage } from './pages/sign-in-page'
import { SignUpPage } from './pages/sign-up-page'

export default function App() {
  return (
    <main className="w-full bg-background">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/apply-provider" element={<ProviderApplicationPage />} />
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider-dashboard"
          element={
            <ProtectedRoute allowedRoles={['service provider']}>
              <ProviderDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceSlug" element={<ServicesPage />} />
      </Routes>
      <Footer />
    </main>
  )
}
