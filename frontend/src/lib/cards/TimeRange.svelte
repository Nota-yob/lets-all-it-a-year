<script lang="ts">
	const { story } = $props<{
		story: any;
	}>();

	function toMinutes(time: string) {
		const [h, m] = time.split(':').map(Number);
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
	const endStr = $derived(story.data.end.value);

	const start = $derived(toMinutes(startStr));
	const end = $derived(toMinutes(endStr));

	const segments = $derived(getSegments(start, end));
</script>

<div class="flex h-screen w-screen items-center justify-center bg-black p-6 text-white">
	<div class="flex w-full max-w-3xl flex-col items-center space-y-8 text-center">
		<!-- Source -->
		<div class="text-2xl opacity-90">
			{story.source.name}
		</div>

		<!-- Title before -->
		{#if story.title?.before}
			<h1 class="text-3xl font-semibold opacity-80 md:text-4xl">
				{story.title.before}
			</h1>
		{/if}

		<!-- Timeline wrapper -->
		<div class="relative mt-12 mb-3 w-full">
			<!-- Timeline bar -->
			<div class="relative h-10 w-full overflow-hidden rounded-full bg-white/20">
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
				class="text-m absolute top-[-2.5rem] -translate-x-1/2 font-medium"
				style="left: {percent(start)}%;"
			>
				{startStr}
			</div>

			<!-- Start marker -->
			<div
				class="absolute top-[-1rem] h-3 w-1 rounded-full bg-white"
				style="left: {percent(start)}%; transform: translateX(-50%);"
			></div>

			<!-- End label -->
			<div
				class="text-m absolute top-[-2.5rem] -translate-x-1/2 font-medium"
				style="left: {percent(end)}%;"
			>
				{endStr}
			</div>

			<!-- End marker -->
			<div
				class="absolute top-[-1rem] h-3 w-1 rounded-full bg-white"
				style="left: {percent(end)}%; transform: translateX(-50%);"
			></div>
		</div>

		<!-- Hour ticks -->
		<div class="text-s flex w-full justify-between opacity-50">
			<span>00</span>
			<span>06</span>
			<span>12</span>
			<span>18</span>
			<span>24</span>
		</div>

		<!-- Title after -->
		{#if story.title?.after}
			<h1 class="text-3xl font-semibold opacity-80 md:text-4xl">
				{story.title.after}
			</h1>
		{/if}
	</div>
</div>
