import type { Meeting, TranscriptLine, ActionItem, AppUser } from '$lib/types';

export const meetingsData: Meeting[] = [
	{ id: 1, title: 'Sprint Planning Q1 2026', date: '2026-03-10', method: 'Online', status: 'Selesai' },
	{ id: 2, title: 'Kick-off Project Alpha', date: '2026-03-08', method: 'Offline', status: 'Selesai' },
	{ id: 3, title: 'Weekly Standup #12', date: '2026-03-07', method: 'Upload', status: 'Selesai' },
	{ id: 4, title: 'Client Review - PT Traspac', date: '2026-03-12', method: 'Online', status: 'Diproses' },
	{ id: 5, title: 'Retrospective Februari', date: '2026-03-05', method: 'Offline', status: 'Selesai' }
];

export const transcriptData: TranscriptLine[] = [
	{
		speaker: 'Speaker A',
		text: 'Baik, kita mulai rapat sprint planning untuk kuartal pertama. Fokus utama kita adalah penyelesaian modul Auto-Minutes dan integrasi dengan API STT.'
	},
	{
		speaker: 'Speaker B',
		text: 'Saya sudah menyiapkan backlog item-nya. Ada 12 task yang perlu kita breakdown. Prioritas tertinggi ada di pipeline audio processing dan WebRTC capture.'
	},
	{
		speaker: 'Speaker A',
		text: 'Bagus. Untuk timeline, kita target MVP di akhir bulan ini. Apakah tim backend sudah siap dengan endpoint untuk menerima payload audio?'
	},
	{
		speaker: 'Speaker B',
		text: 'Sudah, endpoint upload dan WebSocket untuk streaming sudah di-deploy ke staging. Tinggal integrasi dengan task queue di sisi Go service.'
	},
	{
		speaker: 'Speaker A',
		text: 'Oke, kalau begitu kita assign task integrasi queue ke Fajar, dan frontend recording module ke Dina. Deadline review pertama tanggal 20 Maret.'
	},
	{
		speaker: 'Speaker B',
		text: 'Noted. Saya juga usulkan untuk menambahkan unit test di pipeline STT sebelum masuk ke production. Kita perlu pastikan error handling-nya solid.'
	},
	{
		speaker: 'Speaker A',
		text: 'Setuju. Tambahkan itu ke sprint backlog. Ada pertanyaan lain? Kalau tidak, kita tutup rapat ini.'
	}
];

export const actionItemsData: ActionItem[] = [
	{ text: 'Fajar: Integrasi task queue Go service — deadline 20 Maret', done: true },
	{ text: 'Dina: Selesaikan frontend recording module (3 input modes)', done: false },
	{ text: 'Tim Backend: Deploy endpoint audio ke production', done: false },
	{ text: 'QA: Tambahkan unit test pipeline STT & error handling', done: false },
	{ text: 'PM: Review progress MVP akhir bulan Maret', done: false }
];

export const usersData: AppUser[] = [
	{ id: 1, name: 'Abdul Aziz', email: 'abaz@traspac.co.id', role: 'Admin' },
	{ id: 2, name: 'Abaz', email: 'abaz@traspac.co.id', role: 'Staff' }
];

export const executiveSummary =
	'Rapat sprint planning membahas penyelesaian modul Auto-Minutes dan integrasi API STT. Terdapat 12 backlog item yang perlu diprioritaskan, dengan fokus utama pada pipeline audio processing dan WebRTC capture. Tim backend telah menyiapkan endpoint upload dan WebSocket di staging. Target MVP ditetapkan akhir bulan Maret. Disepakati penambahan unit test pada pipeline STT sebelum production.';
