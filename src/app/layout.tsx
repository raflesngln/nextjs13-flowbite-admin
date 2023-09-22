// "use client"
import { FC, PropsWithChildren } from "react";
import FlowbiteContext from "./context/FlowbiteContext";
import "./globals.css";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import useDarkMode from '@/app/components/darkmodeConfig'; // Import the custom hook


import ProvidersReactQuery from "@/lib/provider";
import Header from "@/app/components/header";
import { SidebarProvider } from "@/app/context/SidebarContext";
import ActualSidebar from "@/app/components/actualSidebar";

const RootLayout: FC<PropsWithChildren> = function ({ children }) {

  
  return (
    <html lang="en">
      <body>
        {/* <FlowbiteContext>{children}</FlowbiteContext> */}
        <ProvidersReactQuery>

        <FlowbiteContext >
          {/* <DarkThemeToggle dark={darkMode ? 'dark' : ''} onClick={toggleDarkMode} /> */}
          <SidebarProvider>
            <Header />
            <div className="flex dark:bg-gray-900">
              <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
                {children}
              </main>
              <div className="order-1">
                <ActualSidebar />
              </div>
            </div>
          </SidebarProvider>
        </FlowbiteContext>
        </ProvidersReactQuery>
      </body>
    </html>
  );
};

export default RootLayout;
