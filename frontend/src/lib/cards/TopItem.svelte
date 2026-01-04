<script lang="ts">
	const { story } = $props();
</script>

<div class="flex h-screen w-screen items-center justify-center bg-black text-white">
	<div class="flex flex-col items-center text-center">
		{#if story.source.theme?.emoji}
			<div class="mb-6 text-2xl">
				{story.source.theme.emoji}
			</div>
		{/if}

		<div class="mb-6 text-2xl">
			{story.source.name}
		</div>

		{#if story.title.before}
			<h1 class="text-3xl font-semibold opacity-80 md:text-4xl">
				{story.title.before}
			</h1>
		{/if}

		<div
			class="mt-6 text-7xl font-extrabold tracking-tight md:text-9xl"
			style="color: {story.source.theme?.primaryColor ?? 'white'}"
		>
			{story.data.item.value}
		</div>
		<div
			class="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl"
			style="color: {story.source.theme?.primaryColor ?? 'white'}"
		>
			{#if story.data.amount.type == 'duration'}
				<span class="ml-2 text-3xl font-medium opacity-70 md:text-4xl"> for </span>
			{/if}

			{story.data.amount.value}

			{#if story.data.amount.unit}
				<span class="ml-2 text-3xl font-medium opacity-70 md:text-4xl">
					{story.data.amount.unit}
				</span>
			{/if}
		</div>

		{#if story.title.after}
			<h1 class="text-3xl font-semibold opacity-80 md:text-4xl">
				{story.title.after}
			</h1>
		{/if}
	</div>
</div>
