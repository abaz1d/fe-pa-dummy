<script lang="ts">
	let { name, size = 20, class: className = '' }: { name: string; size?: number; class?: string } =
		$props();

	const paths: Record<string, string> = {
		mic: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z|M19 10v2a7 7 0 0 1-14 0v-2|M12 19v3',
		upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|17 8 12 3 7 8|12 3 12 15',
		globe:
			'circle:12,12,10|M2 12h20|M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
		play: 'M5 3l16 9-16 9V3z',
		pause: 'M6 4h4v16H6V4z|M14 4h4v16h-4V4z',
		stop: 'M5 5h14v14H5V5z',
		plus: 'M12 5v14|M5 12h14',
		trash: '3 6 5 6 21 6|M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
		file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|14 2 14 8 20 8',
		result: '9 11 12 14 22 4|M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
		users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2|circle:9,7,4|M22 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75',
		home: '3 9 12 2 21 9 21 22 3 22 3 9|9 22 9 12 15 12 15 22',
		clock: 'circle:12,12,10|12 6 12 12 16 14',
		download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|7 10 12 15 17 10|M12 15V3',
		'log-out': 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4|16 17 21 12 16 7|M21 12H9'
	};

	const d = paths[name] ?? paths.file;
</script>

<svg
	width={size}
	height={size}
	class={className}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	{#each d.split('|') as seg (seg)}
		{#if seg.startsWith('circle:')}
			{@const [cx, cy, r] = seg.replace('circle:', '').split(',')}
			<circle {cx} {cy} {r} />
		{:else if seg.startsWith('M') || seg.startsWith('m')}
			<path d={seg} />
		{:else}
			<polyline points={seg} />
		{/if}
	{/each}
</svg>
