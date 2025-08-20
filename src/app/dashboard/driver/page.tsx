"use client";

import { useState } from "react";
import { MapComponent } from "@/components/dashboard/map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Radio, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function DriverDashboard() {
  const [isSharing, setIsSharing] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <MapComponent />
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Route: Campus Circle</CardTitle>
            <CardDescription>
              Your current assignment. Please activate location sharing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <Radio
                className={`h-6 w-6 transition-colors ${
                  isSharing ? "text-green-500" : "text-muted-foreground"
                }`}
              />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Location Sharing
                </p>
                <p
                  className={`text-sm transition-colors ${
                    isSharing ? "text-green-600" : "text-muted-foreground"
                  }`}
                >
                  {isSharing ? "Active" : "Inactive"}
                </p>
              </div>
              <Switch
                checked={isSharing}
                onCheckedChange={setIsSharing}
                aria-label="Toggle location sharing"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Route Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Next Stop: Library</p>
                <p className="text-sm text-muted-foreground">ETA: 3 mins</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Following Stop: Engineering Block</p>
                <p className="text-sm text-muted-foreground">ETA: 7 mins</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button variant="destructive" className="w-full">
          <AlertTriangle className="mr-2 h-4 w-4" /> Emergency Alert
        </Button>
      </div>
    </div>
  );
}
