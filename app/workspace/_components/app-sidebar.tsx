"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCircle2Icon,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "./AddNewCourseDialog";
const items = [
  {
    title: "Yaratgan kurslarim",
    url: "/workspace",
    icon: LayoutDashboard,
  },
  {
    title: "O'rganayotgan kurslarim",
    url: "/workspace/my-learning",
    icon: Book,
  },
  {
    title: "Kurs yaratish haqida",
    url: "/#",
    icon: PencilRulerIcon,
  },
  {
    title: "Obuna ta'riflari",
    url: "/workspace/billing",
    icon: WalletCards,
  },
  {
    title: "Profil",
    url: "/workspace/profile",
    icon: UserCircle2Icon,
  },
];
export function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="mt-5">
          <Link href="/">
            <div className="flex items-center gap-2 text-lg font-semibold  p-2 animate-pulse">
              <div className="flex items-center justify-center px-5 py-1 rounded-lg bg-linear-to-br from-[#7F00FF] via-[#E100FF] to-[#FF69B4] shadow-lg shadow-white/15">
                <span className="text-xl mr-3">📚</span>
                <span className="text-white font-medium tracking-wide text-lg">
                  DavaCourse
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-10">
          <AddNewCourseDialog>
            <Button className="w-full  bg-linear-to-r from-[#7C5CFF] to-[#FF4FD8] cursor-pointer dark:text-white">
              Yangi kurs yaratish
            </Button>
          </AddNewCourseDialog>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="p-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton className="hover:bg-purple-500" asChild>
                    <Link
                      href={item.url}
                      className={`${
                        path === item.url ? "bg-purple-100 text-purple-500" : ""
                      }  text-[15px] `}
                    >
                      <item.icon className="h-7 w-7" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
