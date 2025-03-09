# YouTube iframe API Wrapper
Youtube iframe APIをラップしたライブラリです。

## インストール

```sh
npm install youtube-iframe-api-wrapper
```

## Youtube iframe options
公式ページ参照
https://developers.google.com/youtube/iframe_api_reference

## example
再生ボタンを押したら動画を再生

```html
<button id="play-btn">play</button>
<div id="display"></div>
<script type="module" src="/src/main.js"></script>
```

```JavaScript
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
```
