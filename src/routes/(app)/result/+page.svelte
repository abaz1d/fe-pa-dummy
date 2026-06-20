<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import StatusBadge from '$lib/components/ui/StatusBadge.svelte';
	import MethodBadge from '$lib/components/ui/MethodBadge.svelte';
	import { transcriptData, actionItemsData, executiveSummary } from '$lib/data/dummy';
	import type { ActionItem } from '$lib/types';

	let isPlaying = $state(false);
	let progress = $state(35);
	let items = $state<ActionItem[]>([...actionItemsData]);

	function togglePlay() {
		isPlaying = !isPlaying;
	}

	function seek(e: MouseEvent) {
		const bar = e.currentTarget as HTMLDivElement;
		const rect = bar.getBoundingClientRect();
		const pct = ((e.clientX - rect.left) / rect.width) * 100;
		progress = Math.min(100, Math.max(0, pct));
	}

	function toggleItem(i: number) {
		items[i] = { ...items[i], done: !items[i].done };
	}

	function speakerStyle(speaker: string) {
		return speaker === 'Speaker A'
			? 'bg-sky-100 text-sky-700'
			: 'bg-pink-100 text-pink-700';
	}

	function exportPdf() {
		alert('Demo: fitur export PDF akan memanggil endpoint backend pada implementasi penuh.');
	}
</script>

<svelte:head>
	<title>Hasil Notulensi — Auto-Minutes</title>
</svelte:head>

<div class="px-4 py-6 sm:px-6 sm:py-8">
	<!-- Header card -->
	<div
		class="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			<h1 class="mb-1.5 text-lg font-bold text-slate-800">Sprint Planning Q1 2026</h1>
			<p class="mb-2.5 text-xs text-slate-400">20 Juni 2026, 09.00 - 10.15 WIB</p>
			<div class="flex items-center gap-2">
				<MethodBadge method="Online" />
				<StatusBadge status="Selesai" />
			</div>
		</div>
		<button
			onclick={exportPdf}
			class="flex items-center justify-center gap-2 rounded-[10px] bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-red-600/25 hover:bg-red-700"
		>
			<Icon name="download" size={16} />
			Export ke PDF
		</button>
	</div>

	<!-- Audio player -->
	<div class="mb-5 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
		<button
			onclick={togglePlay}
			class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-teal-400 text-white shadow-md shadow-teal-600/25"
		>
			<Icon name={isPlaying ? 'pause' : 'play'} size={18} />
		</button>
		<span class="shrink-0 text-xs font-semibold tabular-nums text-slate-500">26:18</span>
		<div
			role="slider"
			tabindex="0"
			aria-valuenow={progress}
			aria-label="Audio progress"
			onclick={seek}
			class="relative h-2 flex-1 cursor-pointer rounded-full bg-slate-100"
		>
			<div
				class="absolute top-0 left-0 h-2 rounded-full bg-teal-500"
				style="width: {progress}%"
			></div>
			<div
				class="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-teal-600 bg-white shadow"
				style="left: calc({progress}% - 7px)"
			></div>
		</div>
		<span class="shrink-0 text-xs font-semibold tabular-nums text-slate-400">75:00</span>
	</div>

	<!-- 2-col grid -->
	<div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
		<!-- Transcript -->
		<div class="rounded-2xl border border-slate-200 bg-white p-5">
			<h2 class="mb-4 text-sm font-bold text-slate-800">Transkrip Percakapan</h2>
			<div class="flex max-h-[460px] flex-col gap-4 overflow-y-auto pr-1">
				{#each transcriptData as line, i (i)}
					<div class="flex gap-3">
						<div
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold {speakerStyle(
								line.speaker
							)}"
						>
							{line.speaker.slice(-1)}
						</div>
						<div>
							<div class="mb-0.5 text-xs font-semibold text-slate-500">{line.speaker}</div>
							<p class="text-sm leading-relaxed text-slate-700">{line.text}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Summary + action items -->
		<div class="flex flex-col gap-5">
			<div class="rounded-2xl border border-slate-200 bg-white p-5">
				<h2 class="mb-3 text-sm font-bold text-slate-800">Ringkasan Eksekutif</h2>
				<p class="text-sm leading-relaxed text-slate-600">{executiveSummary}</p>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white p-5">
				<h2 class="mb-3 text-sm font-bold text-slate-800">Action Items</h2>
				<div class="flex flex-col gap-2">
					{#each items as item, i (i)}
						<button
							onclick={() => toggleItem(i)}
							class="flex items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition {item.done
								? 'border-emerald-200 bg-emerald-50'
								: 'border-slate-200 bg-white hover:border-slate-300'}"
						>
							<span
								class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 {item.done
									? 'border-emerald-500 bg-emerald-500 text-white'
									: 'border-slate-300'}"
							>
								{#if item.done}
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
										<polyline points="20 6 9 17 4 12" />
									</svg>
								{/if}
							</span>
							<span
								class="text-sm {item.done
									? 'text-emerald-700 line-through'
									: 'text-slate-700'}"
							>
								{item.text}
							</span>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
