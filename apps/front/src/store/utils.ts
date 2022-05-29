import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const persistedWritable = (key: string, startValue: unknown) => {
	const { subscribe, set, update } = writable(startValue);

	return {
		subscribe,
		set,
		update,
		persist: () => {
			const json = localStorage.getItem(key);

			if (json) {
				set(JSON.parse(json));
			}

			subscribe((current) => {
				localStorage.setItem(key, JSON.stringify(current));
			});
		}
	};
};

export type PersistedWritable<T> = Writable<T> & {
	persist(): void;
};
