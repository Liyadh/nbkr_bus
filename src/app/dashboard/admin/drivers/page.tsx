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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialDrivers = [
  {
    id: "D001",
    name: "John Doe",
    phone: "123-456-7890",
    address: "123 Main St, Anytown",
    assignedBus: "BUS-01",
    route: "Campus Circle",
  },
  {
    id: "D002",
    name: "Jane Smith",
    phone: "234-567-8901",
    address: "456 Oak Ave, Anytown",
    assignedBus: "BUS-02",
    route: "Downtown Express",
  },
  {
    id: "D003",
    name: "Mike Ross",
    phone: "345-678-9012",
    address: "789 Pine Ln, Anytown",
    assignedBus: "BUS-03",
    route: "North Campus",
  },
];

type Driver = (typeof initialDrivers)[0];

export default function DriversPage() {
  const { toast } = useToast();
  const [drivers, setDrivers] = useState(initialDrivers);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddDriver = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newDriver: Driver = {
      id: `D${String(drivers.length + 1).padStart(3, "0")}`,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      assignedBus: formData.get("assignedBus") as string,
      route: formData.get("route") as string,
    };
    setDrivers([...drivers, newDriver]);
    setIsAddDialogOpen(false);
    toast({
      title: "Driver Added",
      description: `${newDriver.name} has been successfully added.`,
    });
  };

  const handleRemoveDriver = (driverId: string) => {
    const driverToRemove = drivers.find(d => d.id === driverId);
    setDrivers(drivers.filter((driver) => driver.id !== driverId));
    setSelectedDriver(null);
    toast({
      title: "Driver Removed",
      description: `${driverToRemove?.name} has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Drivers</CardTitle>
              <CardDescription>
                Click on a driver to view their details.
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusCircle className="mr-2" /> Add Driver
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a New Driver</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddDriver} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" name="name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input id="phone" name="phone" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input id="address" name="address" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assignedBus" className="text-right">
                      Assigned Bus
                    </Label>
                    <Input
                      id="assignedBus"
                      name="assignedBus"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="route" className="text-right">
                      Route
                    </Label>
                    <Input id="route" name="route" className="col-span-3" required />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Add Driver</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Assigned Bus</TableHead>
                  <TableHead>Route</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-medium">{driver.id}</TableCell>
                    <TableCell>{driver.name}</TableCell>
                    <TableCell>{driver.assignedBus}</TableCell>
                    <TableCell>{driver.route}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Driver Details</CardTitle>
            <CardDescription>
              Select a driver from the list to see their information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDriver ? (
              <>
                <div>
                  <h3 className="font-semibold">{selectedDriver.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ID: {selectedDriver.id}
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Phone:</strong> {selectedDriver.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedDriver.address}
                  </p>
                  <p>
                    <strong>Assigned Bus:</strong> {selectedDriver.assignedBus}
                  </p>
                  <p>
                    <strong>Route:</strong> {selectedDriver.route}
                  </p>
                </div>
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full mt-4">
                      <Trash2 className="mr-2 h-4 w-4" /> Remove Driver
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        remove {selectedDriver.name} from the records.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemoveDriver(selectedDriver.id)}>
                        Confirm & Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p>No driver selected.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
