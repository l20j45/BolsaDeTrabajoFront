import type { Estudiante } from "../interfaces";

import { writable } from "svelte/store";
export const estudiante = writable<Estudiante | null>(null);
export const loading = writable(true);
export const error = writable<string | null>(null);
export const submitting = writable<boolean>(false);
export const submitSuccess = writable<boolean>(false);
export const submitError = writable<string | null>(null);

