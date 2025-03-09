const loadYouTubeAPI = (() => {
  let isLoaded = false

  return () => {
    return new Promise((resolve, reject) => {
      if (isLoaded) {
        resolve(window.YT)
        return
      }

      // Youtube iframe APIをロード
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      tag.async = true
      tag.onload = () => {
        window.onYouTubeIframeAPIReady = () => {
          isLoaded = true
          resolve(window.YT)
        }
      }
      tag.onerror = (err) => reject(err)

      document.head.appendChild(tag)
    })
  }
})()

/**
 * @param { string } display 動画を描画する要素のid名
 * @param { string } id 動画のID
 * @param { Object } options YoUtube iframe API options
 */
export default async function youtubeIframeAPIWrapper(display, videId, options) {
  try {
    const YT = await loadYouTubeAPI()

    new YT.Player(display, {
        videoId: videId,
        ...options,
    })
  } catch(error) {
    console.error('YouTube API loading faild: ', error)
  }
}
