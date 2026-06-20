export type MeetingStatus = 'Selesai' | 'Diproses';
export type MeetingMethod = 'Online' | 'Offline' | 'Upload';
export type UserRole = 'Admin' | 'Staff';

export interface Meeting {
	id: number;
	title: string;
	date: string;
	method: MeetingMethod;
	status: MeetingStatus;
}

export interface TranscriptLine {
	speaker: string;
	text: string;
}

export interface ActionItem {
	text: string;
	done: boolean;
}

export interface AppUser {
	id: number;
	name: string;
	email: string;
	role: UserRole;
}

export interface CurrentUser {
	name: string;
	role: UserRole;
}
