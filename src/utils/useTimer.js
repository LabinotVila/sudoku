import { useState, useRef } from 'react';

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef(null)

  const handleStart = () => {
    setIsPaused(false)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    clearInterval(countRef.current)
    setIsPaused(true)
  }

  const handleResume = () => {
    setIsPaused(false)
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(countRef.current)
    setIsPaused(true)
    setTimer(0)
  }

  return { timer, isPaused, handleStart, handlePause, handleResume, handleReset }
}

export default useTimer