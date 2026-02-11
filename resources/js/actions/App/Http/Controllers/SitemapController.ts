import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SitemapController::index
 * @see app/Http/Controllers/SitemapController.php:11
 * @route '/sitemap.xml'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sitemap.xml',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SitemapController::index
 * @see app/Http/Controllers/SitemapController.php:11
 * @route '/sitemap.xml'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SitemapController::index
 * @see app/Http/Controllers/SitemapController.php:11
 * @route '/sitemap.xml'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SitemapController::index
 * @see app/Http/Controllers/SitemapController.php:11
 * @route '/sitemap.xml'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const SitemapController = { index }

export default SitemapController