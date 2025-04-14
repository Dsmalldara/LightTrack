import React, { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Zap, CheckCircle2 } from "lucide-react";
import {useNavigate } from "react-router-dom";

export default function FaultReportForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    issueType: "",
    description: "",
    reportedBy: "",
    status: "Reported"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement  | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name:string, value:string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.location || !formData.issueType || !formData.description || !formData.reportedBy) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
     await axios.post("api/report-fault", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      toast.success("Fault report submitted successfully");
      
      // Reset form
      setFormData({
        location: "",
        issueType: "",
        description: "",
        reportedBy: "",
        status: "Reported"
      });
      
      // Refresh the power issues data in the dashboard
      queryClient.invalidateQueries({ queryKey: ['powerIssues'] });
      navigate("/"); 
    } catch (error) {
      console.error("Error submitting fault report:", error);
      toast.error("Failed to submit fault report. Please try again.");
    } finally {
      setIsSubmitting(false);

    }
  };

  // Get icon based on issue type
  const getIssueTypeIcon = (type:string) => {
    if (!type) return null;
    
    switch(type) {
      case "Power Outage":
        return <Zap className="h-5 w-5 text-amber-500" />;
      case "Transformer Failure":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden">
      <div className="h-2 bg-blue-600"></div>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2 mb-1">
          <div className="p-1.5 rounded-lg bg-blue-100">
            <Zap className="h-5 w-5 text-blue-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">Report Power Issue</CardTitle>
        </div>
        <CardDescription className="text-gray-500">
          Submit details about the power fault you've encountered
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium flex items-center text-gray-700">
              Location <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., Lekki Phase 1"
              value={formData.location}
              onChange={handleChange}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md py-2"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="issueType" className="text-sm font-medium text-gray-700 flex items-center">
              Issue Type <span className="text-red-500 ml-1">*</span>
            </label>
            <Select
              value={formData.issueType}
              onValueChange={(value) => handleSelectChange("issueType", value)}
              required
            >
              <SelectTrigger id="issueType" className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md">
                <div className="flex items-center">
                  {getIssueTypeIcon(formData.issueType)}
                  <span className={`${getIssueTypeIcon(formData.issueType) ? 'ml-2' : ''}`}>
                    <SelectValue placeholder="Select issue type" />
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                <SelectItem value="Power Outage" className="flex items-center cursor-pointer hover:bg-blue-50">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-amber-500 mr-2" />
                    Power Outage
                  </div>
                </SelectItem>
                <SelectItem value="Voltage Fluctuation" className="cursor-pointer hover:bg-blue-50">Voltage Fluctuation</SelectItem>
                <SelectItem value="Transformer Failure" className="cursor-pointer hover:bg-blue-50">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    Transformer Failure
                  </div>
                </SelectItem>
                <SelectItem value="Scheduled Maintenance" className="cursor-pointer hover:bg-blue-50">Scheduled Maintenance</SelectItem>
                <SelectItem value="Storm Damage" className="cursor-pointer hover:bg-blue-50">Storm Damage</SelectItem>
                <SelectItem value="Other" className="cursor-pointer hover:bg-blue-50">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center">
              Description <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide details about the issue"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="reportedBy" className="text-sm font-medium text-gray-700 flex items-center">
              Reported By <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id="reportedBy"
              name="reportedBy"
              placeholder="Your name or ID"
              value={formData.reportedBy}
              onChange={handleChange}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md py-2"
            />
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6">
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition duration-200 flex items-center justify-center"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Submit Report
            </>
          )}
        </Button>
      </CardFooter>
      
      <div className="px-6 pb-4">
        <p className="text-xs text-gray-500 text-center">
          All reports are reviewed by our operations team within 1-2 hours
        </p>
      </div>
    </Card>
  );
}