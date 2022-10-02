import React, { useEffect, useState, useRef, useContext } from 'react'
import TrainingHeader from './TrainingHeader'
import '../../style/css/TrainingSession/trainingsession.css'
import TrainingList from './TrainingList'
import TrainingTimeWidget from './TrainingTimeWidget'

import { useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { Exception } from 'sass'

const TrainingContext = React.createContext(null)

function TrainingSession(props) {
  console.log('RERENDER SE DESIO')
  // const [trainingSession, setTrainingSession] = useState({}) //glavni objekat
  const [trainingPlan, setTrainingPlan] = useState({}) //samo trening plan
  const [completedDays, setCompletedDays] = useState([]) //kompletirani dani
  const [isLoading, setIsLoading] = useState(true)

  const contextData = useRef({})
  const workoutTimer = useRef({})

  const { session_id } = useParams()

  // *** USE EFFECT ***
  useEffect(() => {
    workoutTimer.current.previousCompletedSetTime = 0 //default
    workoutTimer.current.isCompleted = false
    const getTrainingSession = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/trainingsession/${session_id}`
        )
        //if (result.status === 500) throw new Exception('dada')
        const result = await response.json()

        const data = result.data
        console.log('Glavni podaci:', data)
        // setTrainingSession(data)
        setTrainingPlan(data.plan_id)
        setCompletedDays(data.completedDays)

        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    getTrainingSession()
  }, [])
  useEffect(() => {
    // console.log('Kompletirani dani useefect glavni:', completedDays)
  })
  // *** FUNKCIJE ZA CHILD COMPONENTE ***
  const completeSet = useCallback(
    (trainingId, setId, setValueDone, setRestDone) => {
      // console.log('completeset funkcija pozvana')
      // console.log(completedDays)

      const prevSetComplTime = workoutTimer.current.previousCompletedSetTime // iz timera dobijamo kad je kompletirana prethodna serija
      const workTime = workoutTimer.current.time //iz timera dobijamo trenutno vreme treninga

      //gledamo da li je trening u toku (timer), ako nije obavestavamo korisnika
      if (!workoutTimer.current.isStarted) {
        alert('Trening nije pokrenut!')
        return
      }
      // gledamo da li je kompletirana serija iz trenutno aktivnog treninga
      if (contextData.current.nextTraining._id !== trainingId) {
        alert('Ovaj trening nije pokrenut!')
        return
      }
      //da li kompletiramo seriju koja je sledeca na redu ili neku random
      if (contextData.current.nextSetToDo._id !== setId) {
        alert('Ne smete preskakati serije!')
        return
      }

      //kopiramo stejt gde nam se nalaze kompletirani dani
      // const newCompletedDays = [...completedDays]
      const newCompletedDays = completedDays.map((completedDay, index) => {
        return {
          ...completedDay,
          completedSets: completedDay.completedSets.map(
            (completedSet, index) => {
              return {
                ...completedSet,
              }
            }
          ),
        }
      })

      // console.log('obj asign:', test)
      console.log('completedDays pre kopiranja', completedDays)
      console.log('newCompletedDays kopiranja', newCompletedDays)

      //trazimo onaj set na osnovu treningId i setID i pushujemo u novi state
      let isNewTraining = true
      newCompletedDays.forEach((elem) => {
        if (elem.training_id == trainingId) {
          isNewTraining = false // vec imamo ovaj trening zapocet, samo dodajemo seriju na niz
          elem.completedSets.push({
            set_id: setId,
            value: setValueDone,
            rest: workTime - prevSetComplTime,
          })
          // da li je kompletiran trening
          if (
            contextData.current.setsForNextTrainingCounter ===
            elem.completedSets.length
          ) {
            elem.trainingTime = workTime
            alert(`Kompletiran trening!
            Trajanje:${workoutTimer.current.time}`)
            workoutTimer.current.isCompleted = true
          }
          return
        }
      })
      if (isNewTraining) {
        console.log('novi trening!')
        newCompletedDays.push({
          training_id: trainingId,
          completedSets: [
            {
              set_id: setId,
              value: setValueDone,
              rest: workTime - prevSetComplTime,
            },
          ],
          trainingTime: workoutTimer.current.time,
        })
      }
      // newCompletedDays[0].completedSets[0].value = 999
      // if (
      //   newCompletedDays[0].completedSets[0].rest ===
      //   completedDays[0].completedSets[0].rest
      // ) {
      //   console.log('JEDNAKI SU')
      // } else {
      //   console.log('NISU JEDNAKi')
      // }

      // console.log('obj asign na kraju:', test)
      workoutTimer.current.previousCompletedSetTime = workTime
      setCompletedDays(newCompletedDays)
    },
    [completedDays]
  )

  contextData.current.completeSet = completeSet //na svaki render menjamo context data i stavljamo novu complete set funkciju
  //Vreme treninga trenutno

  // Ovo saljemo u timer komponentu kao prop, da bi dobili vreme treninga
  const setWorkoutTimer = useCallback((time, isStarted, isCompleted) => {
    if (time !== null) {
      workoutTimer.current.time = time
      //Ako resetujemo timer, tj prosledjujemo mu time na 0, onda moramo resetovati i previousCompletedSetTime
      if (time === 0) {
        workoutTimer.current.previousCompletedSetTime = 0
      }
    }
    if (isStarted !== undefined) workoutTimer.current.isStarted = isStarted
    if (isCompleted !== undefined) {
      workoutTimer.current.isCompleted = isCompleted // pokrecemo novi trening ako je startNew parametar True
    }
  }, [])
  const isTrainingFinished = useCallback(() => {
    return workoutTimer.current.isCompleted
  }, [])

  //setter za prvi slobodni set koji pozivamo u trening list
  const setNextSetToDo = useCallback((set) => {
    contextData.current.nextSetToDo = set
  }, [])
  //setter za naredni trening koji se radi
  const setNextTraining = useCallback(
    (training, setsForNextTrainingCounter) => {
      contextData.current.nextTraining = training
      contextData.current.setsForNextTrainingCounter =
        setsForNextTrainingCounter
    },
    []
  )

  // funkcija koju prosledjujemo u context i koja prima kao parametar ime propertija iz objekta current
  const getContextData = useCallback((propertyName) => {
    return contextData.current[propertyName]
  }, [])

  return (
    <main className='training-session-main'>
      {isLoading ? (
        <div>Loaduje se</div>
      ) : (
        <React.Fragment>
          <TrainingHeader ime={trainingPlan.planName + 'dada'}></TrainingHeader>
          <TrainingContext.Provider value={getContextData}>
            <TrainingList
              trainingPlan={trainingPlan}
              completedDays={completedDays}
              setNextSetToDo={setNextSetToDo}
              setNextTraining={setNextTraining}
            ></TrainingList>
          </TrainingContext.Provider>
          <TrainingTimeWidget
            setWorkoutTimerParent={setWorkoutTimer} //pozivanjem ove funkcije, timewidget menja timer u parent komponenti
            isTrainingFinished={isTrainingFinished}
          ></TrainingTimeWidget>
          <div
            onClick={() => {
              console.log(workoutTimer)
            }}
            style={{
              padding: '10px',
              backgroundColor: 'pink',
              display: 'inline-block',
              cursor: 'pointer',
              marginBottom: '20px',
              marginTop: '20px',
            }}
          >
            check time
          </div>
          <div
            onClick={() => {
              console.log('contextdata  u mainu', contextData.current)
            }}
            style={{
              padding: '10px',
              backgroundColor: 'pink',
              display: 'inline-block',
              cursor: 'pointer',
              marginBottom: '20px',
              marginTop: '20px',
            }}
          >
            check context data
          </div>
        </React.Fragment>
      )}
    </main>
  )
}
export { TrainingSession, TrainingContext }
