import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CityController::list
 * @see app/Http/Controllers/CityController.php:38
 * @route '/varosok'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/varosok',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::list
 * @see app/Http/Controllers/CityController.php:38
 * @route '/varosok'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::list
 * @see app/Http/Controllers/CityController.php:38
 * @route '/varosok'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::list
 * @see app/Http/Controllers/CityController.php:38
 * @route '/varosok'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})
const publicMethod = {
    list: Object.assign(list, list),
}

export default publicMethod