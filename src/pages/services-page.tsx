import { useParams } from 'react-router-dom'

import { ServiceDirectory } from '@/components/service-directory'
import { getServiceBySlug } from '@/data/services'

export function ServicesPage() {
  const { serviceSlug } = useParams()
  const activeService = getServiceBySlug(serviceSlug)

  return <ServiceDirectory activeService={activeService} />
}
