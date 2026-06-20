<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { authState } from '$lib/stores/auth.svelte';

	let email = $state('');
	let password = $state('');
	let remember = $state(false);
	let showPass = $state(false);
	let showRbacModal = $state(false);

	function handleLogin(e: Event) {
		e.preventDefault();
		showRbacModal = true;
	}

	function proceedLogin(role: 'Admin' | 'Staff', name: string) {
		authState.login(name, role);
		showRbacModal = false;
		goto('/dashboard');
	}

	const features = [
		{ icon: 'mic', text: '3 mode input: Upload, Live Mic, WebRTC' },
		{ icon: 'file', text: 'Transkrip otomatis dengan STT Whisper' },
		{ icon: 'result', text: 'Ringkasan & Action Items via LLM' }
	];
</script>

<svelte:head>
	<title>Masuk — Auto-Minutes</title>
</svelte:head>

<div class="flex min-h-screen w-full flex-col md:flex-row">
	<!-- Left: Branding (hidden on mobile) -->
	<div
		class="relative hidden flex-1 flex-col justify-center overflow-hidden bg-gradient-to-br from-teal-800 via-teal-600 to-teal-400 p-8 text-white md:flex lg:p-12"
	>
		<div class="relative z-10">
			<div class="mb-12 flex items-center gap-3">
				<div
					class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm"
				>
					<Icon name="mic" size={24} />
				</div>
				<span class="text-[22px] font-extrabold tracking-tight">Auto-Minutes</span>
			</div>

			<h1 class="mb-4 text-3xl font-extrabold leading-tight lg:text-4xl">
				Notulensi Rapat<br />Otomatis dengan AI
			</h1>
			<p class="mb-10 max-w-md text-base leading-relaxed text-white/80">
				Ubah rekaman rapat menjadi transkrip dan ringkasan terstruktur secara instan menggunakan
				Speech-to-Text dan Large Language Model.
			</p>

			<div class="flex flex-col gap-4">
				{#each features as f (f.text)}
					<div class="flex items-center gap-3">
						<div
							class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white/15"
						>
							<Icon name={f.icon} size={18} />
						</div>
						<span class="text-sm font-medium text-white/90">{f.text}</span>
					</div>
				{/each}
			</div>

			<div
				class="mt-12 inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur-sm"
			>
				<div class="h-2 w-2 rounded-full bg-green-400"></div>
				<span class="text-xs font-semibold text-white/85">
					Studi Kasus: PT Traspac Makmur Sejahtera
				</span>
			</div>
		</div>

		<div class="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5"></div>
		<div class="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/[0.04]"></div>
	</div>

	<!-- Right: Form -->
	<div class="flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-10 md:py-12">
		<div class="w-full max-w-[420px]">
			<!-- Mobile logo -->
			<div class="mb-8 flex items-center gap-2.5 md:hidden">
				<div
					class="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-teal-600 to-teal-400"
				>
					<Icon name="mic" size={18} class="text-white" />
				</div>
				<span class="text-lg font-extrabold text-slate-800">Auto-Minutes</span>
			</div>

			<h2 class="mb-1.5 text-2xl font-bold text-slate-800">Selamat Datang</h2>
			<p class="mb-7 text-sm text-slate-500">Masuk ke akun Anda untuk melanjutkan</p>

			<!-- Google button -->
			<button
				onclick={handleLogin}
				class="flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
			>
				<svg width="18" height="18" viewBox="0 0 24 24">
					<path
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
						fill="#4285F4"
					/>
					<path
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						fill="#34A853"
					/>
					<path
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
						fill="#FBBC05"
					/>
					<path
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						fill="#EA4335"
					/>
				</svg>
				Sign in with Google
			</button>

			<!-- Divider -->
			<div class="my-6 flex items-center gap-3">
				<div class="h-px flex-1 bg-slate-200"></div>
				<span class="text-xs font-medium text-slate-500">atau masuk dengan email</span>
				<div class="h-px flex-1 bg-slate-200"></div>
			</div>

			<form onsubmit={handleLogin} class="flex flex-col gap-4">
				<div>
					<label for="email" class="mb-1.5 block text-[13px] font-semibold text-slate-800">
						Email
					</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder="nama@perusahaan.com"
						class="w-full rounded-[10px] border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-600"
					/>
				</div>

				<div>
					<label for="password" class="mb-1.5 block text-[13px] font-semibold text-slate-800">
						Password
					</label>
					<div class="relative">
						<input
							id="password"
							type={showPass ? 'text' : 'password'}
							bind:value={password}
							placeholder="Masukkan password"
							class="w-full rounded-[10px] border border-slate-200 bg-white px-3.5 py-2.5 pr-12 text-sm text-slate-800 outline-none focus:border-teal-600"
						/>
						<button
							type="button"
							onclick={() => (showPass = !showPass)}
							class="absolute top-1/2 right-2.5 -translate-y-1/2 text-xs font-semibold text-slate-500"
						>
							{showPass ? 'Hide' : 'Show'}
						</button>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<label class="flex items-center gap-2">
						<input
							type="checkbox"
							bind:checked={remember}
							class="h-4 w-4 rounded border-slate-300 accent-teal-600"
						/>
						<span class="text-[13px] font-medium text-slate-500">Remember me</span>
					</label>
					<a href="#forgot" onclick={(e) => e.preventDefault()} class="text-[13px] font-semibold text-teal-600">
						Forgot password?
					</a>
				</div>

				<button
					type="submit"
					class="mt-1 w-full rounded-[10px] bg-gradient-to-br from-teal-600 to-teal-400 py-3 text-[15px] font-bold text-white shadow-md shadow-teal-600/30 transition hover:-translate-y-px hover:shadow-lg"
				>
					Sign In
				</button>
			</form>

			<p class="mt-6 text-center text-[13px] text-slate-500">
				Belum punya akun?
				<a href="#contact" onclick={(e) => e.preventDefault()} class="font-semibold text-teal-600">
					Hubungi Admin
				</a>
			</p>
		</div>
	</div>
</div>

<!-- RBAC demo modal: pilih peran untuk simulasi login -->
{#if showRbacModal}
	<div class="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
		<div class="w-full max-w-sm rounded-2xl bg-white p-7 shadow-xl">
			<h3 class="mb-1.5 text-lg font-bold text-slate-800">Simulasi Login</h3>
			<p class="mb-5 text-[13px] text-slate-500">
				Dummy FE ini belum terhubung ke backend asli — pilih peran untuk simulasi masuk.
			</p>
			<div class="flex flex-col gap-2.5">
				<button
					onclick={() => proceedLogin('Admin', 'Abdul Aziz')}
					class="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-teal-600 hover:bg-teal-50"
				>
					<span>
						<span class="block text-sm font-semibold text-slate-800">Abdul Aziz</span>
						<span class="block text-xs text-slate-500">Admin — akses penuh</span>
					</span>
					<span class="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
						Admin
					</span>
				</button>
				<button
					onclick={() => proceedLogin('Staff', 'Abaz')}
					class="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-teal-600 hover:bg-teal-50"
				>
					<span>
						<span class="block text-sm font-semibold text-slate-800">Abaz</span>
						<span class="block text-xs text-slate-500">Staff — akses terbatas</span>
					</span>
					<span class="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">
						Staff
					</span>
				</button>
			</div>
			<button
				onclick={() => (showRbacModal = false)}
				class="mt-5 w-full rounded-[10px] border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
			>
				Batal
			</button>
		</div>
	</div>
{/if}
