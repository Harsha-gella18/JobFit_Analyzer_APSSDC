
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { FileText, History, LogOut, User } from "lucide-react"
import { isAuthenticated, logout } from "../utils/auth"
import toast from "react-hot-toast"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const authenticated = isAuthenticated()

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    navigate("/")
  }

  if (!authenticated) return null

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: FileText },
    { path: "/history", label: "History", icon: History },
    { path: "/profile", label: "Profile", icon: User },
  ]

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">JOBFIT ANALYZER</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
