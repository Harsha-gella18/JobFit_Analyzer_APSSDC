"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"
import Entrance from "./pages/Entrance"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import History from "./pages/History"
import Profile from "./pages/Profile"
import { isAuthenticated } from "./utils/auth"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={!isAuthenticated() ? <Entrance /> : <Navigate to="/dashboard" />} />
            <Route path="/signup" element={!isAuthenticated() ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!isAuthenticated() ? <Login /> : <Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
