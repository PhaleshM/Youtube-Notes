<script>
  import { onMount } from "svelte";
  import { extractYouTubeVideoId } from "../utils";

  let ytbNotes = {};

  function showThoughts() {
    ytbNotes = JSON.parse(localStorage.getItem("ytbNotes")) || {};
  }

  function removeNote(url) {
    let video_id = extractYouTubeVideoId(url);
    ytbNotes = JSON.parse(localStorage.getItem("ytbNotes")) || {};
    delete ytbNotes?.[video_id];
    ytbNotes = ytbNotes;
    localStorage.setItem("ytbNotes", JSON.stringify(ytbNotes));
  }

  onMount(showThoughts);
</script>

<div
  class="fixed flex flex-col gap-4 bottom-3 right-3 bg-gray-200 p-5 rounded-lg shadow-xl max-w-2/6 h-1/2 overflow-y-auto"
  style="z-index: 10000;"
>
  {#each Object.values(ytbNotes) as note}
    <div
      class="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
    >
      <img
        src={note.thumbnail}
        alt={note.title}
        class="w-full h-72 object-cover rounded-md mb-4"
      />
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-800">
          {note.title}
        </h1>
        <p class="text-xl text-gray-600">Time: {note.video_time}</p>
        <p class="text-xl text-gray-600">Video Title: {note.video_title}</p>
        <p class="text-xl text-gray-600">Description: {note.description}</p>
      </div>
      <div class="flex justify-around mt-4">
        <button
          on:click={() => {
            removeNote(note.video_id);
          }}
          class="inline-block px-6 text-2xl py-3 text-white bg-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors duration-200"
        >
          Remove
        </button>
        <a
          href={note.url}
          class="inline-block px-6 py-3 text-2xl text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch
        </a>
      </div>
    </div>
  {/each}
</div>
