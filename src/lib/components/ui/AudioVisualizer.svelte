<script lang="ts">
	let { active = false }: { active?: boolean } = $props();

	const bars = Array.from({ length: 28 }, (_, i) => i);

	function heightFor(i: number) {
		// deterministic pseudo-random bar heights so it looks the same on every render
		const seed = Math.sin(i * 12.9898) * 43758.5453;
		const frac = seed - Math.floor(seed);
		return 8 + Math.round(frac * 32);
	}
</script>

<div class="flex h-16 items-center justify-center gap-1">
	{#each bars as i (i)}
		<div
			class="w-1.5 rounded-full transition-all duration-300"
			class:bg-teal-500={active}
			class:bg-slate-200={!active}
			class:animate-pulse-rec={active}
			style="height: {active ? heightFor(i) : 6}px; animation-delay: {i * 40}ms"
		></div>
	{/each}
</div>
