
import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, FileText, Briefcase, Target, CheckCircle, AlertCircle, User } from "lucide-react"
import { Link } from "react-router-dom"
import api from "../utils/api"
import { getUserEmail } from "../utils/auth"
import toast from "react-hot-toast"

const Dashboard = () => {
  const [resumeFile, setResumeFile] = useState(null)
  const [jdFile, setJdFile] = useState(null)
  const [jdText, setJdText] = useState("")
  const [useTextInput, setUseTextInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const userEmail = getUserEmail()

  const handleResumeUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      setResumeFile(file)
    } else {
      toast.error("Please upload a PDF file")
    }
  }

  const handleJdUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      setJdFile(file)
    } else {
      toast.error("Please upload a PDF file")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!resumeFile) {
      toast.error("Please upload a resume")
      return
    }

    if (!useTextInput && !jdFile) {
      toast.error("Please upload a job description or use text input")
      return
    }

    if (useTextInput && !jdText.trim()) {
      toast.error("Please enter job description text")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("resume", resumeFile)

      if (useTextInput) {
        formData.append("job_description_text", jdText)
      } else {
        formData.append("job_description", jdFile)
      }

      const response = await api.post("/api/history/resume-score/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setResult(response.data)
      toast.success("Resume scored successfully!")
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setResumeFile(null)
    setJdFile(null)
    setJdText("")
    setResult(null)
    setUseTextInput(false)
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Header with user info */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume ATS Scorer</h1>
            <p className="text-gray-600">Upload your resume and job description to get an ATS compatibility score</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Welcome back,</p>
              <p className="text-sm font-medium text-gray-900">{userEmail}</p>
            </div>
            <Link
              to="/profile"
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-blue-600" />
              Upload Documents
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume (PDF) *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    {resumeFile ? (
                      <p className="text-sm text-green-600 font-medium">{resumeFile.name}</p>
                    ) : (
                      <p className="text-sm text-gray-600">Click to upload resume</p>
                    )}
                  </label>
                </div>
              </div>

              {/* Job Description Input Toggle */}
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setUseTextInput(false)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      !useTextInput
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                  >
                    Upload PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseTextInput(true)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      useTextInput
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                  >
                    Paste Text
                  </button>
                </div>

                {useTextInput ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description Text *</label>
                    <textarea
                      value={jdText}
                      onChange={(e) => setJdText(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Paste the job description here..."
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description (PDF) *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input type="file" accept=".pdf" onChange={handleJdUpload} className="hidden" id="jd-upload" />
                      <label htmlFor="jd-upload" className="cursor-pointer">
                        <Briefcase className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        {jdFile ? (
                          <p className="text-sm text-green-600 font-medium">{jdFile.name}</p>
                        ) : (
                          <p className="text-sm text-gray-600">Click to upload job description</p>
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Score Resume
                    </>
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Results
            </h2>

            {result ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Score */}
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold ${
                      result.score >= 80
                        ? "bg-green-100 text-green-800"
                        : result.score >= 60
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.score}%
                  </div>
                  <p className="mt-2 text-sm text-gray-600">ATS Compatibility Score</p>
                </div>

                {/* Missing Skills */}
                {result.missing_skills && result.missing_skills.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1 text-orange-500" />
                      Missing Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {result.suggestions && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Suggestions</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <p className="text-sm text-blue-800">{result.suggestions}</p>
                    </div>
                  </div>
                )}

                {/* Extracted Text Preview */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Resume Text (Preview)</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3 max-h-32 overflow-y-auto">
                      <p className="text-xs text-gray-700">{result.resume_text?.substring(0, 200)}...</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Job Description (Preview)</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3 max-h-32 overflow-y-auto">
                      <p className="text-xs text-gray-700">{result.job_description?.substring(0, 200)}...</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Upload your documents and click "Score Resume" to see results</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
