"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HistoryIcon, Download, Calendar, Target, AlertCircle } from "lucide-react"
import api from "../utils/api"
import toast from "react-hot-toast"

const History = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await api.get("/api/history/history/")
      setHistory(response.data)
    } catch (error) {
      toast.error("Failed to fetch history")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <HistoryIcon className="h-8 w-8 mr-3 text-blue-600" />
            Resume Analysis History
          </h1>
          <p className="text-gray-600">View all your previous resume analysis results from JOBFIT ANALYZER</p>
        </div>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12"
          >
            <Target className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No scoring history yet</h3>
            <p className="text-gray-600">Upload your first resume to get started!</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold ${getScoreColor(item.score)}`}
                      >
                        {item.score}%
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(item.created_at)}
                        </div>
                        <p className="text-sm text-gray-600">Score: {item.score}% ATS Compatibility</p>
                      </div>
                    </div>

                    {/* Missing Skills */}
                    {item.missing_skills && item.missing_skills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1 text-orange-500" />
                          Missing Skills ({item.missing_skills.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.missing_skills.slice(0, 5).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                            >
                              {skill}
                            </span>
                          ))}
                          {item.missing_skills.length > 5 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{item.missing_skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {item.suggestions && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Suggestions</h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                          <p className="text-sm text-blue-800">{item.suggestions}</p>
                        </div>
                      </div>
                    )}

                    {/* Text Previews */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Resume Preview</h4>
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 h-24 overflow-y-auto">
                          <p className="text-xs text-gray-700">{item.resume_text?.substring(0, 150)}...</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Job Description Preview</h4>
                        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 h-24 overflow-y-auto">
                          <p className="text-xs text-gray-700">{item.job_description?.substring(0, 150)}...</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="ml-6">
                    {item.resume_file_url && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={item.resume_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Resume
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default History
