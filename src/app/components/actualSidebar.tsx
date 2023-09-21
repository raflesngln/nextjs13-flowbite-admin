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

import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import { SidebarProvider } from "@/app/context/SidebarContext";
import Link from "next/link";

const navigationMenu = [
  { name: "Dashboard", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Posts", href: "/posts" },
  { name: "Departemen", href: "/departemen" },
  { name: "User Prisma", href: "/user_prisma" },
  { name: "Login", href: "/login" },
];

export default function ActualSidebar(): JSX.Element {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>

          {navigationMenu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <Sidebar.Item icon={HiChartPie}>{item.name}</Sidebar.Item>
            </Link>
          ))}
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            My Profile
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Settings
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Auth
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
