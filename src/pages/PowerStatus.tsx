import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PowerStatus() {
  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Power Status Management</h1>
        <p className="text-gray-500">Update power supply status and schedules</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
      <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Current Power Status</CardTitle>
            <CardDescription>Update the status for different areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            {powerStatusData.map((area) => (
              <div key={area.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center">
                  <span className="text-xl mr-2" aria-hidden="true">
                    {area.emoji}
                  </span>
                  <div>
                    <p className="font-medium">{area.name}</p>
                    <p className="text-sm text-gray-500">{area.subscribers} subscribers</p>
                  </div>
                </div>
                <Select defaultValue={area.status.toLowerCase()}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="outage">Outage</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Update All Statuses</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Maintenance</CardTitle>
            <CardDescription>Upcoming planned power outages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {maintenanceData.map((maintenance) => (
              <div key={maintenance.id} className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <p className="font-medium flex items-center">
                    <span className="text-xl mr-2" aria-hidden="true">
                      {maintenance.emoji}
                    </span>
                    {maintenance.area}
                  </p>
                  <Badge variant="outline">{maintenance.duration}</Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {maintenance.date}, {maintenance.time}
                </p>
                <p className="text-sm mt-2">{maintenance.reason}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Schedule New Maintenance
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Sample data
const powerStatusData = [
  { id: 1, name: "North District", subscribers: 12450, status: "Online", emoji: "✅" },
  { id: 2, name: "Central District", subscribers: 28730, status: "Partial", emoji: "⚠️" },
  { id: 3, name: "East District", subscribers: 15680, status: "Online", emoji: "✅" },
  { id: 4, name: "West District", subscribers: 19340, status: "Outage", emoji: "❌" },
  { id: 5, name: "South District", subscribers: 22150, status: "Maintenance", emoji: "🔧" },
]

const maintenanceData = [
  {
    id: 1,
    area: "Central District",
    date: "Mar 20, 2025",
    time: "10:00 AM - 2:00 PM",
    duration: "4 hours",
    reason: "Transformer upgrade and line maintenance",
    emoji: "🔌",
  },
  {
    id: 2,
    area: "West District, Industrial Zone",
    date: "Mar 22, 2025",
    time: "1:00 AM - 5:00 AM",
    duration: "4 hours",
    reason: "Grid infrastructure improvements",
    emoji: "🏗️",
  },
  {
    id: 3,
    area: "South District, Blocks D-F",
    date: "Mar 25, 2025",
    time: "9:00 AM - 12:00 PM",
    duration: "3 hours",
    reason: "Preventive maintenance and safety checks",
    emoji: "🔍",
  },
]

