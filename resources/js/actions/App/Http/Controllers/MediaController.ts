import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MediaController::index
 * @see app/Http/Controllers/MediaController.php:17
 * @route '/media'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/media',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MediaController::index
 * @see app/Http/Controllers/MediaController.php:17
 * @route '/media'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::index
 * @see app/Http/Controllers/MediaController.php:17
 * @route '/media'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MediaController::index
 * @see app/Http/Controllers/MediaController.php:17
 * @route '/media'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MediaController::create
 * @see app/Http/Controllers/MediaController.php:34
 * @route '/media/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/media/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MediaController::create
 * @see app/Http/Controllers/MediaController.php:34
 * @route '/media/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::create
 * @see app/Http/Controllers/MediaController.php:34
 * @route '/media/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MediaController::create
 * @see app/Http/Controllers/MediaController.php:34
 * @route '/media/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MediaController::store
 * @see app/Http/Controllers/MediaController.php:39
 * @route '/media'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/media',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MediaController::store
 * @see app/Http/Controllers/MediaController.php:39
 * @route '/media'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::store
 * @see app/Http/Controllers/MediaController.php:39
 * @route '/media'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MediaController::assignCityFeatured
 * @see app/Http/Controllers/MediaController.php:114
 * @route '/media/{media}/assign-city'
 */
export const assignCityFeatured = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assignCityFeatured.url(args, options),
    method: 'patch',
})

assignCityFeatured.definition = {
    methods: ["patch"],
    url: '/media/{media}/assign-city',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MediaController::assignCityFeatured
 * @see app/Http/Controllers/MediaController.php:114
 * @route '/media/{media}/assign-city'
 */
assignCityFeatured.url = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { media: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    media: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        media: typeof args.media === 'object'
                ? args.media.id
                : args.media,
                }

    return assignCityFeatured.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::assignCityFeatured
 * @see app/Http/Controllers/MediaController.php:114
 * @route '/media/{media}/assign-city'
 */
assignCityFeatured.patch = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assignCityFeatured.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MediaController::assignPropertyFeatured
 * @see app/Http/Controllers/MediaController.php:144
 * @route '/media/{media}/assign-property'
 */
export const assignPropertyFeatured = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assignPropertyFeatured.url(args, options),
    method: 'patch',
})

assignPropertyFeatured.definition = {
    methods: ["patch"],
    url: '/media/{media}/assign-property',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MediaController::assignPropertyFeatured
 * @see app/Http/Controllers/MediaController.php:144
 * @route '/media/{media}/assign-property'
 */
assignPropertyFeatured.url = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { media: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    media: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        media: typeof args.media === 'object'
                ? args.media.id
                : args.media,
                }

    return assignPropertyFeatured.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::assignPropertyFeatured
 * @see app/Http/Controllers/MediaController.php:144
 * @route '/media/{media}/assign-property'
 */
assignPropertyFeatured.patch = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assignPropertyFeatured.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MediaController::assignMultipleToGallery
 * @see app/Http/Controllers/MediaController.php:174
 * @route '/media/assign-gallery'
 */
export const assignMultipleToGallery = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignMultipleToGallery.url(options),
    method: 'post',
})

assignMultipleToGallery.definition = {
    methods: ["post"],
    url: '/media/assign-gallery',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MediaController::assignMultipleToGallery
 * @see app/Http/Controllers/MediaController.php:174
 * @route '/media/assign-gallery'
 */
assignMultipleToGallery.url = (options?: RouteQueryOptions) => {
    return assignMultipleToGallery.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::assignMultipleToGallery
 * @see app/Http/Controllers/MediaController.php:174
 * @route '/media/assign-gallery'
 */
assignMultipleToGallery.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignMultipleToGallery.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MediaController::assignPropertyGallery
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/{media}/assign-gallery'
 */
export const assignPropertyGallery = (args: { media: string | number } | [media: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assignPropertyGallery.url(args, options),
    method: 'patch',
})

assignPropertyGallery.definition = {
    methods: ["patch"],
    url: '/media/{media}/assign-gallery',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\MediaController::assignPropertyGallery
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/{media}/assign-gallery'
 */
assignPropertyGallery.url = (args: { media: string | number } | [media: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    media: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        media: args.media,
                }

    return assignPropertyGallery.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::assignPropertyGallery
 * @see app/Http/Controllers/MediaController.php:0
 * @route '/media/{media}/assign-gallery'
 */
assignPropertyGallery.patch = (args: { media: string | number } | [media: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assignPropertyGallery.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\MediaController::destroy
 * @see app/Http/Controllers/MediaController.php:205
 * @route '/media/{media}'
 */
export const destroy = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/media/{media}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\MediaController::destroy
 * @see app/Http/Controllers/MediaController.php:205
 * @route '/media/{media}'
 */
destroy.url = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { media: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    media: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        media: typeof args.media === 'object'
                ? args.media.id
                : args.media,
                }

    return destroy.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::destroy
 * @see app/Http/Controllers/MediaController.php:205
 * @route '/media/{media}'
 */
destroy.delete = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\MediaController::show
 * @see app/Http/Controllers/MediaController.php:97
 * @route '/media/{media}'
 */
export const show = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/media/{media}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MediaController::show
 * @see app/Http/Controllers/MediaController.php:97
 * @route '/media/{media}'
 */
show.url = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { media: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { media: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    media: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        media: typeof args.media === 'object'
                ? args.media.id
                : args.media,
                }

    return show.definition.url
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\MediaController::show
 * @see app/Http/Controllers/MediaController.php:97
 * @route '/media/{media}'
 */
show.get = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\MediaController::show
 * @see app/Http/Controllers/MediaController.php:97
 * @route '/media/{media}'
 */
show.head = (args: { media: number | { id: number } } | [media: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const MediaController = { index, create, store, assignCityFeatured, assignPropertyFeatured, assignMultipleToGallery, assignPropertyGallery, destroy, show }

export default MediaController