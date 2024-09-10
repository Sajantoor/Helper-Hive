// src/lib/stores/profileStore.ts
import { writable } from 'svelte/store';
import type { Profile } from '$lib/Types/Profile';

export const profileStore = writable<Profile | null>(null);