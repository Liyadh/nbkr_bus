"use client";

import {
  Bus,
  GraduationCap,
  Users,
  Monitor,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const roles = [
  { name: "Student", icon: GraduationCap, path: "student" },
  { name: "Faculty", icon: Monitor, path: "faculty" },
  { name: "Administration", icon: Users, path: "admin" },
  {
    name: "Driver",
    icon: () => (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-2 h-8 w-8 text-primary"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
        <path d="M15 8l-3 3-3-3" />
      </svg>
    ),
    path: "driver",
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();

  const handleRoleSelection = (path: string) => {
    // In a real app, you would navigate to a specific login page
    // For this demo, we navigate directly to the dashboard
    router.push(`/dashboard/${path}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bus className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select your role to continue
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {roles.map((role) => (
            <Card
              key={role.name}
              className="cursor-pointer transition-all hover:border-primary/50"
              onClick={() => handleRoleSelection(role.path)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <role.icon />
                <span className="font-medium text-foreground">{role.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Welcome
          </button>
        </div>
      </div>
    </main>
  );
}
