import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import by from './by'
/**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:21
 * @route '/ingatlanok'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ingatlanok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:21
 * @route '/ingatlanok'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:21
 * @route '/ingatlanok'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:21
 * @route '/ingatlanok'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:21
 * @route '/ingatlanok'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:21
 * @route '/ingatlanok'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PropertyController::index
 * @see app/Http/Controllers/PropertyController.php:21
 * @route '/ingatlanok'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:74
 * @route '/ingatlanok/letrehozas'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/ingatlanok/letrehozas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:74
 * @route '/ingatlanok/letrehozas'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:74
 * @route '/ingatlanok/letrehozas'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:74
 * @route '/ingatlanok/letrehozas'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:74
 * @route '/ingatlanok/letrehozas'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:74
 * @route '/ingatlanok/letrehozas'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PropertyController::create
 * @see app/Http/Controllers/PropertyController.php:74
 * @route '/ingatlanok/letrehozas'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:86
 * @route '/ingatlanok'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ingatlanok',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:86
 * @route '/ingatlanok'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:86
 * @route '/ingatlanok'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:86
 * @route '/ingatlanok'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PropertyController::store
 * @see app/Http/Controllers/PropertyController.php:86
 * @route '/ingatlanok'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PropertyController::edit
 * @see app/Http/Controllers/PropertyController.php:197
 * @route '/ingatlanok/{property}/szerkesztes'
 */
export const edit = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/ingatlanok/{property}/szerkesztes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PropertyController::edit
 * @see app/Http/Controllers/PropertyController.php:197
 * @route '/ingatlanok/{property}/szerkesztes'
 */
edit.url = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { property: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { property: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    property: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        property: typeof args.property === 'object'
                ? args.property.id
                : args.property,
                }

    return edit.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::edit
 * @see app/Http/Controllers/PropertyController.php:197
 * @route '/ingatlanok/{property}/szerkesztes'
 */
edit.get = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PropertyController::edit
 * @see app/Http/Controllers/PropertyController.php:197
 * @route '/ingatlanok/{property}/szerkesztes'
 */
edit.head = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PropertyController::edit
 * @see app/Http/Controllers/PropertyController.php:197
 * @route '/ingatlanok/{property}/szerkesztes'
 */
    const editForm = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PropertyController::edit
 * @see app/Http/Controllers/PropertyController.php:197
 * @route '/ingatlanok/{property}/szerkesztes'
 */
        editForm.get = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PropertyController::edit
 * @see app/Http/Controllers/PropertyController.php:197
 * @route '/ingatlanok/{property}/szerkesztes'
 */
        editForm.head = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\PropertyController::update
 * @see app/Http/Controllers/PropertyController.php:210
 * @route '/ingatlanok/{property}'
 */
export const update = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/ingatlanok/{property}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PropertyController::update
 * @see app/Http/Controllers/PropertyController.php:210
 * @route '/ingatlanok/{property}'
 */
update.url = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { property: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { property: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    property: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        property: typeof args.property === 'object'
                ? args.property.id
                : args.property,
                }

    return update.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::update
 * @see app/Http/Controllers/PropertyController.php:210
 * @route '/ingatlanok/{property}'
 */
update.patch = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PropertyController::update
 * @see app/Http/Controllers/PropertyController.php:210
 * @route '/ingatlanok/{property}'
 */
    const updateForm = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PropertyController::update
 * @see app/Http/Controllers/PropertyController.php:210
 * @route '/ingatlanok/{property}'
 */
        updateForm.patch = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\PropertyController::destroy
 * @see app/Http/Controllers/PropertyController.php:254
 * @route '/ingatlanok/{property}'
 */
export const destroy = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/ingatlanok/{property}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PropertyController::destroy
 * @see app/Http/Controllers/PropertyController.php:254
 * @route '/ingatlanok/{property}'
 */
destroy.url = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { property: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { property: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    property: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        property: typeof args.property === 'object'
                ? args.property.id
                : args.property,
                }

    return destroy.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::destroy
 * @see app/Http/Controllers/PropertyController.php:254
 * @route '/ingatlanok/{property}'
 */
destroy.delete = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PropertyController::destroy
 * @see app/Http/Controllers/PropertyController.php:254
 * @route '/ingatlanok/{property}'
 */
    const destroyForm = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PropertyController::destroy
 * @see app/Http/Controllers/PropertyController.php:254
 * @route '/ingatlanok/{property}'
 */
        destroyForm.delete = (args: { property: number | { id: number } } | [property: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:128
 * @route '/ingatlanok/{property}'
 */
export const show = (args: { property: string | { slug: string } } | [property: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/ingatlanok/{property}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:128
 * @route '/ingatlanok/{property}'
 */
show.url = (args: { property: string | { slug: string } } | [property: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { property: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { property: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    property: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        property: typeof args.property === 'object'
                ? args.property.slug
                : args.property,
                }

    return show.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:128
 * @route '/ingatlanok/{property}'
 */
show.get = (args: { property: string | { slug: string } } | [property: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:128
 * @route '/ingatlanok/{property}'
 */
show.head = (args: { property: string | { slug: string } } | [property: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:128
 * @route '/ingatlanok/{property}'
 */
    const showForm = (args: { property: string | { slug: string } } | [property: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:128
 * @route '/ingatlanok/{property}'
 */
        showForm.get = (args: { property: string | { slug: string } } | [property: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PropertyController::show
 * @see app/Http/Controllers/PropertyController.php:128
 * @route '/ingatlanok/{property}'
 */
        showForm.head = (args: { property: string | { slug: string } } | [property: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const properties = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
by: Object.assign(by, by),
show: Object.assign(show, show),
}

export default properties