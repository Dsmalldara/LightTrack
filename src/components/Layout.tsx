import { Outlet, NavLink } from "react-router-dom"
import { Bell, Calendar, CheckCircle, Home, LogOut, MessageSquare, Search, Settings, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Layout() {
    const [activesidebar,setActiveSidebar] = useState(false)
  return (
    <div className="flex min-h-screen bg-white w-full overflow-hidden">
      {/* Sidebar */}
     
      <div className="hidden md:flex w-64 flex-col fixed top-0 left-0 bottom-0 bg-blue-50 border-r border-blue-100 h-screen overflow-y-auto">
        <div className="p-4 border-b border-blue-100">
          <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Power Admin
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </NavLink>

          <NavLink
            to="/power-status"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Power Status
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </NavLink>

          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </NavLink>
        </nav>
        <div className="p-4 border-t border-blue-100">
          <Button variant="ghost" className="w-full justify-start text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
     
      <div className="flex w-full flex-1 flex-col md:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-3 flex items-center justify-between">
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={()=>setActiveSidebar(!activesidebar)}>
              <Settings className="h-5 w-5"  />
            </Button>
            <div>
                {
                    activesidebar ? (
                        <div className="fixed top-0 left-0 w-[15rem] bg-blue h-screen z-10 ">
                            <div className="flex   flex-col bg-blue-50 border-r border-blue-100">
        <div className="p-4 border-b border-blue-100 flex justify-between">
          <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Power Admin
          </h2>
          <Button variant="ghost" size="icon"  className="bg-blue-100" onClick={()=>setActiveSidebar(!activesidebar)}>
            <X className="h-5 w-5 "  />
          </Button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </NavLink>

          <NavLink
            to="/power-status"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Power Status
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </NavLink>

          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center w-full px-2 py-2 text-sm font-medium rounded-md ${
                isActive ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`
            }
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </NavLink>
        </nav>
        <div className="p-4 border-t border-blue-100">
          <Button variant="ghost" className="w-full justify-start text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
                        </div>
                    ) : (
                        <div>
                            {null}
                        </div>
                    )
                }
                
            </div>
          </div>
          <div className="relative w-full max-w-md mx-4 ">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search issues..." className="pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
          </div>
        </header>

        {/* Content - This is where the route components will be rendered */}
        <main className="flex-1 p-6 overflow-auto w-full h-full  ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

