import type { AppDrawerItem } from "$lib/app";

const drawerItems: AppDrawerItem[] = [
  {
    subItems: [
      {
        icon: "browsers",
        text: "Category",
        to: "/category",
      },
      {
        icon: "archive",
        text: "Product",
        to: "/product",
      },
    ],
    text: "Entities",
  },
];

export default drawerItems;
