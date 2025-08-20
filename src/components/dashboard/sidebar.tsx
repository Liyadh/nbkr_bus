"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BusIcon,
  LayoutDashboard,
  MapPin,
  Users,
  LogOut,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = {
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/routes", label: "Routes", icon: MapPin },
    { href: "/dashboard/admin/drivers", label: "Drivers", icon: Users },
  ],
  driver: [{ href: "/dashboard/driver", label: "My Route", icon: MapPin }],
  student: [{ href: "/dashboard/student", label: "Live Map", icon: MapPin }],
  faculty: [{ href: "/dashboard/faculty", label: "Live Map", icon: MapPin }],
};

type Role = keyof typeof navItems;

export function DashboardSidebar() {
  const pathname = usePathname();
  const role = (pathname.split("/")[2] || "student") as Role;

  const getRoleNavItems = () => {
    if (role && role in navItems) {
      return navItems[role];
    }
    return navItems.student; // Default to student
  };

  const currentNavItems = getRoleNavItems();

  return (
    <Sidebar className="border-r">
      <SidebarHeader>
        <Link href={`/dashboard/${role}`} className="flex items-center gap-2.5">
          <div className="bg-primary/20 p-2 rounded-lg">
            <BusIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">NBKR Tracker</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {currentNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="w-full"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-4">
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="w-full">
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild variant="outline" className="w-full">
              <Link href="/">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="flex items-center gap-3 rounded-lg bg-primary/10 p-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage
              src="https://placehold.co/40x40.png"
              alt="User Avatar"
            />
            <AvatarFallback>{role.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Demo User</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
