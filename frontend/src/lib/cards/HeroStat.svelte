<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	const { story } = $props();

	const tween = new Tween(0, {
		duration: 1200,
		easing: cubicOut
	});

	let animatedValue = $state(0);

	// react to story changes
	$effect(() => {
		tween.set(story.data.amount.value);
	});

	// react to tween animation frames
	$effect(() => {
		animatedValue = tween.current;
	});
</script>

<div class="flex h-screen w-screen items-center justify-center bg-black text-white">
	<div in:fade={{ duration: 400 }} class="flex items-center justify-center">
		<div
			in:fly={{ y: 40, duration: 500, easing: cubicOut }}
			class="flex flex-col items-center text-center"
		>
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
				{animatedValue.toFixed(0)}
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
</div>
