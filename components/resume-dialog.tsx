'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { createPortal } from 'react-dom'

export default function ResumeDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      setIsSuccess(false)
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/send-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Resume sent! Check your email.')
        setIsSuccess(true)
        setEmail('')
        setTimeout(() => {
          setIsOpen(false)
          setMessage('')
        }, 2000)
      } else {
        setMessage(data.error || 'Failed to send resume')
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 
                   bg-zinc-900 dark:bg-zinc-100 rounded-lg
                   hover:bg-zinc-800 dark:hover:bg-zinc-200
                   focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-2
                   transition-colors duration-200"
      >
        Get Resume
      </button>

      {/* Dialog */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Dialog Content */}
              <motion.div
                className="relative w-full max-w-sm mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800"
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.15 }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                        Get Resume
                      </h2>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Enter your email to receive my resume
                      </p>
                    </div>

                    {/* Email Input */}
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg 
                               bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100
                               placeholder-zinc-500 dark:placeholder-zinc-400
                               focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-0
                               transition-all duration-200"
                      disabled={isLoading}
                      required
                      autoFocus
                    />

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full px-3 py-2 text-sm font-medium text-white dark:text-zinc-900 
                               bg-zinc-900 dark:bg-zinc-100 rounded-lg
                               hover:bg-zinc-800 dark:hover:bg-zinc-200
                               disabled:opacity-50 disabled:cursor-not-allowed
                               focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-0
                               transition-colors duration-200"
                    >
                      {isLoading ? 'Sending...' : 'Send Resume'}
                    </button>

                    {/* Message */}
                    {message && (
                      <div 
                        className={`text-xs p-3 rounded-lg ${
                          isSuccess 
                            ? 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                            : 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                        }`}
                      >
                        {message}
                      </div>
                    )}
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
