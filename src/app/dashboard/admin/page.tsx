"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Eye, ShieldCheck, UserCog } from "lucide-react";

const adminRoles = [
  {
    name: "View-Only Admin (A)",
    description: "Access to view all data without modification rights.",
    icon: Eye,
    path: "/dashboard/admin/dashboard", // For now, points to the main dashboard
  },
  {
    name: "Managing Admin (B)",
    description: "Full access to manage drivers, buses, and system settings.",
    icon: UserCog,
    path: "/dashboard/admin/dashboard",
  },
  {
    name: "Managing Admin (C)",
    description: "Full access to manage drivers, buses, and system settings.",
    icon: ShieldCheck,
    path: "/dashboard/admin/dashboard",
  },
];

export default function AdminRoleSelectionPage() {
  const router = useRouter();

  const handleRoleSelection = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Select Your Admin Role
        </h1>
        <p className="mt-2 text-muted-foreground">
          Choose your designated administration profile to proceed.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {adminRoles.map((role) => (
            <Card
              key={role.name}
              className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg"
              onClick={() => handleRoleSelection(role.path)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <role.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground">{role.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{role.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}