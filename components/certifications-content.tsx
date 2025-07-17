import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

const certifications = [
  {
    title: "Ethanol & Flex Fuel Tuning",
    date: "October 2024",
    description: "Advanced training in ethanol and flex fuel tuning techniques",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1_cleanup%20(2)-DeUGLHyBG3rznMyjAPwOb8YFozzCVO.png",
    skills: ["Flex Fuel Systems", "Ethanol Tuning", "Fuel System Optimization"],
  },
  {
    title: "Practical Reflash Tuning",
    date: "March 2024",
    description: "Comprehensive training in ECU reflashing and calibration",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1_cleanup%20(2)-DeUGLHyBG3rznMyjAPwOb8YFozzCVO.png",
    skills: ["ECU Remapping", "Performance Tuning", "OEM Calibration"],
  },
  {
    title: "Practical Standalone Tuning",
    date: "October 2024",
    description: "Expert-level training in standalone ECU systems",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1_cleanup%20(2)-DeUGLHyBG3rznMyjAPwOb8YFozzCVO.png",
    skills: ["Standalone ECUs", "Custom Mapping", "Performance Optimization"],
  },
  {
    title: "CAN Bus Communications Decoded",
    date: "October 2024",
    description: "Advanced understanding of CAN bus systems and diagnostics",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1_cleanup%20(2)-DeUGLHyBG3rznMyjAPwOb8YFozzCVO.png",
    skills: ["CAN Bus Systems", "Network Diagnostics", "Vehicle Communications"],
  },
  {
    title: "Practical Engine Building",
    date: "October 2024",
    description: "Comprehensive training in performance engine assembly",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1_cleanup%20(2)-DeUGLHyBG3rznMyjAPwOb8YFozzCVO.png",
    skills: ["Engine Assembly", "Performance Builds", "Mechanical Expertise"],
  },
  {
    title: "Practical Diesel Tuning",
    date: "October 2024",
    description: "Specialized training in diesel engine optimization",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1_cleanup%20(2)-DeUGLHyBG3rznMyjAPwOb8YFozzCVO.png",
    skills: ["Diesel Tuning", "DPF Management", "Emissions Control"],
  },
  {
    title: "Data Analysis Fundamentals",
    date: "October 2024",
    description: "Advanced training in performance data analysis",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1_cleanup%20(2)-DeUGLHyBG3rznMyjAPwOb8YFozzCVO.png",
    skills: ["Data Logging", "Performance Analysis", "Diagnostic Interpretation"],
  },
]

export function CertificationsContent() {
  return (
    <main className="min-h-screen py-20 slate-pattern">
      <div className="container">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Professional Certifications</h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="w-6 h-6 text-primary" />
              <span className="text-xl font-semibold">Tony Shivenkov</span>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence is reflected in our ongoing professional development and certifications.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur transform transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                  </div>
                  <CardDescription className="flex items-center gap-2">Completed: {cert.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center p-6">
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-wider mb-2">Certificate of Completion</p>
                      <p className="text-sm font-medium mb-1">Presented to</p>
                      <p className="text-lg font-bold mb-2">Tony Shivenkov</p>
                      <p className="text-xs text-muted-foreground">{cert.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/10">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
