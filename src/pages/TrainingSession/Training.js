import Exercise from './Exercise'
import { useContext, useEffect, useCallback } from 'react'
import { TrainingContext } from './TrainingSession'
import React from 'react'
function Training({
  dayIndex,
  restingDay,
  exercises,
  training_id,
  isCompleted,
  completedSetsForTraining,
  isNextTraining,
}) {
  //const { current: contextData } = useContext(TrainingContext)

  useEffect(() => {
    console.log('training render')
  })
  // dobijamo listu kompletiranih serija za vezbu posebnu
  const getCompletedSetsForExercise = useCallback(
    (exercise, completedSetsForTraining) => {
      const completedSetsForExercise = []
      exercise.sets?.forEach((set) => {
        completedSetsForTraining?.forEach((complSet) => {
          //trazimo kompletiranu seriju iz liste kompletiranih koja odgovara elem.sets
          if (complSet.set_id === set._id) {
            // set.completionInfo = complSet // ovde dodajemo informacije vec postojecem setu
            completedSetsForExercise.push(complSet)

            return
          }
        })
      })
      return completedSetsForExercise
    },
    []
  )
  return (
    <>
      <div
        className={`single-training-container ${
          isNextTraining ? 'next-training-to-do' : ''
        }`}
      >
        {/* Heder treninga  */}
        <div
          className='training-header'
          onClick={(e) => {
            // const { completeSet, nextSetToDo, state } = contextData
            // console.log('training completeddays', state)
            // console.log('training completeddays', contextData.state)
            // completeSet()
          }}
        >
          <div className='training-name'>
            <h2>
              Dan {dayIndex}
              {restingDay ? ' - odmor' : ''}
            </h2>
          </div>
          <div className='training-status'>
            {isCompleted ? 'Completed' : 'Incompleted'}
          </div>
        </div>
        {/* Lista vezbi */}
        <div className='exercises-list-container'>
          {/* Pojedinacna vezba */}
          {exercises?.map((exercise, index) => {
            //exercise_id zbog populate sada sadrzi informacije
            const exercisePopulated = exercise.exercise_id
            let completedSetsForExercise = getCompletedSetsForExercise(
              exercise,
              completedSetsForTraining
            )
            return (
              <Exercise
                key={exercisePopulated._id}
                exercise_id={exercisePopulated._id}
                exerciseName={exercisePopulated.exerciseName}
                sets={exercise.sets}
                completedSetsForExercise={completedSetsForExercise} //kompletirane serije za svaku vezbu
                training_id={training_id}
              ></Exercise>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Training
