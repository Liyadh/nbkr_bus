import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";

export default function DriversPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Users className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold">Manage Drivers</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        This page is under construction. Check back later for features to add,
        edit, and manage driver information and assignments.
      </p>
    </div>
  );
}
