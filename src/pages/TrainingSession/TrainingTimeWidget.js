import { useEffect } from 'react'
import { useState, useRef } from 'react'

function TrainingTimeWidget({ setWorkoutTimerParent }) {
  const [workoutTime, setWorkoutTime] = useState(0)
  const [ticking, setTicking] = useState(false)
  const clockInterval = useRef()
  //iskljuci i ukljuci timer
  const triggerTimer = () => {
    setTicking(!ticking)
  }
  useEffect(() => {
    console.log('workoutTime:', workoutTime)
    //stopiramo interval
    if (ticking == false) {
      setWorkoutTimerParent(workoutTime, false)
      clearInterval(clockInterval.current)
      return
    }
    let interval = setInterval(() => {
      setWorkoutTime((workoutTime) => {
        //postavi time u roditelju
        setWorkoutTimerParent(workoutTime + 1, true)
        return workoutTime + 1
      })
    }, 1000)
    clockInterval.current = interval
  }, [ticking, setWorkoutTimerParent])
  return (
    <>
      <div className='time-widget'>
        <span>{workoutTime} sekundi</span>
        <button onClick={triggerTimer}>{ticking ? 'Stop' : 'Start'}</button>
      </div>
    </>
  )
}
export default TrainingTimeWidget
