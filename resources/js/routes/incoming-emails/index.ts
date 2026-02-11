import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
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
* @see \App\Http\Controllers\IncomingEmailController::markRead
 * @see app/Http/Controllers/IncomingEmailController.php:95
 * @route '/incoming-emails/{incomingEmail}/mark-read'
 */
export const markRead = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markRead.url(args, options),
    method: 'patch',
})

markRead.definition = {
    methods: ["patch"],
    url: '/incoming-emails/{incomingEmail}/mark-read',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::markRead
 * @see app/Http/Controllers/IncomingEmailController.php:95
 * @route '/incoming-emails/{incomingEmail}/mark-read'
 */
markRead.url = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markRead.definition.url
            .replace('{incomingEmail}', parsedArgs.incomingEmail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::markRead
 * @see app/Http/Controllers/IncomingEmailController.php:95
 * @route '/incoming-emails/{incomingEmail}/mark-read'
 */
markRead.patch = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markRead.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IncomingEmailController::markReplied
 * @see app/Http/Controllers/IncomingEmailController.php:112
 * @route '/incoming-emails/{incomingEmail}/mark-replied'
 */
export const markReplied = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markReplied.url(args, options),
    method: 'patch',
})

markReplied.definition = {
    methods: ["patch"],
    url: '/incoming-emails/{incomingEmail}/mark-replied',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::markReplied
 * @see app/Http/Controllers/IncomingEmailController.php:112
 * @route '/incoming-emails/{incomingEmail}/mark-replied'
 */
markReplied.url = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markReplied.definition.url
            .replace('{incomingEmail}', parsedArgs.incomingEmail.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::markReplied
 * @see app/Http/Controllers/IncomingEmailController.php:112
 * @route '/incoming-emails/{incomingEmail}/mark-replied'
 */
markReplied.patch = (args: { incomingEmail: number | { id: number } } | [incomingEmail: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: markReplied.url(args, options),
    method: 'patch',
})

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
const incomingEmails = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
markRead: Object.assign(markRead, markRead),
markReplied: Object.assign(markReplied, markReplied),
destroy: Object.assign(destroy, destroy),
}

export default incomingEmails