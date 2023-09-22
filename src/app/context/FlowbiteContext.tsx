"use client";

import { Flowbite } from "flowbite-react";
import { FC, PropsWithChildren } from "react";
import { flowbiteTheme as theme } from "@/app/theme";

const FlowbiteContext: FC<PropsWithChildren> = function ({ children }) {
  // Initialize dark mode to 'dark'
  // theme.theme = {
  //   ...theme.theme,
  //   darkMode: 'dark',
  // };

  return <Flowbite theme={{ theme }}>{children}</Flowbite>;
};

export default FlowbiteContext;
