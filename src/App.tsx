import { Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import PowerStatus from "./pages/PowerStatus"
import Messages from "./pages/Messages"
import Schedule from "./pages/Schedule"
import Users from "./pages/Users"
import NotFound from "./pages/Notfound"
import Layout from "./components/Layout"
import { Toaster } from "sonner"
import FaultReportForm from "./pages/ReportFault"


function App() {
  return (
    <div>
       {/* Your routes/layout/components */}
     <Toaster position="top-right" richColors />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="power-status" element={<PowerStatus />} />
        <Route path="messages" element={<Messages />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
        <Route path="report-fault" element={<FaultReportForm/>} />
      </Route>
    </Routes>
    </div>
  )
}

export default App

