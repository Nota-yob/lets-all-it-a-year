<script lang="ts">
	const { story } = $props();
</script>

<div class="flex h-screen w-screen items-center justify-center bg-black p-6 text-white">
	<div class="flex w-full max-w-5xl flex-col items-center gap-10 text-center">
		<!-- Emoji -->
		{#if story.source.theme?.emoji}
			<div class="text-2xl">
				{story.source.theme.emoji}
			</div>
		{/if}

		<!-- Source -->
		<div class="text-2xl opacity-90">
			{story.source.name}
		</div>

		<!-- Before title -->
		{#if story.title?.before}
			<h1 class="text-3xl font-semibold opacity-80 md:text-4xl">
				{story.title.before}
			</h1>
		{/if}

		<!-- Comparison columns -->
		<div class="grid w-full grid-cols-2 gap-12">
			<!-- LEFT -->
			<div class="flex flex-col items-center gap-6">
				{#if story.title?.left}
					<div class="text-2xl font-medium opacity-70 md:text-3xl">
						{story.title.left}
					</div>
				{/if}

				{#if story.data.left.item}
					<div
						class="text-6xl font-extrabold tracking-tight md:text-8xl"
						style="color: {story.source.theme?.primaryColor ?? 'white'}"
					>
						{story.data.left.item.value}
					</div>
				{/if}

				{#if story.data.left.amount}
					<div
						class="flex items-baseline justify-center gap-2 text-5xl font-bold tracking-tight md:text-7xl"
						style="color: {story.source.theme?.primaryColor ?? 'white'}"
					>
						{#if story.data.left.amount.type === 'duration'}
							<span class="text-xl font-medium opacity-70 md:text-2xl"> for </span>
						{/if}

						<span>{story.data.left.amount.value}</span>

						{#if story.data.left.amount.unit}
							<span class="text-xl font-medium opacity-70 md:text-2xl">
								{story.data.left.amount.unit}
							</span>
						{/if}
					</div>
				{/if}
			</div>

			<!-- RIGHT -->
			<div class="flex flex-col items-center gap-6">
				{#if story.title?.right}
					<div class="text-2xl font-medium opacity-70 md:text-3xl">
						{story.title.right}
					</div>
				{/if}

				{#if story.data.right.item}
					<div
						class="text-6xl font-extrabold tracking-tight md:text-8xl"
						style="color: {story.source.theme?.primaryColor ?? 'white'}"
					>
						{story.data.right.item.value}
					</div>
				{/if}

				{#if story.data.right.amount}
					<div
						class="flex items-baseline justify-center gap-2 text-5xl font-bold tracking-tight md:text-7xl"
						style="color: {story.source.theme?.primaryColor ?? 'white'}"
					>
						{#if story.data.right.amount.type === 'duration'}
							<span class="text-xl font-medium opacity-70 md:text-2xl"> for </span>
						{/if}

						<span>{story.data.right.amount.value}</span>

						{#if story.data.right.amount.unit}
							<span class="text-xl font-medium opacity-70 md:text-2xl">
								{story.data.right.amount.unit}
							</span>
						{/if}
					</div>
				{/if}
			</div>
		</div>

		<!-- After title -->
		{#if story.title?.after}
			<h1 class="text-3xl font-semibold opacity-80 md:text-4xl">
				{story.title.after}
			</h1>
		{/if}
	</div>
</div>
