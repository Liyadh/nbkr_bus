"use client";
import { MapComponent } from "@/components/dashboard/map";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { List, Star } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function FacultyDashboard() {
  const { toast } = useToast();
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <MapComponent />
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Are you on a bus?</CardTitle>
            <CardDescription>
              Help us improve tracking by confirming your location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full">Confirm My Location</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm you are on a bus?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will temporarily use your location to improve
                    the accuracy of the bus tracking for all users. Your privacy
                    is important to us.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      toast({
                        title: "Location Confirmed!",
                        description: "Thank you for helping improve our service.",
                      });
                    }}
                  >
                    Confirm & Share
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saved Routes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <List className="h-5 w-5 text-muted-foreground" />
                <span>Route A - Campus Circle</span>
              </div>
              <Button variant="ghost" size="icon">
                <Star className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <List className="h-5 w-5 text-muted-foreground" />
                <span>Route C - To Downtown</span>
              </div>
              <Button variant="ghost" size="icon">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
