// "use client"
import { FC, PropsWithChildren } from "react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import useDarkMode from "@/app/components/darkmodeConfig"; // Import the custom hook

const UserLayout: FC<PropsWithChildren> = function ({ children }) {
  return <main>{children}</main>;
};

export default UserLayout;
