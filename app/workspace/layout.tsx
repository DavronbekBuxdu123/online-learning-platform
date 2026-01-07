import React from "react";
import WorkSpaceProvider from "./provider";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";

function WorkSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkSpaceProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Header />
          {children}
          <Toaster />
        </div>
      </SidebarProvider>
    </WorkSpaceProvider>
  );
}

export default WorkSpaceLayout;
