import AppLayout from '@/layouts/app-layout'
import { Form } from '@inertiajs/react'
import { toast } from 'sonner'
import { store } from '@/routes/contact'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

export default function ContactForm() {
  return (
    <div className='w-full max-w-3xl mx-auto flex justify-center items-center'>
      <Form
        action={store.url()}
        method="post"
        resetOnSuccess={true}
        onSuccess={() => {
          toast.success('Üzenet sikeresen elküldve', {
            description: 'Köszönjük a leveledet! Hamarosan válaszolunk.',
          })
        }}
        className='w-full'
      >
        {({ errors, processing }) => (
          <>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Név</Label>
                <Input id="name" type="text" name="name" placeholder="Név" />
                {errors.name && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Telefon"
                />
                {errors.phone && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {errors.phone}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Tárgy</Label>
                <Input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Tárgy"
                />
                {errors.subject && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {errors.subject}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Üzenet</Label>
                <Textarea id="message" name="message" placeholder="Üzenet" />
                {errors.message && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {errors.message}
                  </div>
                )}
              </div>

              <div className="flex justify-center my-8">
                <Button
                  type="submit"
                  disabled={processing}
                  className="w-80 gap-2"
                  variant="destructive"
                  size="lg"
                >
                  {processing && <Spinner className="size-4" />}
                  {processing ? 'Küldés...' : 'Küldés'}
                </Button>
              </div>
            </div>
          </>
        )}
      </Form>
    </div>
  )
}
