<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';
	import { usersData } from '$lib/data/dummy';
	import type { AppUser, UserRole } from '$lib/types';

	let users = $state<AppUser[]>([...usersData]);

	let showModal = $state(false);
	let editingId = $state<number | null>(null);
	let formName = $state('');
	let formEmail = $state('');
	let formRole = $state<UserRole>('Staff');
	let formPassword = $state('');

	function openAdd() {
		editingId = null;
		formName = '';
		formEmail = '';
		formRole = 'Staff';
		formPassword = '';
		showModal = true;
	}

	function openEdit(u: AppUser) {
		editingId = u.id;
		formName = u.name;
		formEmail = u.email;
		formRole = u.role;
		formPassword = '';
		showModal = true;
	}

	function deleteUser(id: number) {
		users = users.filter((u) => u.id !== id);
	}

	function saveUser() {
		if (!formName || !formEmail) return;
		if (editingId !== null) {
			users = users.map((u) =>
				u.id === editingId ? { ...u, name: formName, email: formEmail, role: formRole } : u
			);
		} else {
			const nextId = Math.max(0, ...users.map((u) => u.id)) + 1;
			users = [...users, { id: nextId, name: formName, email: formEmail, role: formRole }];
		}
		showModal = false;
	}

	function roleBadge(role: UserRole) {
		return role === 'Admin'
			? 'bg-emerald-100 text-emerald-800'
			: 'bg-slate-200 text-slate-700';
	}
</script>

<svelte:head>
	<title>Manajemen Pengguna — Auto-Minutes</title>
</svelte:head>

<div class="px-4 py-6 sm:px-6 sm:py-8">
	<div class="mb-5 flex items-center justify-between">
		<h1 class="text-xl font-bold text-slate-800">Manajemen Pengguna</h1>
		<button
			onclick={openAdd}
			class="flex items-center gap-2 rounded-[10px] bg-gradient-to-br from-teal-600 to-teal-400 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-600/25"
		>
			<Icon name="plus" size={16} />
			<span class="hidden sm:inline">Tambah Pengguna Baru</span>
			<span class="sm:hidden">Tambah</span>
		</button>
	</div>

	<div class="app-table">
		<table class="w-full text-sm">
			<thead>
				<tr>
					<th class="px-5 py-3 text-left font-semibold text-slate-500">Nama</th>
					<th class="px-5 py-3 text-left font-semibold text-slate-500">Email</th>
					<th class="px-5 py-3 text-left font-semibold text-slate-500">Role</th>
					<th class="px-5 py-3 text-right font-semibold text-slate-500">Aksi</th>
				</tr>
			</thead>
			<tbody>
				{#each users as u (u.id)}
					<tr class="border-t border-slate-100 hover:bg-slate-50">
						<td data-label="Nama" class="px-5 py-3.5 font-semibold text-slate-800">{u.name}</td>
						<td data-label="Email" class="px-5 py-3.5 text-slate-500">{u.email}</td>
						<td data-label="Role" class="px-5 py-3.5">
							<span class="rounded-full px-2.5 py-1 text-xs font-bold {roleBadge(u.role)}">
								{u.role}
							</span>
						</td>
						<td data-label="Aksi" class="px-5 py-3.5">
							<div class="flex items-center justify-end gap-2">
								<button
									onclick={() => openEdit(u)}
									class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200"
								>
									Edit
								</button>
								<button
									onclick={() => deleteUser(u.id)}
									title="Hapus"
									class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
								>
									<Icon name="trash" size={15} />
								</button>
							</div>
						</td>
					</tr>
				{/each}
				{#if users.length === 0}
					<tr>
						<td colspan="4" class="px-5 py-8 text-center text-sm text-slate-400">
							Belum ada pengguna.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>

{#if showModal}
	<div class="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
		<div class="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
			<h3 class="mb-5 text-lg font-bold text-slate-800">
				{editingId !== null ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
			</h3>
			<div class="flex flex-col gap-4">
				<div>
					<label for="u-name" class="mb-1.5 block text-[13px] font-semibold text-slate-800">
						Nama Lengkap
					</label>
					<input
						id="u-name"
						type="text"
						bind:value={formName}
						placeholder="Nama lengkap"
						class="w-full rounded-[10px] border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-600"
					/>
				</div>
				<div>
					<label for="u-email" class="mb-1.5 block text-[13px] font-semibold text-slate-800">
						Email
					</label>
					<input
						id="u-email"
						type="email"
						bind:value={formEmail}
						placeholder="nama@traspac.co.id"
						class="w-full rounded-[10px] border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-600"
					/>
				</div>
				<div>
					<label for="u-role" class="mb-1.5 block text-[13px] font-semibold text-slate-800">
						Role
					</label>
					<select
						id="u-role"
						bind:value={formRole}
						class="w-full rounded-[10px] border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-600"
					>
						<option value="Staff">Staff</option>
						<option value="Admin">Admin</option>
					</select>
				</div>
				<div>
					<label for="u-pass" class="mb-1.5 block text-[13px] font-semibold text-slate-800">
						Password
					</label>
					<input
						id="u-pass"
						type="password"
						bind:value={formPassword}
						placeholder={editingId !== null ? 'Kosongkan jika tidak diubah' : 'Buat password'}
						class="w-full rounded-[10px] border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-600"
					/>
				</div>
			</div>
			<div class="mt-6 flex gap-2.5">
				<button
					onclick={() => (showModal = false)}
					class="flex-1 rounded-[10px] border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
				>
					Batal
				</button>
				<button
					onclick={saveUser}
					class="flex-1 rounded-[10px] bg-gradient-to-br from-teal-600 to-teal-400 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-600/25"
				>
					Simpan
				</button>
			</div>
		</div>
	</div>
{/if}
