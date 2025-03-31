<script>
  import { onMount } from "svelte";
  import Form from "./lib/Form.svelte";
  import Thoughts from "./lib/Thoughts.svelte";

  let show_form = false;
  let show_thoughts = false;

  import { fetch, ifURLYoutube, extractYouTubeVideoId } from "./utils";

  // Handle keyboard event (Alt + S)
  const handleKeydown = (event) => {
    if (event.altKey && event.key === "s") {
      event.preventDefault();
      show_form = !show_form;
    }

    if (event.altKey && event.key === "v") {
      event.preventDefault();

      show_thoughts = !show_thoughts;
    }
  };

  function closeComponent() {
    show_form = false;
  }

  // Listen for the keyboard event when the component is mounted
  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    // return () => {
    //   window.removeEventListener("keydown", handleKeydown);
    // };
  });
</script>

{#if show_form}
  <Form close={closeComponent}></Form>
{/if}

{#if show_thoughts}
  <Thoughts></Thoughts>
{/if}
