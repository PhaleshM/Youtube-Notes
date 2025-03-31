<script>
  // @ts-ignore
  // @ts-ignore
  import { onDestroy, onMount, unmount } from "svelte";
  import { extractYouTubeVideoId } from "../utils";

  export let close;

  let video_id = null;
  let video_title = "Select Video";
  let video_time = "00:00";
  let title = "";
  let description = "";
  let ytbNotes = {};
  let video_thumbnail = null;
  let video_element = null;

  let current_time_url = "";

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    ytbNotes = JSON.parse(localStorage.getItem("ytbNotes")) || {};

    const formData = {
      video_id,
      video_title,
      video_time,
      title,
      description,
      url: current_time_url,
      thumbnail: video_thumbnail,
    };
    // console.log(formData);
    // console.log(video_id);

    ytbNotes[video_id] = formData;
    localStorage.setItem("ytbNotes", JSON.stringify(ytbNotes));

    handleClose();
  };

  // Handle close form
  const handleClose = () => {
    video_title = "Select Video";
    video_time = "00:00";
    title = "";
    description = "";

    video_element.click();
    close();
  };

  function showForm() {
    video_element = document.getElementsByClassName("html5-video-container")[0];

    // @ts-ignore
    video_element.click();

    video_id = extractYouTubeVideoId(window.location.href);

    video_title = document.querySelector(
      ".style-scope .ytd-watch-metadata #title"
      // @ts-ignore
    )?.innerText;

    video_thumbnail = `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg
`;

    video_time = "00:00";
    try {
      video_time =
        // @ts-ignore
        document.querySelector(".ytp-time-current").innerHTML || "00:00";
    } catch (error) {}

    let timeParts = video_time.split(":");

    let video_time_sec = 0;
    timeParts.forEach((element) => {
      video_time_sec = video_time_sec * 60;
      video_time_sec = video_time_sec + parseInt(element);
    });

    current_time_url = `https://youtu.be/${video_id}?t=${video_time_sec}`;

    const shadowRoot = document.getElementById("ytb-Notes").shadowRoot;

    const input_elements = shadowRoot.querySelectorAll(".form_inputs");

    input_elements.forEach((element) => {
      element.addEventListener("keydown", (event) => {
        event.stopPropagation();
      });
    });
  }

  onMount(showForm);

  onDestroy(handleClose);
</script>

<div
  class="fixed bottom-3 right-3 bg-gray-200 p-5 max-w-2/6 rounded-lg shadow-lg"
  style="z-index: 10000;"
>
  <button
    class="absolute top-2 right-2 text-gray-700 text-3xl font-bold"
    on:click={handleClose}>&times;</button
  >

  <h3 class="text-center text-2xl mb-2 font-semibold">Submit Your Thought</h3>
  <h5 class="text-center text-xl text-gray-600 mb-1">{video_title}</h5>
  <h5 class="text-center text-xl text-gray-500 mb-2">{video_time}</h5>

  <form on:submit={handleSubmit}>
    <label for="title" class="block text-xl font-bold mb-1">Title</label>
    <input
      type="text"
      id="ytb-form-title"
      bind:value={title}
      class="form_inputs w-full p-2 mb-2 border text-xl border-gray-300 rounded-md"
      required
    />

    <label for="description" class="block text-xl font-bold mb-1"
      >Description</label
    >
    <textarea
      name="description"
      id="ytb-form-description"
      bind:value={description}
      rows="4"
      class="form_inputs w-full p-2 mb-2 border text-lx border-gray-300 rounded-md"
      required
    ></textarea>

    <button
      type="submit"
      class="w-full p-3 bg-blue-600 text-white rounded-md cursor-pointer mt-3"
      >Submit</button
    >
  </form>
</div>
