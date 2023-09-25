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
// import { useRouter } from "next/navigation";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import { SidebarProvider } from "@/app/context/SidebarContext";
import Link from "next/link";

const navigationMenu = [
  { icon: HiChartPie, name: "Dashboard", href: "/" },
  { icon: BiBuoy, name: "Products", href: "/products" },
  { icon: HiViewBoards, name: "Posts", href: "/posts" },
  { icon: BiBuoy, name: "Departemen", href: "/departemen" },
  { icon: BiBuoy, name: "User Prisma", href: "/user_prisma" },
];
const navigationMenu2 = [
  { icon: HiChartPie, name: "My-profile", href: "/my-profile" },
  { icon: BiBuoy, name: "Settings", href: "/settings" },
  { icon: HiViewBoards, name: "Preference", href: "/preference" },
  { icon: HiViewBoards, name: "Login", href: "/login" },
];

const myicon = "HiChartPie";

export default function ActualSidebar(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const realPathname = pathname.replace(/\//, "");

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* color:item.href==pathname?'#038196' */}
          {navigationMenu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <Sidebar.Item
                className="`text-gray-800`"
                style={{
                  background: item.href == pathname ? "#b8ebed" : "none",
                }}
                icon={item.icon}
              >
                {item.name}
              </Sidebar.Item>
            </Link>
          ))}
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>

          {navigationMenu2.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <Sidebar.Item
                className="`text-gray-800`"
                style={{
                  background: item.href == pathname ? "#b8ebed" : "none",
                }}
                icon={item.icon}
              >
                {item.name}
              </Sidebar.Item>
            </Link>
          ))}

          <Sidebar.Item href="#" icon={BiBuoy}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
