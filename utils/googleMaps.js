export const queryString = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')

export const asyncJs = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.src = url
    script.onload = () => {
      resolve()
      script.remove()
    }
    script.onerror = (e) => reject(e)
    document.body.appendChild(script)
  })
}

class GoogleMaps {
  get loaded () {
    return window.google && window.google.maps
  }

  load (params) {
    if (params.apiKey) {
      console.warn('apiKey is deprecated! Please use key')
      params.key = params.apiKey
    }
    if (!this.loaded && !this.promise) {
      this.promise = asyncJs(
        `https://maps.googleapis.com/maps/api/js?${queryString(params)}`
      )
    }
    return this.promise
  }
}

export default new GoogleMaps()
