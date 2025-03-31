// Function to extract the YouTube video ID from the URL
export function extractYouTubeVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&][^=]*=[^&]*)*/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function ifURLYoutube(url) {
  const youtubePatterns = [
    /^https?:\/\/(www\.)?youtube\.com\//,
    /^https?:\/\/(m\.)?youtube\.com\//,
    /^https?:\/\/youtube\.com\//,
    /^https?:\/\/(www\.)?youtu\.be\//,
    /^https?:\/\/youtu\.be\//,
  ];
  return youtubePatterns.some((pattern) => pattern.test(url));
}

export async function fetch(url, data) {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    chrome.runtime.sendMessage(
      {
        url: url,
        data: data,
        id: "ytb-Notes",
      },
      (response) => {
        // @ts-ignore
        if (chrome.runtime.lastError) {
          // @ts-ignore
          console.error("Error:", chrome.runtime.lastError.message);
          // @ts-ignore
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }

        resolve({
          ok: response.success,
          data: response.data || response.error,
        });
      }
    );
  });
}
