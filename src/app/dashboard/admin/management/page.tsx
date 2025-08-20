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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const allBuses = [
  { id: "BUS-01", busNo: "AP 39 A 1234" },
  { id: "BUS-02", busNo: "AP 39 B 5678" },
  { id: "BUS-03", busNo: "AP 39 C 9012" },
  { id: "BUS-04", busNo: "AP 39 D 3456" },
];

const initialMaintenanceBuses = [
  {
    busNo: "AP 39 D 3456",
    reason: "Engine checkup required.",
    status: "Under Maintenance",
    date: "2024-07-20",
  },
];

type MaintenanceBus = (typeof initialMaintenanceBuses)[0];

export default function ManagementPage() {
  const { toast } = useToast();
  const [maintenanceBuses, setMaintenanceBuses] = useState(
    initialMaintenanceBuses
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddMaintenance = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const busNo = formData.get("busNo") as string;
    const reason = formData.get("reason") as string;

    if (!busNo || !reason) {
      toast({
        title: "Error",
        description: "Please select a bus and provide a reason.",
        variant: "destructive",
      });
      return;
    }

    const newMaintenanceBus: MaintenanceBus = {
      busNo,
      reason,
      status: "Under Maintenance",
      date: new Date().toISOString().split("T")[0],
    };

    setMaintenanceBuses([...maintenanceBuses, newMaintenanceBus]);
    setIsAddDialogOpen(false);
    toast({
      title: "Maintenance Added",
      description: `Bus ${busNo} has been scheduled for maintenance.`,
    });
  };

  const handleCompleteMaintenance = (busNo: string, date: string) => {
    setMaintenanceBuses(
      maintenanceBuses.filter((bus) => !(bus.busNo === busNo && bus.date === date))
    );
    toast({
      title: "Maintenance Complete",
      description: `Bus ${busNo} is now back in service.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Bus Maintenance</CardTitle>
          <CardDescription>
            Track and manage buses that are under maintenance.
          </CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2" /> Add for Maintenance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Bus for Maintenance</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddMaintenance} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="busNo" className="text-right">
                  Bus
                </Label>
                <Select name="busNo">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a bus" />
                  </SelectTrigger>
                  <SelectContent>
                    {allBuses.map((bus) => (
                      <SelectItem key={bus.id} value={bus.busNo}>
                        {bus.busNo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="reason" className="text-right pt-2">
                  Reason
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  className="col-span-3"
                  required
                  placeholder="Describe the reason for maintenance..."
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add to Maintenance</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bus No.</TableHead>
              <TableHead>Reason for Maintenance</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceBuses.length > 0 ? (
              maintenanceBuses.map((bus, index) => (
                <TableRow key={`${bus.busNo}-${bus.date}-${index}`}>
                  <TableCell className="font-medium">{bus.busNo}</TableCell>
                  <TableCell>{bus.reason}</TableCell>
                  <TableCell>{bus.date}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{bus.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCompleteMaintenance(bus.busNo, bus.date)}
                    >
                      <Wrench className="mr-2 h-3 w-3" /> Mark as Complete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No buses are currently under maintenance.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
