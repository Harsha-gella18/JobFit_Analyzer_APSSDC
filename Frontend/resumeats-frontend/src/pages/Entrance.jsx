"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FileText, Target, TrendingUp, Shield, ArrowRight } from "lucide-react"

const Entrance = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block xl:inline">JOBFIT</span>{" "}
                  <span className="block text-blue-600 xl:inline">ANALYZER</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  Optimize your resume for ATS systems and increase your chances of landing your dream job. Get instant
                  feedback, missing skills analysis, and personalized suggestions.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                >
                  <div className="rounded-md shadow">
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                    >
                      Sign In
                    </Link>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center"
          >
            <div className="text-center text-white">
              <FileText className="h-24 w-24 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-2">Smart Resume Analysis</h3>
              <p className="text-blue-100">Powered by AI Technology</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-base text-blue-600 font-semibold tracking-wide uppercase"
            >
              Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              Everything you need to optimize your resume
            </motion.p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {[
                {
                  icon: Target,
                  title: "ATS Score Analysis",
                  description:
                    "Get instant compatibility scores and detailed feedback on how ATS systems will read your resume.",
                },
                {
                  icon: TrendingUp,
                  title: "Skills Gap Analysis",
                  description:
                    "Identify missing skills and keywords that could improve your chances of getting noticed.",
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  description: "Your documents are processed securely and never shared. Complete privacy guaranteed.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            <span className="block">Ready to optimize your resume?</span>
            <span className="block">Start analyzing today.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg leading-6 text-blue-200"
          >
            Join thousands of job seekers who have improved their resume compatibility with JOBFIT ANALYZER.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/signup"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto transition-all duration-200"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Entrance
