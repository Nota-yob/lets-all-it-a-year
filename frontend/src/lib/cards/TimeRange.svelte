<script lang="ts">
  const { story } = $props<{
    story: any;
  }>();

  function toMinutes(time: string) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  function getSegments(start: number, end: number) {
    if (end >= start) {
      return [{ left: start, width: end - start }];
    }
    return [
      { left: start, width: 1440 - start },
      { left: 0, width: end }
    ];
  }

  function percent(min: number) {
    return (min / 1440) * 100;
  }

  const startStr = $derived(story.data.start.value);
  const endStr   = $derived(story.data.end.value);

  const start = $derived(toMinutes(startStr));
  const end   = $derived(toMinutes(endStr));

  const segments = $derived(getSegments(start, end));
</script>

<div class="h-screen w-screen bg-black text-white flex items-center justify-center p-6">
  <div class="flex flex-col items-center text-center space-y-8 w-full max-w-3xl">

    <!-- Source -->
    <div class="text-2xl opacity-90">
      {story.source.name}
    </div>

    <!-- Title before -->
    {#if story.title?.before}
      <h1 class="text-3xl md:text-4xl font-semibold opacity-80">
        {story.title.before}
      </h1>
    {/if}

    <!-- Timeline wrapper -->
    <div class="relative w-full mt-12 mb-3">

      <!-- Timeline bar -->
      <div class="relative w-full h-10 rounded-full bg-white/20 overflow-hidden">
        {#each segments as seg}
          <div
            class="absolute h-full rounded-full"
            style="
              left: {percent(seg.left)}%;
              width: {percent(seg.width)}%;
              background-color: {story.source.theme?.primaryColor ?? 'white'};
            "
          ></div>
        {/each}
      </div>

      <!-- Start label -->
      <div
        class="absolute top-[-2.5rem] -translate-x-1/2 text-m font-medium"
        style="left: {percent(start)}%;"
      >
        {startStr}
      </div>

      <!-- Start marker -->
      <div
        class="absolute top-[-1rem] w-1 h-3 rounded-full bg-white"
        style="left: {percent(start)}%; transform: translateX(-50%);"
      ></div>

      <!-- End label -->
      <div
        class="absolute top-[-2.5rem] -translate-x-1/2 text-m font-medium"
        style="left: {percent(end)}%;"
      >
        {endStr}
      </div>

      <!-- End marker -->
      <div
        class="absolute top-[-1rem] w-1 h-3 rounded-full bg-white"
        style="left: {percent(end)}%; transform: translateX(-50%);"
      ></div>

    </div>

    <!-- Hour ticks -->
    <div class="flex justify-between w-full text-s opacity-50">
      <span>00</span>
      <span>06</span>
      <span>12</span>
      <span>18</span>
      <span>24</span>
    </div>

    <!-- Title after -->
    {#if story.title?.after}
      <h1 class="text-3xl md:text-4xl font-semibold opacity-80">
        {story.title.after}
      </h1>
    {/if}

  </div>
</div>
