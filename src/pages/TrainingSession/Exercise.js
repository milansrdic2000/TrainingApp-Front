import { useEffect, useRef, useState, useContext } from 'react'
import { TrainingContext } from './TrainingSession'
import Set from './Set'
import React from 'react'
function Exercise({
  sets,
  completedSetsForExercise,
  training_id,
  exerciseName,
}) {
  useEffect(() => {
    console.log('exercise render')
  })
  const getContextData = useContext(TrainingContext)

  return (
    <>
      <div className='single-exercise-container'>
        {/* Header pojedinacne vezbe */}
        <div className='exercise-header' onClick={(e) => {}}>
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
            //trazimo kompletiranu seriju iz liste kompletiranih koja odgovara elem.sets
            let completionInfo
            completedSetsForExercise?.forEach((complSet) => {
              if (complSet.set_id === set._id) {
                completionInfo = complSet // ovde dodajemo informacije vec postojecem setu

                return
              }
            })
            return (
              <Set
                key={set._id}
                set_id={set._id}
                rest={set.rest}
                setGoal={set.setGoal}
                setType={set.setType}
                completed={!(completionInfo == undefined)} //boolean
                completionInfo={completionInfo}
                training_id={training_id}
                nextSetToDo={getContextData('nextSetToDo')._id === set._id}
                getContextData={getContextData}
              ></Set>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Exercise
