import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Instagram, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartStatus } from "@/components/cart-status"

export function SiteHeader() {
  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled-1_1.jpg-fECS99aMzR8G6JOObuFF8StMP9pEpQ.jpeg"
            alt="ST Tuning Logo"
            width={180}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <Link href="/" className="text-foreground/70 hover:text-foreground">
            Home
          </Link>
          <Link href="/#services" className="text-foreground/70 hover:text-foreground">
            Services
          </Link>
          <Link href="/certifications" className="text-foreground/70 hover:text-foreground">
            Certifications
          </Link>
          <Link href="/tune-request" className="text-foreground/70 hover:text-foreground">
            Tune Request
          </Link>
          <Link href="/#shop" className="text-foreground/70 hover:text-foreground">
            <ShoppingBag className="w-4 h-4 mr-1 inline-block" />
            Shop
          </Link>
          <a
            href="https://www.instagram.com/sttuning_kz/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-foreground/70 hover:text-foreground"
          >
            <Instagram className="w-4 h-4 mr-1" />
            @sttuning_kz
          </a>
          <a
            href="https://g.co/kgs/coAPWwa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-foreground/70 hover:text-foreground"
          >
            <MapPin className="w-4 h-4 mr-1" />
            Kazanlak, Bulgaria
          </a>
          <a href="tel:0876877288" className="flex items-center text-foreground/70 hover:text-foreground">
            <Phone className="w-4 h-4 mr-1" />
            087 687 7288
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <CartStatus />
          <Button asChild>
            <a href="tel:0876877288">Contact Us</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
