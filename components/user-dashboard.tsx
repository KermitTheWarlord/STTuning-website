"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function UserDashboard({ user }: { user: { name: string; email: string; credits: number } }) {
  const [file, setFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      })
      return
    }

    if (user.credits < 1) {
      toast({
        title: "Insufficient credits",
        description: "You need at least 1 credit to upload a file for tuning.",
        variant: "destructive",
      })
      return
    }

    // Here you would implement the file upload logic
    // For now, we'll just simulate a successful upload
    toast({
      title: "File uploaded successfully",
      description: "Your file has been uploaded and will be processed soon.",
    })
  }

  const handleBuyCredits = async () => {
    // Here you would implement the credit purchase logic
    // For now, we'll just simulate a successful purchase
    toast({
      title: "Credits purchased",
      description: "5 credits have been added to your account.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user.name}</CardTitle>
          <CardDescription>Manage your tuning files and credits</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Email: {user.email}</p>
          <p>Available Credits: {user.credits}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Tuning File</CardTitle>
          <CardDescription>Upload your ECU file for tuning (1 credit required)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="file-upload">Select File</Label>
            <Input id="file-upload" type="file" onChange={handleFileChange} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleFileUpload} disabled={!file || user.credits < 1}>
            Upload File
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buy Credits</CardTitle>
          <CardDescription>Purchase credits to use for file tuning</CardDescription>
        </CardHeader>
        <CardContent>
          <p>5 Credits for $50</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleBuyCredits}>Purchase Credits</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
