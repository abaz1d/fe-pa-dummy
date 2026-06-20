<script lang="ts">
	let { method }: { method: 'Online' | 'Offline' | 'Upload' } = $props();

	const styles: Record<string, string> = {
		Online: 'bg-sky-100 text-sky-700',
		Offline: 'bg-violet-100 text-violet-700',
		Upload: 'bg-slate-100 text-slate-600'
	};
</script>

<span class="rounded-full px-2.5 py-1 text-xs font-semibold {styles[method]}">
	{method}
</span>
