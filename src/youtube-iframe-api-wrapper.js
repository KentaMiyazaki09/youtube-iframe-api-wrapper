/**
 * 複数回呼び出すと、window.onYouTubeIframeAPIReadyを上書きしてしまうためPromiseを使い回す方法で回避
 */
const loadYouTubeAPI = (() => {
  let promise = null;

  return () => {
    if (typeof window === "undefined") {
      return Promise.reject(new Error("Must be called in browser"));
    }
    // 既に読み込み済み
    if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
    // 共有Promiseがあればそれを返す
    if (promise) return promise;

    promise = new Promise((resolve, reject) => {
      // 先にグローバルコールバックを定義（上書き安全に）
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.(); // 既存があれば呼ぶ
        resolve(window.YT);
      };

      // 既にscriptがあれば挿入しない
      const existing =
        document.querySelector <
        HTMLScriptElement >
        'script[src="https://www.youtube.com/iframe_api"]';
      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        tag.onerror = (e) => reject(e);
        document.head.appendChild(tag);
      }
    });

    return promise;
  };
})();

/**
 *
 * @param { string | HTMLElement } mount 動画を描画したい要素のID名 or HTMLElement
 * @param { string } videoId youtubeビデオのID
 * @param { Object } options youtube iframe APIのオプション設定（https://developers.google.com/youtube/iframe_api_reference#Operations）
 * @returns
 */
export async function youtubeIframeAPIWrapper(mount, videoId, options) {
  const YT = await loadYouTubeAPI();
  const player = new YT.Player(mount, { videoId, ...options });
  return player;
}
