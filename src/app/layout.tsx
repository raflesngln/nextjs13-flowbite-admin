import { FC, PropsWithChildren } from "react";
import FlowbiteContext from "./context/FlowbiteContext";
import "./globals.css";


import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import { SidebarProvider } from "@/app/context/SidebarContext";
import ActualSidebar from "@/app/components/actualSidebar";


const RootLayout: FC<PropsWithChildren> = function ({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <FlowbiteContext>{children}</FlowbiteContext> */}
        <FlowbiteContext>
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
      </body>
    </html>
  );
};

export default RootLayout;
