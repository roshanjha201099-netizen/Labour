import * as React from 'react'

import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'border-transparent bg-primary text-primary-foreground',
  secondary: 'border border-border bg-card text-foreground',
  destructive: 'border-transparent bg-red-600 text-white',
  outline: 'border border-border bg-transparent text-foreground',
}

function Badge({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'span'> & {
  variant?: BadgeVariant
}) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex w-fit items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors',
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
