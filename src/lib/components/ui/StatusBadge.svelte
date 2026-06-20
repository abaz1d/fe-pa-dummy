<script lang="ts">
	let { status }: { status: 'Selesai' | 'Diproses' } = $props();

	const styles: Record<string, string> = {
		Selesai: 'bg-emerald-100 text-emerald-700',
		Diproses: 'bg-amber-100 text-amber-700'
	};
</script>

<span class="rounded-full px-2.5 py-1 text-xs font-semibold {styles[status]}">
	{status}
</span>
