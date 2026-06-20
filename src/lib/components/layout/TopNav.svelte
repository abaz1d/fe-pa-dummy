<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { authState } from '$lib/stores/auth.svelte';

	const navItems = $derived([
		{ href: '/dashboard', label: 'Dashboard', icon: 'home' },
		{ href: '/recording', label: 'Recording Room', icon: 'mic' },
		{ href: '/result', label: 'Hasil Notulensi', icon: 'result' },
		...(authState.current?.role === 'Admin'
			? [{ href: '/users', label: 'Manajemen Pengguna', icon: 'users' }]
			: [])
	]);

	function initials(name: string) {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.slice(0, 2)
			.toUpperCase();
	}

	function handleLogout() {
		authState.logout();
		goto('/login');
	}
</script>

<header class="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
	<div class="mx-auto flex h-14 max-w-6xl items-center overflow-x-auto px-4 sm:px-6">
		<!-- Logo -->
		<a href="/dashboard" class="mr-6 flex shrink-0 items-center gap-2.5 sm:mr-10">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-400 text-white"
			>
				<Icon name="mic" size={18} />
			</div>
			<span class="hidden text-[17px] font-extrabold tracking-tight text-slate-800 sm:inline">
				Auto-Minutes
			</span>
		</a>

		<!-- Nav tabs -->
		<nav class="flex h-full shrink-0 gap-1">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class="flex items-center gap-1.5 border-b-2 px-3 text-[13px] font-semibold whitespace-nowrap transition-colors sm:px-4 {page.url
						.pathname === item.href
						? 'border-teal-600 text-teal-600'
						: 'border-transparent text-slate-500 hover:text-slate-700'}"
				>
					<Icon name={item.icon} size={16} />
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Right side -->
		<div class="ml-auto flex shrink-0 items-center gap-3 pl-3">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-[13px] font-bold text-white"
			>
				{authState.current ? initials(authState.current.name) : 'U'}
			</div>
			<span class="hidden text-[13px] font-semibold whitespace-nowrap text-slate-800 sm:inline">
				{authState.current?.name ?? 'User'}
				<span
					class="ml-1 rounded-full px-2 py-0.5 text-[11px] font-bold {authState.current?.role ===
					'Admin'
						? 'bg-emerald-100 text-emerald-800'
						: 'bg-slate-200 text-slate-700'}"
				>
					{authState.current?.role ?? 'Staff'}
				</span>
			</span>
			<button
				onclick={handleLogout}
				title="Keluar"
				class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
			>
				<Icon name="log-out" size={17} />
			</button>
		</div>
	</div>
</header>
