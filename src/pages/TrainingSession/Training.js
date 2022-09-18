import Exercise from './Exercise'
import { useContext, useEffect } from 'react'
import { TrainingContext } from './TrainingSession'
import React from 'react'
function Training({
  dayIndex,
  restingDay,
  exercises,
  training_id,
  isCompleted,
}) {
  useEffect(() => {
    console.log('training render')
  })

  return (
    <>
      <div className='single-training-container'>
        {/* Heder treninga  */}
        <div className='training-header'>
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

            return (
              <Exercise
                key={index}
                exercise_id={exercisePopulated._id}
                exerciseName={exercisePopulated.exerciseName}
                sets={exercise.sets}
                completedSetsForExercise={exercise.completedSetsForExercise} //kompletirane serije za svaku vezbu
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
