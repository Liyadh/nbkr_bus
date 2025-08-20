"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const getTitle = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2) return "Dashboard";
  const role = segments[1];
  const page = segments[2];

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (!page || page === role) {
    return `${capitalize(role)} Dashboard`;
  }
  return capitalize(page);
};

export function DashboardHeader() {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="sm:hidden" />
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
    </header>
  );
}
