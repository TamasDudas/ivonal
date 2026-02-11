import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IncomingEmailController::contactPage
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
export const contactPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contactPage.url(options),
    method: 'get',
})

contactPage.definition = {
    methods: ["get","head"],
    url: '/kapcsolat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::contactPage
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
contactPage.url = (options?: RouteQueryOptions) => {
    return contactPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::contactPage
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
contactPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contactPage.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncomingEmailController::contactPage
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
contactPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contactPage.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncomingEmailController::contactPage
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
    const contactPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: contactPage.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncomingEmailController::contactPage
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
        contactPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contactPage.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncomingEmailController::contactPage
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
        contactPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contactPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    contactPage.form = contactPageForm
/**
* @see \App\Http\Controllers\IncomingEmailController::store
 * @see app/Http/Controllers/IncomingEmailController.php:46
 * @route '/contact'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/contact',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::store
 * @see app/Http/Controllers/IncomingEmailController.php:46
 * @route '/contact'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::store
 * @see app/Http/Controllers/IncomingEmailController.php:46
 * @route '/contact'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\IncomingEmailController::store
 * @see app/Http/Controllers/IncomingEmailController.php:46
 * @route '/contact'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IncomingEmailController::store
 * @see app/Http/Controllers/IncomingEmailController.php:46
 * @route '/contact'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\IncomingEmailController::index
 * @see app/Http/Controllers/IncomingEmailController.php:22
 * @route '/incoming-emails'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/incoming-emails',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::index
 * @see app/Http/Controllers/IncomingEmailController.php:22
 * @route '/incoming-emails'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::index
 * @see app/Http/Controllers/IncomingEmailController.php:22
 * @route '/incoming-emails'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncomingEmailController::index
 * @see app/Http/Controllers/IncomingEmailController.php:22
 * @route '/incoming-emails'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncomingEmailController::index
 * @see app/Http/Controllers/IncomingEmailController.php:22
 * @route '/incoming-emails'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncomingEmailController::index
 * @see app/Http/Controllers/IncomingEmailController.php:22
 * @route '/incoming-emails'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncomingEmailController::index
 * @see app/Http/Controllers/IncomingEmailController.php:22
 * @route '/incoming-emails'
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
* @see \App\Http\Controllers\IncomingEmailController::show
 * @see app/Http/Controllers/IncomingEmailController.php:77
 * @route '/incoming-emails/{incomingEmail}'
 */
export const show = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/incoming-emails/{incomingEmail}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::show
 * @see app/Http/Controllers/IncomingEmailController.php:77
 * @route '/incoming-emails/{incomingEmail}'
 */
show.url = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incomingEmail: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { incomingEmail: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    incomingEmail: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incomingEmail: typeof args.incomingEmail === 'object'
                ? args.incomingEmail.id
                : args.incomingEmail,
                }

    return show.definition.url
            .replace('{incomingEmail}', parsedArgs.incomingEmail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::show
 * @see app/Http/Controllers/IncomingEmailController.php:77
 * @route '/incoming-emails/{incomingEmail}'
 */
show.get = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncomingEmailController::show
 * @see app/Http/Controllers/IncomingEmailController.php:77
 * @route '/incoming-emails/{incomingEmail}'
 */
show.head = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IncomingEmailController::show
 * @see app/Http/Controllers/IncomingEmailController.php:77
 * @route '/incoming-emails/{incomingEmail}'
 */
    const showForm = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IncomingEmailController::show
 * @see app/Http/Controllers/IncomingEmailController.php:77
 * @route '/incoming-emails/{incomingEmail}'
 */
        showForm.get = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IncomingEmailController::show
 * @see app/Http/Controllers/IncomingEmailController.php:77
 * @route '/incoming-emails/{incomingEmail}'
 */
        showForm.head = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\IncomingEmailController::markAsRead
 * @see app/Http/Controllers/IncomingEmailController.php:95
 * @route '/incoming-emails/{incomingEmail}/mark-read'
 */
export const markAsRead = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markAsRead.url(args, options),
    method: 'patch',
})

markAsRead.definition = {
    methods: ["patch"],
    url: '/incoming-emails/{incomingEmail}/mark-read',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::markAsRead
 * @see app/Http/Controllers/IncomingEmailController.php:95
 * @route '/incoming-emails/{incomingEmail}/mark-read'
 */
markAsRead.url = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incomingEmail: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { incomingEmail: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    incomingEmail: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incomingEmail: typeof args.incomingEmail === 'object'
                ? args.incomingEmail.id
                : args.incomingEmail,
                }

    return markAsRead.definition.url
            .replace('{incomingEmail}', parsedArgs.incomingEmail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::markAsRead
 * @see app/Http/Controllers/IncomingEmailController.php:95
 * @route '/incoming-emails/{incomingEmail}/mark-read'
 */
markAsRead.patch = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markAsRead.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\IncomingEmailController::markAsRead
 * @see app/Http/Controllers/IncomingEmailController.php:95
 * @route '/incoming-emails/{incomingEmail}/mark-read'
 */
    const markAsReadForm = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markAsRead.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IncomingEmailController::markAsRead
 * @see app/Http/Controllers/IncomingEmailController.php:95
 * @route '/incoming-emails/{incomingEmail}/mark-read'
 */
        markAsReadForm.patch = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markAsRead.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    markAsRead.form = markAsReadForm
/**
* @see \App\Http\Controllers\IncomingEmailController::markAsReplied
 * @see app/Http/Controllers/IncomingEmailController.php:112
 * @route '/incoming-emails/{incomingEmail}/mark-replied'
 */
export const markAsReplied = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markAsReplied.url(args, options),
    method: 'patch',
})

markAsReplied.definition = {
    methods: ["patch"],
    url: '/incoming-emails/{incomingEmail}/mark-replied',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::markAsReplied
 * @see app/Http/Controllers/IncomingEmailController.php:112
 * @route '/incoming-emails/{incomingEmail}/mark-replied'
 */
markAsReplied.url = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incomingEmail: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { incomingEmail: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    incomingEmail: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incomingEmail: typeof args.incomingEmail === 'object'
                ? args.incomingEmail.id
                : args.incomingEmail,
                }

    return markAsReplied.definition.url
            .replace('{incomingEmail}', parsedArgs.incomingEmail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::markAsReplied
 * @see app/Http/Controllers/IncomingEmailController.php:112
 * @route '/incoming-emails/{incomingEmail}/mark-replied'
 */
markAsReplied.patch = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markAsReplied.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\IncomingEmailController::markAsReplied
 * @see app/Http/Controllers/IncomingEmailController.php:112
 * @route '/incoming-emails/{incomingEmail}/mark-replied'
 */
    const markAsRepliedForm = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markAsReplied.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IncomingEmailController::markAsReplied
 * @see app/Http/Controllers/IncomingEmailController.php:112
 * @route '/incoming-emails/{incomingEmail}/mark-replied'
 */
        markAsRepliedForm.patch = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markAsReplied.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    markAsReplied.form = markAsRepliedForm
/**
* @see \App\Http\Controllers\IncomingEmailController::destroy
 * @see app/Http/Controllers/IncomingEmailController.php:128
 * @route '/incoming-emails/{incomingEmail}'
 */
export const destroy = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/incoming-emails/{incomingEmail}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::destroy
 * @see app/Http/Controllers/IncomingEmailController.php:128
 * @route '/incoming-emails/{incomingEmail}'
 */
destroy.url = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incomingEmail: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { incomingEmail: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    incomingEmail: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incomingEmail: typeof args.incomingEmail === 'object'
                ? args.incomingEmail.id
                : args.incomingEmail,
                }

    return destroy.definition.url
            .replace('{incomingEmail}', parsedArgs.incomingEmail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::destroy
 * @see app/Http/Controllers/IncomingEmailController.php:128
 * @route '/incoming-emails/{incomingEmail}'
 */
destroy.delete = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\IncomingEmailController::destroy
 * @see app/Http/Controllers/IncomingEmailController.php:128
 * @route '/incoming-emails/{incomingEmail}'
 */
    const destroyForm = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IncomingEmailController::destroy
 * @see app/Http/Controllers/IncomingEmailController.php:128
 * @route '/incoming-emails/{incomingEmail}'
 */
        destroyForm.delete = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const IncomingEmailController = { contactPage, store, index, show, markAsRead, markAsReplied, destroy }

export default IncomingEmailController