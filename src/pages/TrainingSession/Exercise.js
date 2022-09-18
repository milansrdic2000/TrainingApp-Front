import { useEffect, useRef, useState } from 'react'
import Set from './Set'
import React from 'react'
function Exercise({
  sets,
  completedSetsForExercise,
  training_id,
  exerciseName,
  nextSetToDo,
}) {
  useEffect(() => {
    console.log('exercise render')
  })

  return (
    <>
      <div className='single-exercise-container'>
        {/* Header pojedinacne vezbe */}
        <div className='exercise-header'>
          <div className='exercise-name'>
            <h3>{exerciseName}</h3>
          </div>
          <div className='exercise-status'>
            {completedSetsForExercise.length}/{sets?.length}
          </div>
        </div>
        {/* Lista SETOVA */}
        <div className='sets-list-container'>
          {sets.map((set, index) => {
            return (
              <Set
                key={index}
                set_id={set._id}
                rest={set.rest}
                setGoal={set.setGoal}
                setType={set.setType}
                completed={!(set.completionInfo == undefined)} //boolean
                completionInfo={set.completionInfo}
                training_id={training_id}
                nextSetToDo={set.nextSetToDo}
              ></Set>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Exercise
