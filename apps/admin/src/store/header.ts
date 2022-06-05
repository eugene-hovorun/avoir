import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export interface HeaderState {
  pageTitle: string;
}

export const headerState: Writable<HeaderState> = writable({
  pageTitle: "",
});
