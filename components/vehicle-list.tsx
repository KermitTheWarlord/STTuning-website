"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Vehicle {
  make: string
  model: string
  year: string
  engine: string
  stockBhp: string
  tunedBhp: string
  stockTorque: string
  tunedTorque: string
  fuelEconomyImprovement: string
  additionalNotes: string
}

export function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch("/api/vehicles")
      if (response.ok) {
        const data = await response.json()
        setVehicles(data)
      }
    }
    fetchVehicles()
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              {vehicle.make} {vehicle.model} ({vehicle.year})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Engine:</strong> {vehicle.engine}
            </p>
            <p>
              <strong>BHP:</strong> {vehicle.stockBhp} → {vehicle.tunedBhp}
            </p>
            <p>
              <strong>Torque:</strong> {vehicle.stockTorque}Nm → {vehicle.tunedTorque}Nm
            </p>
            <p>
              <strong>Fuel Economy Improvement:</strong> {vehicle.fuelEconomyImprovement}%
            </p>
            {vehicle.additionalNotes && (
              <p>
                <strong>Notes:</strong> {vehicle.additionalNotes}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
