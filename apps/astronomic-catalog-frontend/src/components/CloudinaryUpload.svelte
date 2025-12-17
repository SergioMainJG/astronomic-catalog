<script lang="ts">
  import { onMount } from "svelte";

  let { onUpload } = $props<{ onUpload: (url: string) => void }>();

  let isUploading = $state(false);
  let errorMessage = $state("");
  let widget: any;
  let loaded = $state(false);

  const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  onMount(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.onload = () => initializeWidget();
      document.body.appendChild(script);
    } else {
      initializeWidget();
    }
  });

  function initializeWidget() {
    if (!window.cloudinary) return;

    // @ts-ignore
    widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local", "url", "camera"],
        multiple: false,
        resourceType: "image",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Upload success:", result.info.secure_url);
          onUpload(result.info.secure_url);
          isUploading = false;
        } else if (error) {
          console.error("Upload error:", error);
          errorMessage = "Error uploading image.";
          isUploading = false;
        }
      },
    );
    loaded = true;
  }

  function openWidget() {
    if (widget) {
      isUploading = true;
      errorMessage = "";
      widget.open();
    } else {
      errorMessage = "Widget not initialized yet.";
    }
  }
</script>

<div class="space-y-2">
  <label class="block text-sm font-medium text-slate-300">Object Image</label>

  <button
    type="button"
    onclick={openWidget}
    disabled={!loaded}
    class="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {isUploading ? "Uploading..." : "Upload Image"}
  </button>

  {#if errorMessage}
    <p class="text-red-400 text-sm">{errorMessage}</p>
  {/if}
</div>
