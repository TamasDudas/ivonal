import { store } from '@/actions/App/Http/Controllers/PropertyController';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';
import { Form, usePage } from '@inertiajs/react';

interface City {
  id: number;
  name: string;
}

interface PropertyFormProps extends SharedData {
  cities: City[] | { data: City[] };
}

export default function PropertyForm() {
  const { cities } = usePage<PropertyFormProps>().props;
  const cityList = Array.isArray(cities) ? cities : cities?.data || [];
  return (
    <AppLayout>
      <div className="flex min-h-screen items-center justify-center p-4">
        <Form action={store()} method="post" resetOnSuccess>
          {({ errors, processing, wasSuccessful }) => (
            <div className="w-full max-w-2xl space-y-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
              <h2 className="mb-6 text-2xl font-semibold">
                Új ingatlan létrehozása
              </h2>

              {wasSuccessful && (
                <div className="rounded-md bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Ingatlan sikeresen létrehozva!
                </div>
              )}

              {/* Alapadatok */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alapadatok</h3>

                <div className="space-y-2">
                  <label
                    htmlFor="city_id"
                    className="block text-sm font-medium"
                  >
                    Város *
                  </label>
                  <select
                    name="city_id"
                    id="city_id"
                    required
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  >
                    <option value="">Válassz várost...</option>
                    {cityList.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.city_id && (
                    <div className="text-sm text-red-600 dark:text-red-400">
                      {errors.city_id}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="street" className="block text-sm font-medium">
                    Utca *
                  </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    required
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  />
                  {errors.street && (
                    <div className="text-sm text-red-600 dark:text-red-400">
                      {errors.street}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="latitude"
                      className="block text-sm font-medium"
                    >
                      Földrajzi szélesség
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      id="latitude"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="longitude"
                      className="block text-sm font-medium"
                    >
                      Földrajzi hosszúság
                    </label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      id="longitude"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>
                </div>
              </div>

              {/* Árak és méret */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Árak és méret</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="rental_price"
                      className="block text-sm font-medium"
                    >
                      Bérleti díj
                    </label>
                    <input
                      type="text"
                      name="rental_price"
                      id="rental_price"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="sale_price"
                      className="block text-sm font-medium"
                    >
                      Eladási ár
                    </label>
                    <input
                      type="text"
                      name="sale_price"
                      id="sale_price"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="size" className="block text-sm font-medium">
                      Méret
                    </label>
                    <input
                      type="text"
                      name="size"
                      id="size"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="floor_area"
                      className="block text-sm font-medium"
                    >
                      Alapterület
                    </label>
                    <input
                      type="text"
                      name="floor_area"
                      id="floor_area"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="minimum_rental_period"
                    className="block text-sm font-medium"
                  >
                    Minimális bérleti időszak
                  </label>
                  <input
                    type="text"
                    name="minimum_rental_period"
                    id="minimum_rental_period"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  />
                </div>
              </div>

              {/* Épület adatok */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Épület adatok</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="year_built"
                      className="block text-sm font-medium"
                    >
                      Építés éve
                    </label>
                    <input
                      type="text"
                      name="year_built"
                      id="year_built"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="building_floors"
                      className="block text-sm font-medium"
                    >
                      Épület szintjei
                    </label>
                    <input
                      type="text"
                      name="building_floors"
                      id="building_floors"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="floor"
                      className="block text-sm font-medium"
                    >
                      Emelet
                    </label>
                    <input
                      type="text"
                      name="floor"
                      id="floor"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="balcony"
                      className="block text-sm font-medium"
                    >
                      Erkély
                    </label>
                    <input
                      type="text"
                      name="balcony"
                      id="balcony"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="view" className="block text-sm font-medium">
                      Kilátás
                    </label>
                    <input
                      type="text"
                      name="view"
                      id="view"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="heating_type"
                      className="block text-sm font-medium"
                    >
                      Fűtés típusa
                    </label>
                    <input
                      type="text"
                      name="heating_type"
                      id="heating_type"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="parking"
                    className="block text-sm font-medium"
                  >
                    Parkolás
                  </label>
                  <input
                    type="text"
                    name="parking"
                    id="parking"
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  />
                </div>
              </div>

              {/* Felszereltség */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Felszereltség és szabályok
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="furniture"
                      className="block text-sm font-medium"
                    >
                      Bútorozott
                    </label>
                    <select
                      name="furniture"
                      id="furniture"
                      required
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    >
                      <option value="igen">Igen</option>
                      <option value="nem">Nem</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="appliances"
                      className="block text-sm font-medium"
                    >
                      Gépesített
                    </label>
                    <select
                      name="appliances"
                      id="appliances"
                      required
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    >
                      <option value="igen">Igen</option>
                      <option value="nem">Nem</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="air_conditioning"
                      className="block text-sm font-medium"
                    >
                      Légkondicionáló
                    </label>
                    <select
                      name="air_conditioning"
                      id="air_conditioning"
                      required
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    >
                      <option value="igen">Igen</option>
                      <option value="nem">Nem</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="elevator"
                      className="block text-sm font-medium"
                    >
                      Lift
                    </label>
                    <select
                      name="elevator"
                      id="elevator"
                      required
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    >
                      <option value="igen">Igen</option>
                      <option value="nem">Nem</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="smoking"
                      className="block text-sm font-medium"
                    >
                      Dohányzás engedélyezett
                    </label>
                    <select
                      name="smoking"
                      id="smoking"
                      required
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    >
                      <option value="nem">Nem</option>
                      <option value="igen">Igen</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pets" className="block text-sm font-medium">
                      Háziállat engedélyezett
                    </label>
                    <select
                      name="pets"
                      id="pets"
                      required
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                    >
                      <option value="nem">Nem</option>
                      <option value="igen">Igen</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="is_featured"
                    className="block text-sm font-medium"
                  >
                    Kiemelt hirdetés
                  </label>
                  <select
                    name="is_featured"
                    id="is_featured"
                    required
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  >
                    <option value="igen">Igen</option>
                    <option value="nem">Nem</option>
                  </select>
                </div>
              </div>

              {/* Leírások */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Leírások</h3>

                <div className="space-y-2">
                  <label
                    htmlFor="short_description"
                    className="block text-sm font-medium"
                  >
                    Rövid leírás
                  </label>
                  <textarea
                    name="short_description"
                    id="short_description"
                    rows={3}
                    maxLength={500}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium"
                  >
                    Részletes leírás
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={6}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  ></textarea>
                </div>
              </div>

              {/* SEO */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">SEO</h3>

                <div className="space-y-2">
                  <label
                    htmlFor="meta_title"
                    className="block text-sm font-medium"
                  >
                    Meta cím
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    id="meta_title"
                    maxLength={255}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="meta_description"
                    className="block text-sm font-medium"
                  >
                    Meta leírás
                  </label>
                  <textarea
                    name="meta_description"
                    id="meta_description"
                    rows={3}
                    maxLength={500}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="meta_keywords"
                    className="block text-sm font-medium"
                  >
                    Meta kulcsszavak
                  </label>
                  <input
                    type="text"
                    name="meta_keywords"
                    id="meta_keywords"
                    maxLength={500}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 focus:border-neutral-500 focus:outline-none dark:border-neutral-600 dark:bg-neutral-700"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                {processing ? 'Létrehozás...' : 'Létrehozás'}
              </button>
            </div>
          )}
        </Form>
      </div>
    </AppLayout>
  );
}
