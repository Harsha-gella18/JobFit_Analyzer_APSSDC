"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, Shield } from "lucide-react"
import api from "../utils/api"
import toast from "react-hot-toast"

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get("/api/users/profile/")
      setProfile(response.data)
    } catch (error) {
      toast.error("Failed to fetch profile")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <User className="h-8 w-8 mr-3 text-blue-600" />
            User Profile
          </h1>
          <p className="text-gray-600">Manage your JOBFIT ANALYZER account</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
                <p className="text-blue-100">Here's your account information</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            {profile ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <Mail className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">Email Address</h3>
                    </div>
                    <p className="text-gray-700 text-lg">{profile.email}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <div className="flex items-center mb-4">
                      <Shield className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">User ID</h3>
                    </div>
                    <p className="text-gray-700 text-lg">#{profile.id}</p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Account Status</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-700 font-medium">Active</span>
                  </div>
                  <p className="text-blue-700 mt-2">
                    Your account is active and ready to use all JOBFIT ANALYZER features.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white"
                >
                  <h3 className="text-lg font-medium mb-2">Need Help?</h3>
                  <p className="text-blue-100 mb-4">
                    If you have any questions about your account or need assistance with JOBFIT ANALYZER, we're here to
                    help.
                  </p>
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md transition-all duration-200">
                    Contact Support
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Unable to load profile information</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Profile
