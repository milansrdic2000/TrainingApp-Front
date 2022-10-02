import Training from './Training'
import { TrainingContext } from './TrainingSession'
import { useContext, useEffect, useCallback } from 'react'
import React from 'react'
function TrainingList({
  trainingPlan,
  completedDays,
  setNextSetToDo,
  setNextTraining,
}) {
  const { days } = trainingPlan

  useEffect(() => {
    console.log('tlist useeffect')
  })
  // iz completedDays uzimamo onaj element niza koji odgovara trening ID-ju
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
  let nextSetToDo = null //referenca na seriju koja treba da se radi sledece
  let nextTraining = null
  return (
    <>
      <section className='training-list-container'>
        {/* Mapiramo svaki dan u jedan Training */}
        {days.map((day, index) => {
          let isCompleted = false
          let setsPerTrainingCounter = 0 //

          // trening id koji se radi taj dan
          const training_id = day.training?._id

          // odredjujemo za svaki trening, koje kompletirane serije da mu dodelimo.
          let completedSetsForTraining = getCompletedSetsForTraining(
            completedDays,
            training_id
          )

          //Ako se trenira taj dan
          if (!day.restingDay) {
            let exercises = day.training?.exercises //idemo po vezbama za odredjeni trening
            exercises?.forEach((exerc) => {
              setsPerTrainingCounter += exerc.sets.length //brojimo setove svake vezbe za ceo trening

              // odredjivanje da li je set kompletiran
              exerc.sets?.forEach((set) => {
                if (nextSetToDo) return //Ako smo izracunali vec koji nam je nextSet, svaki sledeci ce automatski biti nekompletiran
                let isCompleted = false
                completedSetsForTraining?.forEach((complSet) => {
                  //trazimo kompletiranu seriju iz liste kompletiranih koja odgovara elem.sets
                  if (complSet.set_id === set._id) {
                    isCompleted = true
                    return
                  }
                })
                if (!isCompleted && !nextSetToDo) {
                  nextSetToDo = set
                  setNextSetToDo(set) //za roditelja
                }
              })
            })
            // da li je trening kompletiran, poredimo setove u treningu sa brojem kompletiranih setova
            isCompleted =
              setsPerTrainingCounter === completedSetsForTraining?.length

            //prvi trening koji nije kompletiran, je nas aktivan trening
            if (!nextTraining && !isCompleted) {
              nextTraining = day.training
              setNextTraining(day.training, setsPerTrainingCounter)
            }
          }

          return (
            <Training
              key={day._id}
              training_id={training_id}
              dayIndex={index + 1} // redni broj dana
              restingDay={day.restingDay} //da li se odmara taj dan
              exercises={!day.restingDay ? day.training?.exercises : []}
              completedSetsForTraining={completedSetsForTraining}
              isCompleted={isCompleted} // da li je trening kompletiran
              isNextTraining={nextTraining?._id === training_id}
            ></Training>
          )
        })}
      </section>
    </>
  )
}

export default TrainingList
