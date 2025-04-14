import { Filter, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link } from "react-router-dom"
// API client function to fetch power statuses
const fetchPowerStatuses = async () => {
  const response = await axios.get('/backend/report-fault', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export default function Dashboard() {
  const [issueTypeFilter, setIssueTypeFilter] = useState("all")
  
  // Fetch data using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['powerIssues'],
    queryFn: fetchPowerStatuses,
  })

  // Ensure we have an array to work with
  const issues = Array.isArray(data) ? data : [];

  // Map issue types to emojis
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getEmoji = (issueType:any) => {
    if (!issueType) return "⚠️";
    
    const typeToLower = issueType.toLowerCase();
    if (typeToLower.includes('outage')) return "⚡";
    if (typeToLower.includes('voltage') || typeToLower.includes('fluctuation')) return "📉";
    if (typeToLower.includes('scheduled') || typeToLower.includes('maintenance')) return "⚙️";
    if (typeToLower.includes('transformer')) return "🔥";
    if (typeToLower.includes('storm') || typeToLower.includes('damage')) return "🌩️";
    return "⚠️"; // Default emoji for other types
  };

  // Format timestamp to readable date
  const formatTimestamp = (timestamp: number | string) => {
    if (!timestamp) return "Unknown date";
    
    try {
      const date = new Date(timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (date.toDateString() === today.toDateString()) {
        return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else if (date.toDateString() === yesterday.toDateString()) {
        return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
               `, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
    } catch (e) {
      console.error("Error formatting timestamp:", e);
      return "Invalid date";
    }
  };

  // Filter issues based on selected issue type
  const filteredIssues = issueTypeFilter === "all" 
    ? issues 
    : issues.filter(issue => issue.issueType?.toLowerCase().includes(issueTypeFilter.toLowerCase()));

  console.log("Data from API:", data);
  console.log("Issues array:", issues);
  console.log("Filtered issues:", filteredIssues);
  const updateIssueStatus = async (id:number, newStatus:string) => {
    try {
      const response = await axios.put(`/backend/report-fault/updateStatus/${id}`, { status: newStatus }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update status:", error);
      throw error;
    }
  };



const queryClient = useQueryClient();

interface UpdateStatusParams {
  id: number;
  newStatus: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mutation = useMutation<any, Error, UpdateStatusParams>({
  mutationFn: ({ id, newStatus }) => updateIssueStatus(id, newStatus),
  onSuccess: (_, { newStatus }) => {
    toast.success(`Status updated to "${newStatus}"`);
    queryClient.invalidateQueries({ queryKey: ['powerIssues'] });
  },
  onError: (error) => {
    toast.error("Failed to update status. Please try again.");
    console.error("Status update error:", error);
  },
});
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Power Issue Reports</h1>
          <p className="text-gray-500">Manage and respond to reported power issues</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="flex items-center gap-2">
            <Link to="/report-fault">
            Report Fault
            </Link>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Select 
            defaultValue="all" 
            value={issueTypeFilter}
            onValueChange={setIssueTypeFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Issue Type" />
            </SelectTrigger>
            <SelectContent className="bg-white z-20">
              <SelectItem value="all">All Issues</SelectItem>
              <SelectItem value="outage">Power Outage</SelectItem>
              <SelectItem value="voltage">Voltage Fluctuation</SelectItem>
              <SelectItem value="maintenance">Scheduled Maintenance</SelectItem>
              <SelectItem value="transformer">Transformer Issue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Add emoji legend */}
      <div className="flex flex-wrap gap-4 mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="text-sm flex items-center">
          <span className="text-xl mr-1">⚡</span> Power Outage
        </div>
        <div className="text-sm flex items-center">
          <span className="text-xl mr-1">📉</span> Voltage Fluctuation
        </div>
        <div className="text-sm flex items-center">
          <span className="text-xl mr-1">⚙️</span> Scheduled Maintenance
        </div>
        <div className="text-sm flex items-center">
          <span className="text-xl mr-1">🔥</span> Transformer Issue
        </div>
        <div className="text-sm flex items-center">
          <span className="text-xl mr-1">🌩️</span> Storm Damage
        </div>
        <div className="text-sm flex items-center">
          <span className="text-xl mr-1">⚠️</span> Other Issues
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto mb-2"></div>
            <p>Loading issues...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
          <p>Failed to load issues. Please try again later.</p>
          <p className="text-xs mt-2">{error.message || "Unknown error"}</p>
        </div>
      )}

      {!isLoading && !error && filteredIssues.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">No issues found matching your criteria.</p>
        </div>
      )}

      {!isLoading && !error && filteredIssues.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map((issue) => (
            <Card key={issue.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center">
                    <span className="text-xl mr-2" aria-hidden="true">
                      {getEmoji(issue.issueType)}
                    </span>
                    {issue.issueType || "Unknown Issue"}
                  </CardTitle>
                  <Badge
                    className={
                      issue.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : issue.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {issue.status || "Unknown"}
                  </Badge>
                </div>
                <CardDescription>{issue.location || "Unknown location"}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{issue.description || "No description provided."}</p>
                <div className="flex items-center mt-4 text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatTimestamp(issue.reportedAt)}</span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Reported by: {issue.reportedBy || "Unknown"}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
               {issue.status !== "Resolved" && (
  <Select
    onValueChange={(newStatus) =>
      mutation.mutate({ id: issue.id, newStatus })
    }
  >
    <SelectTrigger
  disabled={mutation.isPending}
  className="w-[130px] h-8 text-sm bg-blue-600 text-white hover:bg-blue-700"
>
  <SelectValue placeholder={mutation.isPending ? "Updating..." : "Update Status"} />
</SelectTrigger>

    <SelectContent className="bg-white z-30">
      <SelectItem value="Pending">Pending</SelectItem>
      <SelectItem value="In Progress">In Progress</SelectItem>
      <SelectItem value="Resolved">Resolved</SelectItem>
    </SelectContent>
  </Select>
)}

              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}