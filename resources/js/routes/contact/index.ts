import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\IncomingEmailController::page
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
export const page = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/kapcsolat',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IncomingEmailController::page
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
page.url = (options?: RouteQueryOptions) => {
    return page.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IncomingEmailController::page
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
page.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IncomingEmailController::page
 * @see app/Http/Controllers/IncomingEmailController.php:34
 * @route '/kapcsolat'
 */
page.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(options),
    method: 'head',
})

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
const contact = {
    page: Object.assign(page, page),
store: Object.assign(store, store),
}

export default contact