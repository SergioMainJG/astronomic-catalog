<script lang="ts">
  import CloudinaryUpload from "./CloudinaryUpload.svelte";

  // Allow any props to avoid TS errors
  let { ..._props } = $props();

  let objectType = $state("blackhole");

  let form = $state({
    globalName: "",
    description: "",
    imageUrl: "",
    massSolar: 0,
  });

  let message = $state("");
  let isError = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    message = "";
    isError = false;

    // Black Hole Payload
    const url = "http://localhost:3000/blackholes";
    const payload = {
      globalName: form.globalName,
      description: form.description,
      imageUrl: form.imageUrl,
      massSolar: form.massSolar,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message = "Black Hole created successfully!";
        // Reset form
        form.globalName = "";
        form.description = "";
        form.imageUrl = "";
        form.massSolar = 0;
      } else {
        const data = await response.json();
        isError = true;
        message = `Error: ${data.message || response.statusText}`;
      }
    } catch (err: any) {
      isError = true;
      message = `Request failed: ${err.message}`;
    }
  }
</script>

<form
  onsubmit={handleSubmit}
  class="bg-slate-800 p-8 rounded-xl border border-slate-700 space-y-6 shadow-2xl"
>
  <h2 class="text-2xl font-bold text-white mb-6">Add Black Hole</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="col-span-1 md:col-span-2">
      <label class="block text-sm font-medium text-slate-300 mb-1"
        >Global Name</label
      >
      <input
        type="text"
        bind:value={form.globalName}
        required
        class="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="e.g. Sagittarius A*"
      />
    </div>

    <div class="col-span-1 md:col-span-2">
      <label class="block text-sm font-medium text-slate-300 mb-1"
        >Description</label
      >
      <textarea
        bind:value={form.description}
        required
        rows="3"
        class="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="Description..."
      ></textarea>
    </div>

    <div class="col-span-1 md:col-span-2">
      <CloudinaryUpload onUpload={(url) => (form.imageUrl = url)} />
      {#if form.imageUrl}
        <div class="mt-4">
          <p class="text-sm text-green-400 mb-2">Image Selected:</p>
          <img
            src={form.imageUrl}
            alt="Preview"
            class="h-32 rounded-lg border border-slate-600"
          />
        </div>
      {/if}
    </div>

    <!-- Black Hole Specifics -->
    <div class="col-span-1 md:col-span-2 border-t border-slate-700 pt-6">
      <h3 class="text-lg font-semibold text-purple-400 mb-4">
        Black Hole Details
      </h3>
      <div>
        <label class="block text-sm font-medium text-slate-300 mb-1"
          >Mass (Solar Masses)</label
        >
        <input
          type="number"
          step="0.01"
          bind:value={form.massSolar}
          required
          class="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white"
        />
      </div>
    </div>
  </div>

  {#if message}
    <div
      class={`p-4 rounded-lg text-sm font-medium ${isError ? "bg-red-900/50 text-red-200" : "bg-green-900/50 text-green-200"}`}
    >
      {message}
    </div>
  {/if}

  <button
    type="submit"
    class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg"
  >
    Create Black Hole
  </button>
</form>
