import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const AUTH_STORAGE_KEY = 'labour-auth-user'

const HARDCODED_CUSTOMER_USER = {
  id: 'demo-customer-id',
  email: 'roshan@gmail.com',
  name: 'Roshan',
  role: 'service provider',
  token: 'hardcoded-customer-token',
  userProfile: {
    email: 'roshan@gmail.com',
    phone: '9876543210',
    imageUrl: '/placeholder-user.jpg',
    address: '221B Baker Street, Lucknow, Uttar Pradesh',
    addressLine1: '221B Baker Street',
    addressLine2: '',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226001',
    country: 'India',
  },
  wallet: {
    balance: 10,
  },
} as const

type UserRole = 'admin' | 'customer' | 'service provider'

type AuthUser = {
  id: string
  email: string
  name: string
  role: UserRole
  token: string
  userProfile: {
    email: string
    phone: string
    imageUrl: string
    address: string
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    pincode: string
    country: string
  }
  wallet: {
    balance: number
  }
}

type LoginPayload = {
  email: string
  password: string
}

type SignUpPayload = {
  email: string
  password: string
  name: string
  phone: string
  role: UserRole
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pincode: string
}

type DataContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  authError: string | null
  login: (payload: LoginPayload) => Promise<AuthUser>
  signUp: (payload: SignUpPayload) => Promise<AuthUser>
  logout: () => void
}

type LoginResponse = {
  access_token: string
  token_type: string
  user: {
    id: string
    email: string
    name: string
    role: string
    userProfile: {
      email: string
      phone: string
      image_url: string
      address?: string
      address_line_1?: string
      address_line_2?: string
      city?: string
      state?: string
      pincode?: string
      country?: string
    }
    wallet: {
      balance: number
    }
  }
}

type LoginErrorResponse = {
  detail?: string
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'
}

function normalizeRole(role: string): UserRole {
  const value = role.trim().toLowerCase()

  if (value === 'customer' || value === 'admin' || value === 'service provider') {
    return value
  }

  if (value === 'service_provider' || value === 'provider') {
    return 'service provider'
  }

  throw new Error(`Unsupported user role received from backend: ${role}`)
}

export function getDashboardRoute(role: UserRole) {
  switch (role) {
    case 'customer':
      return '/customer'
    case 'service provider':
      return '/provider-dashboard'
    case 'admin':
      return '/admin'
  }
}

export function DataWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(HARDCODED_CUSTOMER_USER)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(HARDCODED_CUSTOMER_USER),
    )
  }, [])

  const login = async ({ email, password }: LoginPayload) => {
    setIsLoading(true)
    setAuthError(null)

    try {
      const nextUser = await authenticate('/auth/login', { email, password })

      setUser(nextUser)
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))

      return nextUser
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to sign in right now.'
      setAuthError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async ({
    email,
    password,
    name,
    phone,
    role,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
  }: SignUpPayload) => {
    setIsLoading(true)
    setAuthError(null)

    try {
      const nextUser = await authenticate('/auth/signup', {
        email,
        password,
        name,
        phone,
        role,
        address_line_1: addressLine1,
        address_line_2: addressLine2,
        city,
        state,
        pincode,
      })

      setUser(nextUser)
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))

      return nextUser
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to create your account.'
      setAuthError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const authenticate = async (path: string, body: Record<string, string>) => {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const payload = (await response.json()) as LoginResponse | LoginErrorResponse

    if (!response.ok) {
      const errorPayload = payload as LoginErrorResponse
      throw new Error(errorPayload.detail ?? 'Authentication failed. Please try again.')
    }

    const successPayload = payload as LoginResponse
    const profile = successPayload.user.userProfile
    const addressLine1 = profile.address_line_1 ?? ''
    const addressLine2 = profile.address_line_2 ?? ''
    const city = profile.city ?? ''
    const state = profile.state ?? ''
    const pincode = profile.pincode ?? ''
    const country = profile.country ?? 'India'
    const addressParts = [addressLine1, addressLine2, city, state, pincode, country].filter(
      Boolean,
    )

    return {
      id: successPayload.user.id,
      email: successPayload.user.email,
      name: successPayload.user.name,
      role: normalizeRole(successPayload.user.role),
      token: successPayload.access_token,
      userProfile: {
        email: profile.email,
        phone: profile.phone,
        imageUrl: profile.image_url,
        address: addressParts.join(', ') || 'Address not available yet',
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        country,
      },
      wallet: {
        balance: successPayload.user.wallet.balance,
      },
    } satisfies AuthUser
  }

  const logout = () => {
    setUser(null)
    setAuthError(null)
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo<DataContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      authError,
      login,
      signUp,
      logout,
    }),
    [authError, isLoading, user],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error('useData must be used within a DataWrapper')
  }

  return context
}

export type { AuthUser, SignUpPayload, UserRole }
