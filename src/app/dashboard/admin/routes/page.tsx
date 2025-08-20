import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Route } from "lucide-react";

export default function RoutesPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Route className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold">Manage Routes</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        This page is under construction. Features to add,
        edit, and manage bus routes will be available here soon.
      </p>
    </div>
  );
}
