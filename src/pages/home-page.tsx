import { Benefits } from '@/components/benefits'
import { Categories } from '@/components/categories'
import { Features } from '@/components/features'
import { Hero } from '@/components/hero'
import { Mission } from '@/components/mission'

export function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <Benefits />
      <Mission />
    </>
  )
}
