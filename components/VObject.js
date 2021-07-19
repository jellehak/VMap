export default {
  template: `
  <div class="p-absolute"></div>
  `,

  props: {
    type: { type: String, required: true, default: 'Marker' },
    position: { type: Object, required: true },
    infoWindow: { type: String },
    options: { type: Object, default: () => ({}) }
  },

  data () {
    return {
      markerRef: null,
      infoWindowRef: null
    }
  },

  methods: {
    addInfoWindow () {
      this.infoWindowRef = new window.google.maps.InfoWindow({
        content: this.infoWindow
      })
      this.markerRef.addListener('click', () => {
        this.infoWindowRef.open(map, this.markerRef)
      })
    }
  },

  created () {
    const { position, options, $parent } = this
    const MapObject = window.google.maps[this.type]

    const marker = new MapObject({
      ...options,
      position,
      // For a circle
      center: position,
      map: $parent.map
    })

    if (this.infoWindow) {
      this.addInfoWindow()
    }

    // this.markerRef = marker

    this.$watch('position', (coords) => {
      if (!coords) return
      const { lat, lng } = coords
      const latlng = new google.maps.LatLng(lat, lng)

      if (this.type === 'Circle') {
        marker.setCenter(latlng)
      } else {
        marker.setPosition(latlng)
      }
    }, { deep: true })

    this.$watch('options', (v) => {
      Object.entries(v).forEach(([key, value]) => {
        marker.set(key, value)
      })
    }, { deep: true })

    this.quit = () => {
      marker.setMap(null)
    }
  },

  destroyed () {
    this.quit()
  }
}
