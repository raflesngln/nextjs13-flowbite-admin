"use client";

import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Checkbox,
  Dropdown,
  Footer,
  Label,
  ListGroup,
  Modal,
  Navbar,
  Pagination,
  Progress,
  Rating,
  Sidebar as FlowbiteSidebar,
  Spinner,
  Table,
  Tabs,
  TextInput,
  Timeline,
  Toast,
  Tooltip,
} from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { BiBuoy } from "react-icons/bi";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import {
  HiAdjustments,
  HiArrowNarrowRight,
  HiArrowSmRight,
  HiChartPie,
  HiCheck,
  HiClipboardList,
  HiCloudDownload,
  HiDatabase,
  HiExclamation,
  HiEye,
  HiHome,
  HiInbox,
  HiOutlineAdjustments,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiUserCircle,
  HiViewBoards,
  HiX,
} from "react-icons/hi";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { SidebarProvider } from "./context/SidebarContext";
import Link from "next/link";


import DashboardPage from '@/app/components/dashboard'
const navigationMenu = [
  { name: "Dashboard", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Posts", href: "/posts" },
  { name: "Departemen", href: "/departemen" },
  { name: "User Prisma", href: "/user_prisma" },
  { name: "Login", href: "/login" },
];

export default function Index(): JSX.Element {
  return (
    <main>
          <DashboardPage />
      
    </main>
  );
}

// export default function Index(): JSX.Element {
//   return (
//     <SidebarProvider>
//       <Header />
//       <div className="flex dark:bg-gray-900">
//         <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
//           {/* <DashboardPage /> */}
//         </main>
//         <div className="order-1">
//           <ActualSidebar />
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }



