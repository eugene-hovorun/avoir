import { writable } from "svelte/store";

export const fetchURL = <T>(url: string) => {
  const isFetching = writable(false);
  const fetchError = writable(false as unknown | boolean);
  const data = writable([] as T[]);

  async function get() {
    isFetching.set(true);
    fetchError.set(false);

    try {
      const response = await fetch(url);
      data.set(await response.json());
    } catch (e) {
      fetchError.set((e as Error).message);
    }
    isFetching.set(false);
  }

  get();

  return { data, isFetching, fetchError, get };
};
