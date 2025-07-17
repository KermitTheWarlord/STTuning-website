import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HomeContent } from "@/components/home-content"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HomeContent />
      <SiteFooter />
    </>
  )
}
