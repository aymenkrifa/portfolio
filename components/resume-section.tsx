'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

export default function ResumeSection() {
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
          setMessage('')
        }, 3000)
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
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
          Get Resume
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Enter your email to receive my resume
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="w-full px-3 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100
                   placeholder-zinc-500 dark:placeholder-zinc-400 rounded-lg
                   hover:bg-zinc-200 dark:hover:bg-zinc-700
                   focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-0
                   transition-colors duration-200"
          disabled={isLoading}
          required
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs p-2 rounded-lg text-center ${
              isSuccess 
                ? 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/20' 
                : 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20'
            }`}
          >
            {message}
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
