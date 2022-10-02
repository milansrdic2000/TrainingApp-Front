import { useEffect } from 'react'
import { useState, useRef } from 'react'

function TrainingTimeWidget({ setWorkoutTimerParent, isTrainingFinished }) {
  const [workoutTime, setWorkoutTime] = useState(0) //sekunde na tajmeru
  const [ticking, setTicking] = useState(false)

  const clockInterval = useRef()
  //iskljuci i ukljuci timer
  const triggerTimer = () => {
    setTicking(!ticking)
  }
  useEffect(() => {
    // if (isTrainingFinished()) {
    //   console.log('TimeWidget:', 'gotov trening')
    // } else {
    //   console.log('TimeWidget:', 'Nije gotov trenign')
    // }
  })
  useEffect(() => {
    console.log('workoutTime:', workoutTime)
    //stopiramo interval
    if (ticking == false) {
      setWorkoutTimerParent(workoutTime, false) //drugi argument je da je trening stopiran
      clearInterval(clockInterval.current)
      return
    }
    //Pokrecemo interval
    setWorkoutTimerParent(null, true, false) //treci argument je da li je trening kompletiran ili je samo bila pauza
    let interval = setInterval(() => {
      setWorkoutTime((workoutTime) => {
        //postavi time u roditelju
        if (isTrainingFinished()) {
          // proveravamo da li je workoutTimer isCompleted = true, a to postavljamo u completeSet
          setTicking(false)
          setWorkoutTimerParent(0, false, true)

          return 0
        }
        setWorkoutTimerParent(workoutTime + 1, true) //drugi argument je da timer radi
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
