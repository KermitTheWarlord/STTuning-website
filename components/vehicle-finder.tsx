"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Updated vehicle data structure
const vehicleData = {
  types: ["Car", "Van", "Truck"],
  makes: {
    Car: ["BMW", "Audi", "Mercedes", "Volkswagen", "Toyota", "Honda"],
    Van: ["Ford", "Mercedes", "Volkswagen"],
    Truck: ["DAF", "MAN", "Scania"],
  },
  series: {
    BMW: [
      "1 Series",
      "2 Series",
      "3 Series",
      "4 Series",
      "5 Series",
      "6 Series",
      "7 Series",
      "8 Series",
      "X Series",
      "Z Series",
      "M Series",
    ],
    Audi: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "TT"],
    Mercedes: ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS"],
    Volkswagen: ["Golf", "Passat", "Tiguan", "Touareg", "Polo", "Arteon"],
    Toyota: ["Corolla", "Camry", "RAV4", "Highlander", "Prius", "Yaris"],
    Honda: ["Civic", "Accord", "CR-V", "HR-V", "Jazz", "Pilot"],
  },
  generations: {
    "5 Series": ["E60/E61 (2003-2010)", "F10/F11 (2010-2017)", "G30/G31 (2017-present)"],
    A4: ["B6 (2000-2004)", "B7 (2004-2008)", "B8 (2008-2015)", "B9 (2015-present)"],
    "C-Class": ["W203 (2000-2007)", "W204 (2007-2014)", "W205 (2014-2021)", "W206 (2021-present)"],
    Golf: ["Mk5 (2003-2009)", "Mk6 (2008-2012)", "Mk7 (2012-2020)", "Mk8 (2020-present)"],
    Corolla: ["E120 (2000-2006)", "E140/E150 (2006-2012)", "E160/E170 (2012-2018)", "E210 (2018-present)"],
    Civic: [
      "7th Gen (2000-2005)",
      "8th Gen (2005-2011)",
      "9th Gen (2011-2015)",
      "10th Gen (2015-2021)",
      "11th Gen (2021-present)",
    ],
  },
  models: {
    "E60/E61 (2003-2010)": [
      "520i (2003–2005)",
      "520i (2007–2010)",
      "523i (2005–2007)",
      "523i (2007–2010)",
      "525i (2003–2005)",
      "525i (2005–2007)",
      "525i (2007–2010)",
      "528i (2007–2010)",
      "530i (2003–2005)",
      "530i (2005–2007)",
      "530i (2007–2010)",
      "535i (2007–2010)",
      "540i (2005–2010)",
      "545i (2003–2005)",
      "550i (2005–2010)",
      "M5 (2005–2010)",
      "520d (2005–2007)",
      "520d (2007–2010)",
      "525d (2004–2007)",
      "525d (2007–2010)",
      "530d (2003–2005)",
      "530d (2005–2007)",
      "530d (2007–2010)",
      "535d (2004–2007)",
      "535d (2007–2010)",
    ],
    "B8 (2008-2015)": [
      "1.8 TFSI (2008-2015)",
      "2.0 TFSI (2008-2015)",
      "3.0 TFSI (2008-2015)",
      "2.0 TDI (2008-2015)",
      "3.0 TDI (2008-2015)",
    ],
    "W204 (2007-2014)": [
      "C180 (2007-2014)",
      "C200 (2007-2014)",
      "C250 (2007-2014)",
      "C300 (2007-2014)",
      "C350 (2007-2014)",
      "C220 CDI (2007-2014)",
      "C250 CDI (2007-2014)",
    ],
    "Mk6 (2008-2012)": [
      "1.4 TSI (2008-2012)",
      "1.8 TSI (2008-2012)",
      "2.0 TSI (2008-2012)",
      "1.6 TDI (2008-2012)",
      "2.0 TDI (2008-2012)",
    ],
    "E140/E150 (2006-2012)": [
      "1.4 VVT-i (2006-2012)",
      "1.6 VVT-i (2006-2012)",
      "1.8 VVT-i (2006-2012)",
      "2.0 D-4D (2006-2012)",
    ],
    "8th Gen (2005-2011)": [
      "1.4 i-DSI (2005-2011)",
      "1.8 i-VTEC (2005-2011)",
      "2.0 i-VTEC (2005-2011)",
      "2.2 i-CTDi (2005-2011)",
    ],
  },
  performance: {
    // Existing BMW 5 Series data...

    // Audi A4 B8
    "1.8 TFSI (2008-2015)": {
      stock: { bhp: 160, torque: 250, economy: 42 },
      tuned: { bhp: 200, torque: 300, economy: 40 },
    },
    "2.0 TFSI (2008-2015)": {
      stock: { bhp: 211, torque: 350, economy: 39 },
      tuned: { bhp: 250, torque: 400, economy: 37 },
    },
    "3.0 TFSI (2008-2015)": {
      stock: { bhp: 272, torque: 400, economy: 33 },
      tuned: { bhp: 320, torque: 460, economy: 31 },
    },
    "2.0 TDI (2008-2015)": {
      stock: { bhp: 170, torque: 350, economy: 53 },
      tuned: { bhp: 210, torque: 420, economy: 51 },
    },
    "3.0 TDI (2008-2015)": {
      stock: { bhp: 240, torque: 500, economy: 47 },
      tuned: { bhp: 290, torque: 580, economy: 45 },
    },

    // Mercedes C-Class W204
    "C180 (2007-2014)": {
      stock: { bhp: 156, torque: 250, economy: 44 },
      tuned: { bhp: 190, torque: 290, economy: 42 },
    },
    "C200 (2007-2014)": {
      stock: { bhp: 184, torque: 300, economy: 43 },
      tuned: { bhp: 220, torque: 340, economy: 41 },
    },
    "C250 (2007-2014)": {
      stock: { bhp: 204, torque: 310, economy: 41 },
      tuned: { bhp: 240, torque: 360, economy: 39 },
    },
    "C300 (2007-2014)": {
      stock: { bhp: 231, torque: 300, economy: 38 },
      tuned: { bhp: 270, torque: 350, economy: 36 },
    },
    "C350 (2007-2014)": {
      stock: { bhp: 272, torque: 350, economy: 36 },
      tuned: { bhp: 310, torque: 400, economy: 34 },
    },
    "C220 CDI (2007-2014)": {
      stock: { bhp: 170, torque: 400, economy: 55 },
      tuned: { bhp: 210, torque: 460, economy: 53 },
    },
    "C250 CDI (2007-2014)": {
      stock: { bhp: 204, torque: 500, economy: 54 },
      tuned: { bhp: 240, torque: 560, economy: 52 },
    },

    // Volkswagen Golf Mk6
    "1.4 TSI (2008-2012)": {
      stock: { bhp: 122, torque: 200, economy: 45 },
      tuned: { bhp: 150, torque: 240, economy: 43 },
    },
    "1.8 TSI (2008-2012)": {
      stock: { bhp: 160, torque: 250, economy: 40 },
      tuned: { bhp: 200, torque: 300, economy: 38 },
    },
    "2.0 TSI (2008-2012)": {
      stock: { bhp: 210, torque: 280, economy: 38 },
      tuned: { bhp: 250, torque: 330, economy: 36 },
    },
    "1.6 TDI (2008-2012)": {
      stock: { bhp: 105, torque: 250, economy: 62 },
      tuned: { bhp: 130, torque: 290, economy: 60 },
    },
    "2.0 TDI (2008-2012)": {
      stock: { bhp: 140, torque: 320, economy: 55 },
      tuned: { bhp: 170, torque: 380, economy: 53 },
    },

    // Toyota Corolla E140/E150
    "1.4 VVT-i (2006-2012)": {
      stock: { bhp: 97, torque: 130, economy: 47 },
      tuned: { bhp: 110, torque: 145, economy: 46 },
    },
    "1.6 VVT-i (2006-2012)": {
      stock: { bhp: 124, torque: 157, economy: 43 },
      tuned: { bhp: 140, torque: 175, economy: 42 },
    },
    "1.8 VVT-i (2006-2012)": {
      stock: { bhp: 132, torque: 173, economy: 40 },
      tuned: { bhp: 150, torque: 190, economy: 39 },
    },
    "2.0 D-4D (2006-2012)": {
      stock: { bhp: 126, torque: 310, economy: 55 },
      tuned: { bhp: 150, torque: 350, economy: 53 },
    },

    // Honda Civic 8th Gen
    "1.4 i-DSI (2005-2011)": {
      stock: { bhp: 83, torque: 119, economy: 47 },
      tuned: { bhp: 95, torque: 130, economy: 46 },
    },
    "1.8 i-VTEC (2005-2011)": {
      stock: { bhp: 140, torque: 174, economy: 42 },
      tuned: { bhp: 160, torque: 190, economy: 41 },
    },
    "2.0 i-VTEC (2005-2011)": {
      stock: { bhp: 201, torque: 193, economy: 31 },
      tuned: { bhp: 230, torque: 220, economy: 30 },
    },
    "2.2 i-CTDi (2005-2011)": {
      stock: { bhp: 140, torque: 340, economy: 55 },
      tuned: { bhp: 170, torque: 380, economy: 53 },
    },
  },
}

export function VehicleFinder() {
  const [type, setType] = useState<string>("")
  const [make, setMake] = useState<string>("")
  const [series, setSeries] = useState<string>("")
  const [generation, setGeneration] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const [showResults, setShowResults] = useState(false)

  const handleTypeChange = (value: string) => {
    setType(value)
    setMake("")
    setSeries("")
    setGeneration("")
    setModel("")
    setShowResults(false)
  }

  const handleMakeChange = (value: string) => {
    setMake(value)
    setSeries("")
    setGeneration("")
    setModel("")
    setShowResults(false)
  }

  const handleSeriesChange = (value: string) => {
    setSeries(value)
    setGeneration("")
    setModel("")
    setShowResults(false)
  }

  const handleGenerationChange = (value: string) => {
    setGeneration(value)
    setModel("")
    setShowResults(false)
  }

  const handleModelChange = (value: string) => {
    setModel(value)
    setShowResults(!!vehicleData.performance[value as keyof typeof vehicleData.performance])
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Select value={type} onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {vehicleData.types.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={make} onValueChange={handleMakeChange} disabled={!type}>
          <SelectTrigger>
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent>
            {type &&
              vehicleData.makes[type as keyof typeof vehicleData.makes]?.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={series} onValueChange={handleSeriesChange} disabled={!make}>
          <SelectTrigger>
            <SelectValue placeholder="Select series" />
          </SelectTrigger>
          <SelectContent>
            {make &&
              vehicleData.series[make as keyof typeof vehicleData.series]?.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={generation} onValueChange={handleGenerationChange} disabled={!series}>
          <SelectTrigger>
            <SelectValue placeholder="Select generation" />
          </SelectTrigger>
          <SelectContent>
            {series &&
              vehicleData.generations[series as keyof typeof vehicleData.generations]?.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={model} onValueChange={handleModelChange} disabled={!generation}>
          <SelectTrigger>
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {generation &&
              vehicleData.models[generation as keyof typeof vehicleData.models]?.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {showResults && model && vehicleData.performance[model as keyof typeof vehicleData.performance] && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              Performance Gains for {make} {series} {model}
            </CardTitle>
            <CardDescription>Estimated improvements after remapping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Horsepower</h4>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">
                    +
                    {vehicleData.performance[model as keyof typeof vehicleData.performance].tuned.bhp -
                      vehicleData.performance[model as keyof typeof vehicleData.performance].stock.bhp}{" "}
                    BHP
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({vehicleData.performance[model as keyof typeof vehicleData.performance].stock.bhp} →{" "}
                    {vehicleData.performance[model as keyof typeof vehicleData.performance].tuned.bhp})
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Torque</h4>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">
                    +
                    {vehicleData.performance[model as keyof typeof vehicleData.performance].tuned.torque -
                      vehicleData.performance[model as keyof typeof vehicleData.performance].stock.torque}{" "}
                    Nm
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({vehicleData.performance[model as keyof typeof vehicleData.performance].stock.torque} →{" "}
                    {vehicleData.performance[model as keyof typeof vehicleData.performance].tuned.torque})
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Fuel Economy</h4>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">
                    {vehicleData.performance[model as keyof typeof vehicleData.performance].tuned.economy -
                      vehicleData.performance[model as keyof typeof vehicleData.performance].stock.economy >
                    0
                      ? "+"
                      : ""}
                    {vehicleData.performance[model as keyof typeof vehicleData.performance].tuned.economy -
                      vehicleData.performance[model as keyof typeof vehicleData.performance].stock.economy}
                    %
                  </span>
                  <span className="text-sm text-muted-foreground">Potential Improvement</span>
                </div>
              </div>
            </div>

            <Button className="mt-6 w-full" size="lg">
              Book Remapping Service
            </Button>
          </CardContent>
        </Card>
      )}

      {showResults && model && !vehicleData.performance[model as keyof typeof vehicleData.performance] && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Performance Data Unavailable</CardTitle>
            <CardDescription>We don't have specific data for this vehicle variant yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Please contact us for a personalized performance estimate for your {make} {series} {model}.
            </p>
            <Button className="mt-6 w-full" size="lg">
              Request Custom Estimate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
