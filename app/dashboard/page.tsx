import { UserDashboard } from "@/components/user-dashboard"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// This is a mock user object. In a real application, you would fetch this data from your backend.
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  credits: 3,
}

export default function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto py-20">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
        <UserDashboard user={mockUser} />
      </main>
      <SiteFooter />
    </>
  )
}
