import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:20
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:20
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:20
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:20
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CityController::create
 * @see app/Http/Controllers/CityController.php:53
 * @route '/varosok/letrehozas'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/varosok/letrehozas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::create
 * @see app/Http/Controllers/CityController.php:53
 * @route '/varosok/letrehozas'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::create
 * @see app/Http/Controllers/CityController.php:53
 * @route '/varosok/letrehozas'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::create
 * @see app/Http/Controllers/CityController.php:53
 * @route '/varosok/letrehozas'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:61
 * @route '/varosok'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/varosok',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:61
 * @route '/varosok'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:61
 * @route '/varosok'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CityController::edit
 * @see app/Http/Controllers/CityController.php:101
 * @route '/varosok/{city}/szerkesztes'
 */
export const edit = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/varosok/{city}/szerkesztes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::edit
 * @see app/Http/Controllers/CityController.php:101
 * @route '/varosok/{city}/szerkesztes'
 */
edit.url = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { city: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { city: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    city: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        city: typeof args.city === 'object'
                ? args.city.id
                : args.city,
                }

    return edit.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::edit
 * @see app/Http/Controllers/CityController.php:101
 * @route '/varosok/{city}/szerkesztes'
 */
edit.get = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::edit
 * @see app/Http/Controllers/CityController.php:101
 * @route '/varosok/{city}/szerkesztes'
 */
edit.head = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CityController::update
 * @see app/Http/Controllers/CityController.php:111
 * @route '/varosok/{city}'
 */
export const update = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/varosok/{city}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CityController::update
 * @see app/Http/Controllers/CityController.php:111
 * @route '/varosok/{city}'
 */
update.url = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { city: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { city: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    city: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        city: typeof args.city === 'object'
                ? args.city.id
                : args.city,
                }

    return update.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::update
 * @see app/Http/Controllers/CityController.php:111
 * @route '/varosok/{city}'
 */
update.patch = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CityController::destroy
 * @see app/Http/Controllers/CityController.php:142
 * @route '/varosok/{city}'
 */
export const destroy = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/varosok/{city}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CityController::destroy
 * @see app/Http/Controllers/CityController.php:142
 * @route '/varosok/{city}'
 */
destroy.url = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { city: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { city: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    city: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        city: typeof args.city === 'object'
                ? args.city.id
                : args.city,
                }

    return destroy.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::destroy
 * @see app/Http/Controllers/CityController.php:142
 * @route '/varosok/{city}'
 */
destroy.delete = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CityController::show
 * @see app/Http/Controllers/CityController.php:89
 * @route '/varosok/{city}'
 */
export const show = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/varosok/{city}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::show
 * @see app/Http/Controllers/CityController.php:89
 * @route '/varosok/{city}'
 */
show.url = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::show
 * @see app/Http/Controllers/CityController.php:89
 * @route '/varosok/{city}'
 */
show.get = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::show
 * @see app/Http/Controllers/CityController.php:89
 * @route '/varosok/{city}'
 */
show.head = (args: { city: string | { slug: string } } | [city: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CityController::cities
 * @see app/Http/Controllers/CityController.php:38
 * @route '/varosok'
 */
export const cities = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cities.url(options),
    method: 'get',
})

cities.definition = {
    methods: ["get","head"],
    url: '/varosok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::cities
 * @see app/Http/Controllers/CityController.php:38
 * @route '/varosok'
 */
cities.url = (options?: RouteQueryOptions) => {
    return cities.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::cities
 * @see app/Http/Controllers/CityController.php:38
 * @route '/varosok'
 */
cities.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cities.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::cities
 * @see app/Http/Controllers/CityController.php:38
 * @route '/varosok'
 */
cities.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cities.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CityController::cityHandle
 * @see app/Http/Controllers/CityController.php:44
 * @route '/varosok-kezelese'
 */
export const cityHandle = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cityHandle.url(options),
    method: 'get',
})

cityHandle.definition = {
    methods: ["get","head"],
    url: '/varosok-kezelese',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::cityHandle
 * @see app/Http/Controllers/CityController.php:44
 * @route '/varosok-kezelese'
 */
cityHandle.url = (options?: RouteQueryOptions) => {
    return cityHandle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::cityHandle
 * @see app/Http/Controllers/CityController.php:44
 * @route '/varosok-kezelese'
 */
cityHandle.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cityHandle.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::cityHandle
 * @see app/Http/Controllers/CityController.php:44
 * @route '/varosok-kezelese'
 */
cityHandle.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cityHandle.url(options),
    method: 'head',
})
const CityController = { index, create, store, edit, update, destroy, show, cities, cityHandle }

export default CityController