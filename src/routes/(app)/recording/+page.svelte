<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/ui/Icon.svelte';
	import AudioVisualizer from '$lib/components/ui/AudioVisualizer.svelte';

	type InputTab = 'UPLOAD' | 'MIC' | 'WEBRTC';

	let activeTab = $state<InputTab>('UPLOAD');
	let isRecording = $state(false);
	let elapsed = $state(0);
	let fileName = $state<string | null>(null);
	let processing = $state(false);
	let timer: ReturnType<typeof setInterval> | null = null;

	const tabs: { id: InputTab; label: string; icon: string }[] = [
		{ id: 'UPLOAD', label: 'Upload File', icon: 'upload' },
		{ id: 'MIC', label: 'Live Record Mic', icon: 'mic' },
		{ id: 'WEBRTC', label: 'Meeting Online (WebRTC)', icon: 'globe' }
	];

	function selectTab(t: InputTab) {
		if (isRecording) return;
		activeTab = t;
	}

	function formatTime(s: number) {
		const h = Math.floor(s / 3600)
			.toString()
			.padStart(2, '0');
		const m = Math.floor((s % 3600) / 60)
			.toString()
			.padStart(2, '0');
		const sec = Math.floor(s % 60)
			.toString()
			.padStart(2, '0');
		return `${h}:${m}:${sec}`;
	}

	function toggleRecording() {
		if (isRecording) {
			isRecording = false;
			if (timer) clearInterval(timer);
			timer = null;
			startProcessing();
		} else {
			isRecording = true;
			elapsed = 0;
			timer = setInterval(() => (elapsed += 1), 1000);
		}
	}

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			fileName = input.files[0].name;
		}
	}

	function startProcessing() {
		processing = true;
		setTimeout(() => {
			processing = false;
			goto('/result');
		}, 1800);
	}
</script>

<svelte:head>
	<title>Recording Room — Auto-Minutes</title>
</svelte:head>

<div class="px-4 py-6 sm:px-6 sm:py-8">
	<h1 class="mb-1 text-xl font-bold text-slate-800">Recording Room</h1>
	<p class="mb-6 text-sm text-slate-500">Pilih sumber audio untuk diproses menjadi notulensi.</p>

	<!-- Input tabs -->
	<div class="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
		{#each tabs as t (t.id)}
			<button
				disabled={isRecording}
				onclick={() => selectTab(t.id)}
				class="flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition {activeTab ===
				t.id
					? 'border-teal-600 bg-teal-50'
					: 'border-slate-200 bg-white hover:border-slate-300'} {isRecording
					? 'cursor-not-allowed opacity-50'
					: ''}"
			>
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl {activeTab ===
					t.id
						? 'bg-teal-600 text-white'
						: 'bg-slate-100 text-slate-500'}"
				>
					<Icon name={t.icon} size={18} />
				</div>
				<span
					class="text-sm font-semibold {activeTab === t.id ? 'text-teal-700' : 'text-slate-700'}"
				>
					{t.label}
				</span>
			</button>
		{/each}
	</div>

	<!-- Main card -->
	<div class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
		{#if activeTab === 'UPLOAD'}
			<div class="flex flex-col items-center">
				<label
					for="audio-upload"
					class="flex w-full max-w-xl cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-teal-500 hover:bg-teal-50/50"
				>
					<div
						class="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600"
					>
						<Icon name="upload" size={24} />
					</div>
					{#if fileName}
						<span class="text-sm font-semibold text-slate-800">{fileName}</span>
						<span class="text-xs text-slate-400">Klik untuk mengganti file</span>
					{:else}
						<span class="text-sm font-semibold text-slate-800">
							Klik atau drag file audio ke sini
						</span>
						<span class="text-xs text-slate-400">Format: MP3, WAV, M4A (maks. 200MB)</span>
					{/if}
				</label>
				<input
					id="audio-upload"
					type="file"
					accept="audio/*"
					class="hidden"
					onchange={handleFileSelect}
				/>

				<button
					disabled={!fileName || processing}
					onclick={startProcessing}
					class="mt-6 w-full max-w-xl rounded-[10px] bg-gradient-to-br from-teal-600 to-teal-400 py-3 text-sm font-bold text-white shadow-md shadow-teal-600/25 disabled:cursor-not-allowed disabled:opacity-40"
				>
					{processing ? 'Memproses Audio...' : 'Upload & Proses Audio'}
				</button>
			</div>
		{:else}
			<div class="flex flex-col items-center">
				{#if activeTab === 'WEBRTC'}
					<div
						class="mb-6 flex w-full max-w-xl items-start gap-3 rounded-xl border border-sky-200 bg-sky-50 p-4 text-left"
					>
						<Icon name="globe" size={18} class="mt-0.5 shrink-0 text-sky-600" />
						<p class="text-xs leading-relaxed text-sky-800">
							Mode ini menangkap audio dari tab meeting online (Zoom/Google Meet/Teams) yang
							sedang dibagikan via WebRTC. Pastikan tab meeting sudah aktif sebelum mulai rekam.
						</p>
					</div>
				{/if}

				<span
					class="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold {isRecording
						? 'bg-red-100 text-red-700'
						: 'bg-slate-100 text-slate-500'}"
				>
					<span
						class="h-2 w-2 rounded-full {isRecording
							? 'animate-pulse-rec bg-red-600'
							: 'bg-slate-400'}"
					></span>
					{isRecording ? 'RECORDING' : 'STANDBY'}
				</span>

				<AudioVisualizer active={isRecording} />

				<div class="mt-6 mb-8 text-4xl font-bold tracking-widest text-slate-800 tabular-nums">
					{formatTime(elapsed)}
				</div>

				<button
					onclick={toggleRecording}
					disabled={processing}
					class="flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition disabled:cursor-not-allowed disabled:opacity-40 {isRecording
						? 'bg-red-600 shadow-red-600/30 hover:bg-red-700'
						: 'bg-gradient-to-br from-teal-600 to-teal-400 shadow-teal-600/30 hover:scale-105'}"
				>
					<Icon name={isRecording ? 'stop' : 'mic'} size={24} class="text-white" />
				</button>
				<span class="mt-3 text-xs font-medium text-slate-400">
					{processing ? 'Memproses audio...' : isRecording ? 'Klik untuk berhenti' : 'Klik untuk mulai rekam'}
				</span>
			</div>
		{/if}
	</div>

	<!-- Info card -->
	<div class="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
		<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-teal-100 text-teal-600">
			<Icon name="file" size={16} />
		</div>
		<p class="text-xs leading-relaxed text-slate-500">
			Audio akan diproses melalui pipeline <strong class="text-slate-700">Speech-to-Text (Whisper)</strong>
			untuk menghasilkan transkrip, kemudian diringkas oleh
			<strong class="text-slate-700">Large Language Model</strong> menjadi ringkasan eksekutif dan
			action items secara otomatis.
		</p>
	</div>
</div>
