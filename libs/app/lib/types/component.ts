export type Alignment = "bottom" | "top" | "left" | "right";

export type Size = "x-small" | "small" | "medium" | "large" | "x-large";

export type ButtonType =
  | "primary"
  | "accent"
  | "secondary"
  | "tertiary"
  | "ghost";

export type SelectItemType = { label: string; value: string };

export type ListItemType = { icon: IconName; label: string };

export const iconNames = {
  archive: "",
  "arrow-left": "",
  bell: "",
  browsers: "",
  buildings: "",
  camera: "",
  chart: "",
  check: "",
  chevron: "",
  close: "",
  "cloud-arrow-up": "",
  copy: "",
  "credit-card": "",
  crosshair: "",
  "device-mobile": "",
  "dots-six": "",
  "dots-three": "",
  download: "",
  dropper: "",
  envelope: "",
  eye: "",
  "eye-off": "",
  "film-strip": "",
  "floppy-disk": "",
  "folder-open": "",
  "folder-plus": "",
  gear: "",
  globe: "",
  image: "",
  info: "",
  key: "",
  lifebuoy: "",
  link: "",
  "list-plus": "",
  magnifier: "",
  megaphone: "",
  menu: "",
  "paint-roller": "",
  "paper-plane": "",
  "pencil-line": "",
  plus: "",
  queue: "",
  rows: "",
  scissors: "",
  share: "",
  "share-network": "",
  "sign-in": "",
  "sign-out": "",
  "squares-four": "",
  star: "",
  trash: "",
  upload: "",
  user: "",
  "user-plus": "",
  users: "",
  "users-three": "",
  "video-camera": "",
  warning: "",
};

export type IconName = keyof typeof iconNames;

export type MenuOption = {
  text: string;
  icon: IconName;
  action?: () => void;
};

export type AppDrawerItem = {
  text: string;
  icon?: IconName;
  to?: string;
  locked?: boolean;
  click?: () => void;
  subItems?: AppDrawerItem[];
};
