<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/ui/Icon.svelte';
	import StatusBadge from '$lib/components/ui/StatusBadge.svelte';
	import MethodBadge from '$lib/components/ui/MethodBadge.svelte';
	import { meetingsData } from '$lib/data/dummy';
	import type { Meeting } from '$lib/types';

	let meetings = $state<Meeting[]>([...meetingsData]);

	const stats = [
		{
			label: 'Total Rapat',
			value: '47',
			sub: '+5 minggu ini',
			color: 'text-teal-600',
			bg: 'bg-teal-100',
			icon: 'file'
		},
		{
			label: 'Dalam Proses',
			value: '1',
			sub: 'Estimasi 3 menit',
			color: 'text-amber-600',
			bg: 'bg-amber-100',
			icon: 'clock'
		},
		{
			label: 'Jam Dihemat',
			value: '23.5',
			sub: 'vs notulensi manual',
			color: 'text-indigo-600',
			bg: 'bg-indigo-100',
			icon: 'result'
		}
	];

	function deleteMeeting(id: number) {
		meetings = meetings.filter((m) => m.id !== id);
	}

	function viewResult(m: Meeting) {
		if (m.status !== 'Selesai') return;
		goto('/result');
	}
</script>

<svelte:head>
	<title>Dashboard — Auto-Minutes</title>
</svelte:head>

<div class="px-4 py-6 sm:px-6 sm:py-8">
	<!-- Stat cards -->
	<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each stats as s (s.label)}
			<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
				<div class="mb-3 flex items-center justify-between">
					<span class="text-sm font-semibold text-slate-500">{s.label}</span>
					<div class="flex h-9 w-9 items-center justify-center rounded-[10px] {s.bg} {s.color}">
						<Icon name={s.icon} size={18} />
					</div>
				</div>
				<div class="text-3xl font-extrabold text-slate-800">{s.value}</div>
				<div class="mt-1 text-xs font-medium text-slate-400">{s.sub}</div>
			</div>
		{/each}
	</div>

	<!-- Header + CTA -->
	<div class="mb-4 flex items-center justify-between">
		<h1 class="text-xl font-bold text-slate-800">Riwayat Rapat</h1>
		<button
			onclick={() => goto('/recording')}
			class="flex items-center gap-2 rounded-[10px] bg-gradient-to-br from-teal-600 to-teal-400 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-600/25"
		>
			<Icon name="plus" size={16} />
			<span class="hidden sm:inline">Mulai Rapat Baru</span>
			<span class="sm:hidden">Rapat Baru</span>
		</button>
	</div>

	<!-- Table -->
	<div class="app-table">
		<table class="w-full text-sm">
			<thead>
				<tr>
					<th class="px-5 py-3 text-left font-semibold text-slate-500">Judul Rapat</th>
					<th class="px-5 py-3 text-left font-semibold text-slate-500">Tanggal</th>
					<th class="px-5 py-3 text-left font-semibold text-slate-500">Metode</th>
					<th class="px-5 py-3 text-left font-semibold text-slate-500">Status</th>
					<th class="px-5 py-3 text-right font-semibold text-slate-500">Aksi</th>
				</tr>
			</thead>
			<tbody>
				{#each meetings as m (m.id)}
					<tr class="border-t border-slate-100 hover:bg-slate-50">
						<td data-label="Judul Rapat" class="px-5 py-3.5 font-semibold text-slate-800">
							{m.title}
						</td>
						<td data-label="Tanggal" class="px-5 py-3.5 text-slate-500">{m.date}</td>
						<td data-label="Metode" class="px-5 py-3.5"><MethodBadge method={m.method} /></td>
						<td data-label="Status" class="px-5 py-3.5"><StatusBadge status={m.status} /></td>
						<td data-label="Aksi" class="px-5 py-3.5">
							<div class="flex items-center justify-end gap-2">
								<button
									disabled={m.status !== 'Selesai'}
									onclick={() => viewResult(m)}
									class="rounded-lg px-3 py-1.5 text-xs font-semibold {m.status === 'Selesai'
										? 'bg-teal-100 text-teal-700 hover:bg-teal-200'
										: 'cursor-not-allowed bg-slate-100 text-slate-400'}"
								>
									Lihat Hasil
								</button>
								<button
									onclick={() => deleteMeeting(m.id)}
									title="Hapus"
									class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
								>
									<Icon name="trash" size={15} />
								</button>
							</div>
						</td>
					</tr>
				{/each}
				{#if meetings.length === 0}
					<tr>
						<td colspan="5" class="px-5 py-8 text-center text-sm text-slate-400">
							Belum ada riwayat rapat.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>
