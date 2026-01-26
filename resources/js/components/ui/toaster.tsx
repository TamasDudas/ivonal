import { Toaster as SonnerToaster } from 'sonner'

import { useAppearance } from '@/hooks/use-appearance'

export function Toaster() {
  const { appearance } = useAppearance()

  return (
    <SonnerToaster
      closeButton
      richColors
      position="top-right"
      theme={appearance}
    />
  )
}

