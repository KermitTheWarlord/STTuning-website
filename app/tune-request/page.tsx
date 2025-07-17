"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Upload, Mail, Car, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/x-zip-compressed",
  "application/zip",
  "application/x-7z-compressed",
  "application/x-rar-compressed",
]

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  vehicle: z.string().min(2, "Please specify your vehicle"),
  message: z.string().optional(),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Please upload a file")
    .refine((files) => files.length === 1, "File is required")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "Max file size is 10MB")
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type), "Only .zip, .7z, or .rar files are accepted"),
})

export default function TuneRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      vehicle: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("email", values.email)
      formData.append("vehicle", values.vehicle)
      formData.append("message", values.message || "")
      formData.append("file", values.file[0])

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        throw new Error(result.error || "Failed to send message")
      }

      form.reset()
      toast({
        title: "Request Sent Successfully",
        description: "We'll review your tune request and get back to you soon.",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was an error sending your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-20 slate-pattern">
        <div className="container">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Remote Tuning Service</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Send us your vehicle's tune file for professional optimization. We'll analyze your requirements and
                provide custom performance improvements.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 items-start">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>Simple steps to get your vehicle tuned</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Car className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">1. Vehicle Information</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide details about your vehicle including make, model, and current modifications.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Upload className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">2. Send Your File</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload your ECU file (zip, 7z, or rar format) along with your requirements and goals.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">3. Get Your Tune</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive your optimized tune file within 24-48 hours along with installation instructions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Request Form</CardTitle>
                  <CardDescription>Fill out the details below to get started</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Details</FormLabel>
                            <FormControl>
                              <Input placeholder="Make, Model, Year, Engine" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="file"
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>ECU File</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept=".zip,.7z,.rar"
                                onChange={(e) => onChange(e.target.files)}
                                {...field}
                              />
                            </FormControl>
                            <p className="text-xs text-muted-foreground">
                              Upload your ECU file (max 10MB, .zip, .7z, or .rar format)
                            </p>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Information</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Current modifications, tuning goals, etc."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <Toaster />
    </>
  )
}
