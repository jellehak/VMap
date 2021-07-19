import googleMaps from '../utils/googleMaps.js'
import map from './mapEvents.js'
import mapEvents from './mapEvents.js'

const SETTINGS = {
  zoom: 2,
  // zoomControl: false,
  // mapTypeControl: false,
  // streetViewControl: false,
  // overviewMapControl: false,
  // scrollwheel: false,
  // styles: options.mapStyle
  fullscreenControl: false,
  // fullscreenControlOptions: {
  //   position: google.maps.ControlPosition.RIGHT_BOTTOM
  // },
  mapTypeId: 'roadmap',
  gestureHandling: 'cooperative',
  center: {
    lat: 25.68654,
    lng: -80.431345
  }
}

export default {
  template: `
  <div :id="mapId">
    <div class="error-box" v-if="error">{{ error }}</div>
    <slot :map="map" v-if="showSlot && !error"></slot>
  </div>`,

  props: {
    apiOptions: { type: Object, default: () => ({}) },
    apiKey: { type: String, default: () => '' },
    mapId: { type: String, default: () => 'map' },
    options: { type: Object, default: () => ({}) },
    center: { type: Object, required: false },
    zoom: { type: Number, default: () => 4 }
  },

  data () {
    return { map: null, showSlot: false, error: '' }
  },

  async created () {
    const addListeners = () => {
      mapEvents.forEach((mappedEvent) => {
        this.map.addListener(mappedEvent.event, (event) => {
          this.$emit(mappedEvent.emit, { map: this.map, event })
        })
      })
    }

    this.initMap = () => {
      const { center, zoom } = this
      const options = {
        ...SETTINGS,
        ...this.options,
        center,
        zoom
      }

      const map = new window.google.maps.Map(
        document.getElementById(this.mapId),
        options
      )

      this.$watch('center', (v) => {
        map.setCenter(v)
      })

      // Expose
      this.map = map

      addListeners()

      // Tell parent
      this.$emit('ready', map)
      this.showSlot = true
    }

    try {
      const apiOptions = {
        ...this.apiOptions,
        key: this.apiKey || this.apiOptions.key
      }
      await googleMaps.load(apiOptions)
      this.initMap()
    } catch (e) {
      this.error = e.message
    }
  }
}
