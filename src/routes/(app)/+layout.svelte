<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import TopNav from '$lib/components/layout/TopNav.svelte';
	import { authState } from '$lib/stores/auth.svelte';

	let { children } = $props();

	// Dummy FE: tidak ada session/cookie asli, jadi cukup cek state di memori.
	// Jika user me-refresh halaman langsung di /dashboard dst tanpa login, set dummy user
	// supaya halaman tetap bisa di-demo-kan tanpa harus login ulang.
	onMount(() => {
		if (!authState.current) {
			authState.login('Abdul Aziz', 'Admin');
		}
	});
</script>

<div class="min-h-screen bg-slate-100">
	<TopNav />
	<main class="mx-auto max-w-6xl">
		{@render children()}
	</main>
</div>
