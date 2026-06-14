import { getDashboardRoute, type UserRole } from '@/context/DataWrapper'

export function resolveRoleRoute(role: UserRole) {
  return getDashboardRoute(role)
}
