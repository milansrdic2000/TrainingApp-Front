import Training from './Training'
import { TrainingContext } from './TrainingSession'
import { useContext, useEffect } from 'react'
import React from 'react'
function TrainingList({
  trainingPlan,
  completedDays,
  getCompletedSetsForTraining,
  getCompletedSetsForExercise,
  completeSet,
}) {
  const { days } = trainingPlan

  useEffect(() => {
    console.log('tlist render')
  })

  let nextSetToDo = null //referenca na seriju koja treba da se radi sledece
  return (
    <>
      <section className='training-list-container'>
        {/* Mapiramo svaki dan u jedan Training */}
        {days.map((day, index) => {
          let setsPerTrainingCounter = 0 //
          console.log(day)
          // trening id koji se radi taj dan
          const training_id = day.training?._id

          // odredjujemo za svaki trening, koje kompletirane serije da mu dodelimo.
          let completedSetsForTraining = getCompletedSetsForTraining(
            completedDays,
            training_id
          )
          // completedDays.forEach((element) => {
          //   if (training_id == element.training_id) {
          //     completedSetsForTraining = element.completedSets
          //   }
          // })

          //Ako se trenira taj dan
          if (!day.restingDay) {
            let exercises = day.training?.exercises //idemo po vezbama za odredjeni trening
            exercises?.forEach((elem) => {
              setsPerTrainingCounter += elem.sets.length //brojimo setove svake vezbe za ceo trening

              let completedSetsForExercise = []

              completedSetsForExercise = getCompletedSetsForExercise(
                elem,
                completedSetsForTraining
              )

              // odredjivanje da li je set kompletiran
              elem.sets?.forEach((set) => {
                // completedSetsForTraining?.forEach((complSet) => {
                //   //trazimo kompletiranu seriju iz liste kompletiranih koja odgovara elem.sets
                //   if (complSet.set_id === set._id) {
                //     set.completionInfo = complSet // ovde dodajemo informacije vec postojecem setu
                //     completedSetsForExercise.push(complSet)

                //     return
                //   }
                // })

                //da li je set onaj koji treba sledeci da se radi
                if (!set.completionInfo && !nextSetToDo) {
                  nextSetToDo = set
                  set.nextSetToDo = true
                } else {
                  set.nextSetToDo = false
                }
              })
              elem.completedSetsForExercise = completedSetsForExercise //dodeljujemo objektu vezbe informacije o kompletiranim serijama
            })
          }

          return (
            <Training
              key={index}
              training_id={training_id}
              dayIndex={index + 1} // redni broj dana
              restingDay={day.restingDay} //da li se odmara taj dan
              exercises={!day.rest ? day.training?.exercises : []}
              completedSetsForTraining={completedSetsForTraining}
              isCompleted={
                setsPerTrainingCounter === completedSetsForTraining?.length
              }
            ></Training>
          )
        })}
      </section>
    </>
  )
}

export default TrainingList
