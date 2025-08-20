"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Bus, User } from "lucide-react";
import { Card } from "@/components/ui/card";

const initialBuses = [
  { id: 1, name: "Route A", top: "20%", left: "30%" },
  { id: 2, name: "Route B", top: "50%", left: "60%" },
  { id: 3, name: "Route C", top: "75%", left: "45%" },
];

export function MapComponent() {
  const [buses, setBuses] = useState(initialBuses);
  const [userPosition, setUserPosition] = useState({ top: "50%", left: "50%" });

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((currentBuses) =>
        currentBuses.map((bus) => ({
          ...bus,
          top: `${parseFloat(bus.top) + (Math.random() - 0.5) * 2}%`,
          left: `${parseFloat(bus.left) + (Math.random() - 0.5) * 2}%`,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="relative h-[60vh] w-full overflow-hidden rounded-xl shadow-lg">
      <Image
        src="https://placehold.co/1600x900.png"
        alt="City Map"
        fill
        className="object-cover opacity-70"
        data-ai-hint="city map"
        priority
      />

      <div
        className="absolute transition-all duration-1000 ease-linear"
        style={{
          top: userPosition.top,
          left: userPosition.left,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative flex flex-col items-center">
          <User className="h-8 w-8 rounded-full border-2 border-white bg-blue-500 p-1 text-white shadow-md" />
          <span className="mt-1 rounded-full bg-blue-500 px-2 py-0.5 text-xs font-bold text-white">
            You
          </span>
        </div>
      </div>

      {buses.map((bus) => (
        <div
          key={bus.id}
          className="absolute transition-all duration-2000 ease-linear"
          style={{
            top: bus.top,
            left: bus.left,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="group relative flex cursor-pointer flex-col items-center">
            <Bus className="h-10 w-10 text-primary drop-shadow-lg" />
            <div className="absolute bottom-full mb-2 hidden group-hover:block">
              <div className="whitespace-nowrap rounded-md bg-background px-3 py-1 text-sm text-foreground shadow-lg">
                <p className="font-bold">{bus.name}</p>
                <p className="text-xs">ETA: 5 mins</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
