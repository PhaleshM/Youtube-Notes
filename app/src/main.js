import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { fetch, ifURLYoutube } from "./utils";

let current_url = window.location.href;
let app;

if (ifURLYoutube(current_url)) {
  const div = document.createElement("div");
  div.id = "ytb-Notes";
  (document.body || document.documentElement).appendChild(div);

  // Get the host element where the Shadow DOM will be attached
  const hostElement = document.getElementById("ytb-Notes");

  // Create the Shadow DOM on the host element
  const shadowRoot = hostElement.attachShadow({ mode: "open" });

  // Create a <style> element to include app.css
  const style = document.createElement("style");

  // Add the content of app.css into the <style> tag
  // You can dynamically import your CSS as a string using fetch or other methods, or copy-paste the contents of the file
  const resp = fetch(`https://files.tunl.coderyder.com/content.css?id=1`, {
    response: "text",
  }).then((css) => {
    style.textContent = css.data;
    shadowRoot.appendChild(style);
  });

  // Mount the Svelte app inside the Shadow DOM
  const app = mount(App, {
    target: shadowRoot,
  });

  // @ts-ignore
}

export default app;
// const app = mount(App, { target: document.getElementById("app") });
// export default app;
