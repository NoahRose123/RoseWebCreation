'use client'

import { useState, useEffect } from 'react'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set end date to end of current week (Sunday)
    const now = new Date()
    const endOfWeek = new Date(now)
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()))
    endOfWeek.setHours(23, 59, 59, 999)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endOfWeek.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="inline-flex items-center space-x-2 ml-4">
      <span className="text-sm">Ends in:</span>
      <div className="flex space-x-1">
        <div className="bg-black/30 px-2 py-1 rounded text-sm font-bold">
          {timeLeft.days.toString().padStart(2, '0')}
        </div>
        <span className="text-sm">d</span>
        <div className="bg-black/30 px-2 py-1 rounded text-sm font-bold">
          {timeLeft.hours.toString().padStart(2, '0')}
        </div>
        <span className="text-sm">h</span>
        <div className="bg-black/30 px-2 py-1 rounded text-sm font-bold">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </div>
        <span className="text-sm">m</span>
        <div className="bg-black/30 px-2 py-1 rounded text-sm font-bold">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </div>
        <span className="text-sm">s</span>
      </div>
    </div>
  )
}
