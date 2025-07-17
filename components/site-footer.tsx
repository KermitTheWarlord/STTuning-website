import { MapPin, Phone, Clock, Instagram } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-black/95 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:0876877288" className="flex items-center text-muted-foreground hover:text-foreground">
                <Phone className="w-4 h-4 mr-2" />
                087 687 7288
              </a>
              <a
                href="https://g.co/kgs/coAPWwa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-foreground"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Kazanlak, Bulgaria
              </a>
              <a
                href="https://www.instagram.com/sttuning_kz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-foreground"
              >
                <Instagram className="w-4 h-4 mr-2" />
                @sttuning_kz
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <div className="flex items-start text-muted-foreground">
              <Clock className="w-4 h-4 mr-2 mt-0.5" />
              <div>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Find Us</h3>
            <a href="https://g.co/kgs/coAPWwa" target="_blank" rel="noopener noreferrer" className="inline-block">
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11723.088821435567!2d25.4!3d42.6!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a8501a6b884b05%3A0x3a39c1f14570fb3c!2sKazanlak%2C%20Bulgaria!5e0!3m2!1sen!2sus!4v1635959125000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-muted text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ST Tuning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
