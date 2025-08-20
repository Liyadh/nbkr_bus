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

const initialBuses = [
  {
    id: "BUS-01",
    busNo: "AP 39 A 1234",
    fcValidity: "2025-01-15",
    pollutionValidity: "2024-12-20",
    insuranceValidity: "2025-03-10",
    route: "Campus Circle",
    points: 12,
    seatingCapacity: 40,
  },
  {
    id: "BUS-02",
    busNo: "AP 39 B 5678",
    fcValidity: "2025-02-28",
    pollutionValidity: "2025-01-30",
    insuranceValidity: "2025-05-22",
    route: "Downtown Express",
    points: 8,
    seatingCapacity: 50,
  },
   {
    id: "BUS-03",
    busNo: "AP 39 C 9012",
    fcValidity: "2024-11-30",
    pollutionValidity: "2025-05-15",
    insuranceValidity: "2025-02-01",
    route: "North Campus",
    points: 15,
    seatingCapacity: 45,
  },
];

type Bus = (typeof initialBuses)[0];

export default function BusesPage() {
  const { toast } = useToast();
  const [buses, setBuses] = useState(initialBuses);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddBus = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newBus: Bus = {
      id: `BUS-${String(buses.length + 1).padStart(2, "0")}`,
      busNo: formData.get("busNo") as string,
      fcValidity: formData.get("fcValidity") as string,
      pollutionValidity: formData.get("pollutionValidity") as string,
      insuranceValidity: formData.get("insuranceValidity") as string,
      route: formData.get("route") as string,
      points: Number(formData.get("points")),
      seatingCapacity: Number(formData.get("seatingCapacity")),
    };
    setBuses([...buses, newBus]);
    setIsAddDialogOpen(false);
    toast({
      title: "Bus Added",
      description: `Bus ${newBus.busNo} has been successfully added.`,
    });
  };

  const handleRemoveBus = (busId: string) => {
    const busToRemove = buses.find(b => b.id === busId);
    setBuses(buses.filter((bus) => bus.id !== busId));
    setSelectedBus(null);
    toast({
      title: "Bus Removed",
      description: `Bus ${busToRemove?.busNo} has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Buses</CardTitle>
              <CardDescription>
                Click on a bus to view its details.
              </CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusCircle className="mr-2" /> Add Bus
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add a New Bus</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddBus} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="busNo" className="text-right">
                      Bus No
                    </Label>
                    <Input id="busNo" name="busNo" className="col-span-3" required />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="seatingCapacity" className="text-right">
                      Capacity
                    </Label>
                    <Input id="seatingCapacity" name="seatingCapacity" type="number" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fcValidity" className="text-right">
                      FC Validity
                    </Label>
                    <Input id="fcValidity" name="fcValidity" type="date" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pollutionValidity" className="text-right">
                      Pollution
                    </Label>
                    <Input id="pollutionValidity" name="pollutionValidity" type="date" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="insuranceValidity" className="text-right">
                      Insurance
                    </Label>
                    <Input id="insuranceValidity" name="insuranceValidity" type="date" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="route" className="text-right">
                      Route
                    </Label>
                    <Input id="route" name="route" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="points" className="text-right">
                      No. of Points
                    </Label>
                    <Input id="points" name="points" type="number" className="col-span-3" required />
                  </div>
                  <DialogFooter>
                     <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Add Bus</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus ID</TableHead>
                  <TableHead>Bus No.</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Insurance Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buses.map((bus) => (
                  <TableRow
                    key={bus.id}
                    onClick={() => setSelectedBus(bus)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-medium">{bus.id}</TableCell>
                    <TableCell>{bus.busNo}</TableCell>
                    <TableCell>{bus.route}</TableCell>
                     <TableCell>{bus.insuranceValidity}</TableCell>
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
            <CardTitle>Bus Details</CardTitle>
            <CardDescription>
              Select a bus from the list to see its information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedBus ? (
              <>
                <div>
                  <h3 className="font-semibold">{selectedBus.busNo}</h3>
                  <p className="text-sm text-muted-foreground">
                    ID: {selectedBus.id}
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Route:</strong> {selectedBus.route} ({selectedBus.points} points)
                  </p>
                  <p>
                    <strong>Seating Capacity:</strong> {selectedBus.seatingCapacity}
                  </p>
                  <p>
                    <strong>FC Validity:</strong> {selectedBus.fcValidity}
                  </p>
                  <p>
                    <strong>Pollution Validity:</strong> {selectedBus.pollutionValidity}
                  </p>
                  <p>
                    <strong>Insurance Validity:</strong> {selectedBus.insuranceValidity}
                  </p>
                </div>
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full mt-4">
                      <Trash2 className="mr-2 h-4 w-4" /> Remove Bus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        remove bus {selectedBus.busNo} from the records.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemoveBus(selectedBus.id)}>
                        Confirm & Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p>No bus selected.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
