import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'

import { getDashboardRoute, useData, type UserRole } from '@/context/DataWrapper'

type ProtectedRouteProps = {
  children: ReactNode
  allowedRoles: UserRole[]
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useData()

  if (!isAuthenticated || !user) {
    return <Navigate to="/sign-in" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardRoute(user.role)} replace />
  }

  return <>{children}</>
}
