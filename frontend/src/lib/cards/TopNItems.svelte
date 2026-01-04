<script lang="ts">
	const { story } = $props();
	$inspect(story).with(console.log);
</script>

<div class="flex h-screen w-screen items-center justify-center bg-black p-4 text-white">
	<div class="flex w-full max-w-2xl flex-col items-center space-y-8 text-center">
		<!-- Optional emoji -->
		{#if story.source.theme?.emoji}
			<div class="text-2xl">{story.source.theme.emoji}</div>
		{/if}

		<!-- Source name -->
		<div class="text-2xl">{story.source.name}</div>

		<!-- Story title before -->
		{#if story.title.before}
			<h1 class="text-3xl font-semibold opacity-80 md:text-4xl">{story.title.before}</h1>
		{/if}

		<!-- Top N items list -->
		<div class="mt-6 w-full">
			{#each story.data.items as item, index}
				{console.log(item)}
				<div class="flex items-center border-b border-white/20 py-4 last:border-b-0">
					<!-- Rank + Label -->
					<div class="flex items-center space-x-4">
						<span class="text-xl font-bold opacity-80 md:text-2xl">{index + 1}.</span>
						<span class="text-2xl font-semibold md:text-3xl">{item.label}</span>
					</div>

					<!-- Spacer pushes value to the right -->
					<div class="flex-1"></div>

					<!-- Value -->
					<div
						class="text-right text-3xl font-extrabold tracking-tight md:text-5xl"
						style="color: {story.source.theme?.primaryColor ?? 'white'}"
					>
						{item.value}

						{#if item.unit}
							<span class="ml-2 text-xl font-medium opacity-70 md:text-2xl">{item.unit}</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Story title after -->
		{#if story.title.after}
			<h1 class="text-3xl font-semibold opacity-80 md:text-4xl">{story.title.after}</h1>
		{/if}
	</div>
</div>
