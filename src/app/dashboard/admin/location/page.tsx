"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapComponent } from "@/components/dashboard/map";
import { Bus } from "lucide-react";

const allBuses = [
  { id: "BUS-01", name: "Campus Circle - AP 39 A 1234" },
  { id: "BUS-02", name: "Downtown Express - AP 39 B 5678" },
  { id: "BUS-03", name: "North Campus - AP 39 C 9012" },
  { id: "BUS-04", name: "West Circle - AP 39 D 3456" },
];

export default function LocationPage() {
  const [selectedBus, setSelectedBus] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <MapComponent />
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Track Bus Location</CardTitle>
            <CardDescription>
              Select a bus to see its live position on the map.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedBus}>
              <SelectTrigger>
                <SelectValue placeholder="Select a bus..." />
              </SelectTrigger>
              <SelectContent>
                {allBuses.map((bus) => (
                  <SelectItem key={bus.id} value={bus.id}>
                    {bus.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedBus ? (
              <div className="mt-6 flex items-start gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Bus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{allBuses.find(b => b.id === selectedBus)?.name}</p>
                  <p className="text-sm text-muted-foreground">Status: <span className="font-medium text-green-600">Active</span></p>
                  <p className="text-sm text-muted-foreground">Next Stop: Library (ETA: 3 mins)</p>
                </div>
              </div>
            ) : (
               <div className="mt-6 text-center text-sm text-muted-foreground py-8">
                <p>No bus selected.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
