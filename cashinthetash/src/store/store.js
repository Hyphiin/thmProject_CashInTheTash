import { writable } from 'svelte/store';

export const showDeletionConfirmation = writable(false);
export const showUpdateConfirmation = writable(false);
export const showAddConfirmation = writable(false);
export const loggingIn = writable(false);