import SitemapController from './SitemapController'
import CityController from './CityController'
import IncomingEmailController from './IncomingEmailController'
import PropertyController from './PropertyController'
import MediaController from './MediaController'
import Settings from './Settings'
const Controllers = {
    SitemapController: Object.assign(SitemapController, SitemapController),
CityController: Object.assign(CityController, CityController),
IncomingEmailController: Object.assign(IncomingEmailController, IncomingEmailController),
PropertyController: Object.assign(PropertyController, PropertyController),
MediaController: Object.assign(MediaController, MediaController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers