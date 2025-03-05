import { youtubeIframeAPIWrapper } from '/src/youtube-iframe-api-wrapper.js'

const display = 'display'
const videoID = 'vv7mq4dGm4o'
const options = {
  playerVars: {
    rel: 0,
    mute: 1,
  },
  events: {
    onReady: function (event) {
      document.getElementById('play-btn').addEventListener('click', () => event.target.playVideo())
    },
  },
}

youtubeIframeAPIWrapper(display, videoID, options)
