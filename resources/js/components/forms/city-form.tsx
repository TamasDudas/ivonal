import { store } from '@/actions/App/Http/Controllers/CityController';
import AppLayout from '@/layouts/app-layout';
import { Form } from '@inertiajs/react';

export default function CityForm() {
  return (
    <AppLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Form
          action={store()}
          method="post"
          resetOnSuccess
          className="w-full max-w-md space-y-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800"
        >
          <h2 className="mb-6 text-2xl font-semibold">Új város létrehozása</h2>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Város neve
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Város leírása
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label htmlFor="meta_title" className="block text-sm font-medium">
              SEO Meta cím
            </label>
            <input
              type="text"
              name="meta_title"
              id="meta_title"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="meta_description"
              className="block text-sm font-medium"
            >
              SEO Meta leírás
            </label>
            <textarea
              name="meta_description"
              id="meta_description"
              rows={3}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="meta_keywords"
              className="block text-sm font-medium"
            >
              SEO Meta kulcsszó
            </label>
            <input
              type="text"
              name="meta_keywords"
              id="meta_keywords"
              className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:outline-none dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Létrehozás
          </button>
        </Form>
      </div>
    </AppLayout>
  );
}
