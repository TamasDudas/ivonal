import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PropertyController::city
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/ingatlanok/varos/{city}'
 */
export const city = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: city.url(args, options),
    method: 'get',
})

city.definition = {
    methods: ["get","head"],
    url: '/ingatlanok/varos/{city}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PropertyController::city
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/ingatlanok/varos/{city}'
 */
city.url = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { city: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { city: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    city: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        city: typeof args.city === 'object'
                ? args.city.slug
                : args.city,
                }

    return city.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::city
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/ingatlanok/varos/{city}'
 */
city.get = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: city.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PropertyController::city
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/ingatlanok/varos/{city}'
 */
city.head = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: city.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PropertyController::city
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/ingatlanok/varos/{city}'
 */
    const cityForm = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: city.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PropertyController::city
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/ingatlanok/varos/{city}'
 */
        cityForm.get = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: city.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PropertyController::city
 * @see app/Http/Controllers/PropertyController.php:31
 * @route '/ingatlanok/varos/{city}'
 */
        cityForm.head = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: city.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    city.form = cityForm
const by = {
    city: Object.assign(city, city),
}

export default by