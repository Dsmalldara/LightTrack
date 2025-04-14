import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Messages() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Message Center</h1>
        <p className="text-gray-500">Respond to complaints and send notifications</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>Respond to user complaints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {complaintsData.map((complaint) => (
              <div key={complaint.id} className="p-3 border rounded-lg">
                <div className="flex justify-between">
                  <p className="font-medium">{complaint.user}</p>
                  <span className="text-xs text-gray-500">{complaint.time}</span>
                </div>
                <p className="text-sm mt-1">{complaint.message}</p>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    Dismiss
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Reply
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
            <CardDescription>Broadcast updates to users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Notification Type</label>
              <Select defaultValue="outage">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outage">Power Outage</SelectItem>
                  <SelectItem value="restoration">Power Restoration</SelectItem>
                  <SelectItem value="maintenance">Scheduled Maintenance</SelectItem>
                  <SelectItem value="update">General Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Target Area</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="north">North District</SelectItem>
                  <SelectItem value="central">Central District</SelectItem>
                  <SelectItem value="east">East District</SelectItem>
                  <SelectItem value="west">West District</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your notification message here..."
              ></textarea>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Notification</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Sample data
const complaintsData = [
  {
    id: 1,
    user: "John Smith",
    time: "15 min ago",
    message:
      "We've been experiencing frequent power cuts in the evening for the past week. This is affecting our business operations.",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    time: "1 hour ago",
    message:
      "The power restoration in East District is taking longer than the communicated 2 hours. Any updates on when it will be fixed?",
  },
  {
    id: 3,
    user: "Michael Wong",
    time: "3 hours ago",
    message:
      "There was no prior notification about today's maintenance. We had important work scheduled that required power.",
  },
]

