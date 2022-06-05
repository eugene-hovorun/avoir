import { readable } from "svelte/store";
import type { Breakpoint } from "../types";

export const breakpoint: Record<Breakpoint, string> = {
  landscape: "(orientation: landscape) and (max-height: 499px)",
  lg: "(max-width: 1904px) and (min-width: 1264px)",
  md: "(max-width: 1264px) and (min-width: 960px)",
  sm: "(max-width: 960px) and (min-width: 700px)",
  xl: "(min-width: 1904px)",
  xs: "(max-width: 700px)",

  // todo(eugene): probably implement conditional breakpoints
  //
  // smAndDown: boolean
  // smAndUp: boolean
  // mdAndDown: boolean
  // mdAndUp: boolean
  // lgAndDown: boolean
  // lgAndUp: boolean
};

export const useMediaQuery = (mediaQuery: string) => {
  return readable(true, (set) => {
    const media: MediaQueryList = window.matchMedia(mediaQuery);

    set(media.matches);

    const handler = (e: MediaQueryListEvent) => set(e.matches);

    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  });
};
