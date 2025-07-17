import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Gauge, Settings, Wrench } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { VehicleFinder } from "@/components/vehicle-finder"
import { ShopSection } from "@/components/shop-section"

export function HomeContent() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-pattern h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="container relative z-10 text-center">
          <div className="mb-8 relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1%20(1).png-JLXkFeN9o0xcWTjdn1B2YBxL0fS5E5.jpeg"
              alt="ST Tuning Logo"
              width={500}
              height={111}
              className="mx-auto logo-blend"
              priority
            />
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Professional ECU Remapping & Performance Tuning in Kazanlak, Bulgaria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg" asChild>
              <Link href="/tune-request">
                Submit File <ChevronRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="tel:0876877288">Call Now</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 slate-pattern">
        <div className="container">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <Settings className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">ECU Remapping</h3>
                  <p className="text-muted-foreground">
                    Optimize your vehicle's performance with our professional ECU remapping services.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <Gauge className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Performance Tuning</h3>
                  <p className="text-muted-foreground">
                    Enhance your vehicle's power and efficiency through custom performance tuning.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <Wrench className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Diagnostics</h3>
                  <p className="text-muted-foreground">
                    Comprehensive vehicle diagnostics and troubleshooting services.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Finder Section */}
      <section className="py-20 bg-black/95">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Find Your Vehicle</h2>
          <p className="text-center text-muted-foreground mb-8">
            Select your vehicle details to see potential performance gains
          </p>
          <VehicleFinder />
        </div>
      </section>

      {/* Shop Section */}
      <ShopSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary-foreground">Ready to Upgrade Your Vehicle?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Visit us in Kazanlak, Bulgaria, or contact us today for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <a href="https://g.co/kgs/coAPWwa" target="_blank" rel="noopener noreferrer">
                Find Us
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="tel:0876877288">Call Now</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
