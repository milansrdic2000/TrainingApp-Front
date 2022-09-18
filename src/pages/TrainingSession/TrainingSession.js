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
  const [trainingSession, setTrainingSession] = useState({}) //glavni objekat
  const [trainingPlan, setTrainingPlan] = useState({}) //samo trening plan
  const [completedDays, setCompletedDays] = useState([]) //kompletirani dani
  const [isLoading, setIsLoading] = useState(true)

  //Vreme treninga trenutno
  const workoutTimer = useRef(0)

  const setWorkoutTimer = useCallback(
    (time, isStarted) =>
      (workoutTimer.current = { time: time, isStarted: isStarted }),
    []
  )

  const contextData = useRef()

  const { session_id } = useParams()
  useEffect(() => {
    const getTrainingSession = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/trainingsession/${session_id}`
        )
        //if (result.status === 500) throw new Exception('dada')
        const result = await response.json()

        const data = result.data
        console.log('Glavni podaci:', data)
        setTrainingSession(data)
        setTrainingPlan(data.plan_id)
        setCompletedDays(data.completedDays)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    getTrainingSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log('session render')
    console.log('Kompletirani dani:', completedDays)

    contextData.current = { completeSet } //na svaki render menjamo context data i stavljamo novu complete set funkciju
  })

  const completeSet = useCallback(
    (trainingId, setId, setValueDone, setRestDone) => {
      console.log('completeset funkcija pozvana')
      //gledamo da li je trening u toku (timer), ako nije obavestavamo korisnika
      if (!workoutTimer.current.isStarted) {
        alert('Trening nije pokrenut!')
        return
      }
      //kopiramo stejt gde nam se nalaze kompletirani dani
      const newCompletedDays = [...completedDays]
      console.log(newCompletedDays)
      //trazimo onaj set na osnovu treningId i setID i pushujemo u novi state
      newCompletedDays.forEach((elem) => {
        if (elem.training_id == trainingId) {
          elem.completedSets.push({
            set_id: setId,
            value: setValueDone,
            rest: workoutTimer.current.time,
          })
        }
      })

      setCompletedDays(newCompletedDays)
    },
    [completedDays]
  )

  // pomocne funkcije
  const getCompletedSetsForTraining = useCallback(
    (completedDays, training_id) => {
      let completedSetsForTraining = null
      completedDays.forEach((element) => {
        if (training_id == element.training_id) {
          completedSetsForTraining = element.completedSets
        }
      })

      return completedSetsForTraining
    },
    []
  )
  const getCompletedSetsForExercise = useCallback(
    (exercise, completedSetsForTraining) => {
      const completedSetsForExercise = []
      exercise.sets?.forEach((set) => {
        completedSetsForTraining?.forEach((complSet) => {
          //trazimo kompletiranu seriju iz liste kompletiranih koja odgovara elem.sets
          if (complSet.set_id === set._id) {
            set.completionInfo = complSet // ovde dodajemo informacije vec postojecem setu
            completedSetsForExercise.push(complSet)

            return
          }
        })
      })
      return completedSetsForExercise
    },
    []
  )
  // let nextSetToDo = null //referenca na seriju koja treba da se radi sledece
  // const { days } = trainingPlan

  // days?.forEach((day, index) => {
  //   let setsPerTrainingCounter = 0 //koliko ukupno, po planu, imamo serija da odradimo
  //   console.log(day)
  //   // trening id koji se radi taj dan
  //   const training_id = day.training?._id

  //   // odredjujemo za svaki trening, koje kompletirane serije da mu dodelimo.
  //   let completedSetsForTraining = getCompletedSetsForTraining(
  //     completedDays,
  //     training_id
  //   )

  //   //Ako se trenira taj dan
  //   if (!day.restingDay) {
  //     let exercises = day.training?.exercises //idemo po vezbama za odredjeni trening
  //     exercises?.forEach((elem) => {
  //       setsPerTrainingCounter += elem.sets.length //brojimo setove svake vezbe za ceo trening

  //       let completedSetsForExercise = []

  //       completedSetsForExercise = getCompletedSetsForExercise(
  //         elem,
  //         completedSetsForTraining
  //       )

  //       // odredjivanje da li je set kompletiran
  //       elem.sets?.forEach((set) => {
  //         //da li je set onaj koji treba sledeci da se radi
  //         if (!set.completionInfo && !nextSetToDo) {
  //           nextSetToDo = set
  //           set.nextSetToDo = true
  //         } else {
  //           set.nextSetToDo = false
  //         }
  //       })
  //       elem.completedSetsForExercise = completedSetsForExercise //dodeljujemo objektu vezbe informacije o kompletiranim serijama
  //     })

  //     day.setsPerTrainingCounter = setsPerTrainingCounter
  //   }
  // })

  return (
    <main className='training-session-main'>
      {isLoading ? (
        <div>Loaduje se</div>
      ) : (
        <React.Fragment>
          <TrainingHeader ime={trainingPlan.planName}></TrainingHeader>
          <TrainingContext.Provider value={contextData}>
            <TrainingList
              trainingPlan={trainingPlan}
              completedDays={completedDays}
              getCompletedSetsForTraining={getCompletedSetsForTraining}
              getCompletedSetsForExercise={getCompletedSetsForExercise}
              // completeSet={completeSet}
            ></TrainingList>
          </TrainingContext.Provider>
          <TrainingTimeWidget
            setWorkoutTimerParent={setWorkoutTimer} //pozivanjem ove funkcije, timewidget menja timer u parent komponenti
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
        </React.Fragment>
      )}
    </main>
  )
}
export { TrainingSession, TrainingContext }
