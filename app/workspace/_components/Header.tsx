"use client";
import { ModeToggle } from "@/app/_components/ModleToogle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

function Header({ hideSidebar = false }) {
  return (
    <div className="flex items-center justify-between p-4 shadow-md dark:shadow-[#992edb] dark:shadow-sm">
      {!hideSidebar && <SidebarTrigger />}
      <div className="flex items-center gap-5">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
