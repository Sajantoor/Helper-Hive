// src/lib/stores/profileStore.ts
import { writable } from 'svelte/store';
import type { ProfileResponse } from '$common/types/ProfileResponse';

export const profileStore = writable<ProfileResponse | null>(null);