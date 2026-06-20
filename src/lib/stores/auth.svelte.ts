import type { CurrentUser } from '$lib/types';

/**
 * Dummy auth state (Svelte 5 runes). Tidak ada backend asli —
 * hanya menyimpan user yang "login" di memori browser selama sesi berjalan.
 */
class AuthState {
	current = $state<CurrentUser | null>(null);

	login(name: string, role: 'Admin' | 'Staff') {
		this.current = { name, role };
	}

	logout() {
		this.current = null;
	}
}

export const authState = new AuthState();
