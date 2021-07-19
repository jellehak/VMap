import VMap from './components/VMap.js'
import VMarker from './components/VMarker.js'
import VPolygon from './components/VPolygon.js'
import VPolyline from './components/VPolyline.js'
import VHeatmap from './components/VHeatmap.js'
import VObject from './components/VObject.js'
import googleMaps from './utils/googleMaps.js'

export { VMap, VMarker, VPolygon, VPolyline }

export default {
  install (Vue, params = { apiKey: '', version: '', libraries: [] }) {
    googleMaps.load(params)
    Vue.component('VMap', VMap)
    Vue.component('VMarker', VMarker)
    Vue.component('VPolygon', VPolygon)
    Vue.component('VPolyline', VPolyline)
    Vue.component('VHeatmap', VHeatmap)
    Vue.component('VObject', VObject)
  }
}
