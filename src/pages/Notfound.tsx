"use client"

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button className="mt-8 bg-blue-600 hover:bg-blue-700" onClick={() => navigate("/")}>
        Return to Dashboard
      </Button>
    </div>
  )
}

