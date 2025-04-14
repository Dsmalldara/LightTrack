import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"

export default function Schedule() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Maintenance Schedule</h1>
        <p className="text-gray-500">Plan and manage upcoming maintenance activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Maintenance</CardTitle>
            <CardDescription>Create a new maintenance event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Area</label>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North District</SelectItem>
                  <SelectItem value="central">Central District</SelectItem>
                  <SelectItem value="east">East District</SelectItem>
                  <SelectItem value="west">West District</SelectItem>
                  <SelectItem value="south">South District</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Date</label>
              <div className="flex items-center mt-1">
                <Input type="date" className="flex-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Start Time</label>
                <Input type="time" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">End Time</label>
                <Input type="time" className="mt-1" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Maintenance Type</label>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transformer">Transformer Maintenance</SelectItem>
                  <SelectItem value="grid">Grid Infrastructure</SelectItem>
                  <SelectItem value="lines">Power Lines</SelectItem>
                  <SelectItem value="safety">Safety Checks</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Reason/Description</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the maintenance purpose..."
              ></textarea>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Maintenance</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Maintenance</CardTitle>
            <CardDescription>Next 7 days of scheduled maintenance</CardDescription>
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
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>
                    {maintenance.date}, {maintenance.time}
                  </span>
                </div>
                <p className="text-sm mt-2">{maintenance.reason}</p>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Sample data
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

