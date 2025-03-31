chrome.runtime.onInstalled.addListener(() => {
  console.log("Youtube Notes Installed.");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("mess", message);

  if (message.id === "ytb-Notes") {
    (async () => {
      try {
        let body = message.data.body;

        if (message.data.isFormData) {
          body = new FormData();
          message.data.formData.forEach(([key, value]) => {
            body.append(key, value);
          });
        }

        headers = message.data.headers || {};

        const resp = await fetch(message.url, {
          method: message.data.method || "GET",
          cache: "no-cache",
          headers: headers,
          body: body,
        });

        let result;
        if (message.data.response === "text") {
          result = await resp.text();
        } else {
          result = await resp.json();
        }

        sendResponse({ success: true, data: result });
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    })();

    return true;
  }
});
