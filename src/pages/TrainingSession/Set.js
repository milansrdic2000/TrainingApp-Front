import { useState, useContext, useEffect } from 'react'
import { TrainingContext } from './TrainingSession'
import React from 'react'
function Set({
  set_id,
  setType,
  rest,
  setGoal,
  completed,
  completionInfo,
  training_id,
  nextSetToDo,
}) {
  const { current: contextData } = useContext(TrainingContext)
  const { completeSet } = contextData

  //vrednost input polja gde
  const [inputValue, setInputValue] = useState(
    completionInfo ? completionInfo.value : ''
  )
  useEffect(() => {
    console.log('sets render')
  })
  const inputHandler = (e) => {
    if (!completed) {
      setInputValue(e.target.value)
    }
  }
  return (
    <>
      {/* pojedinacan set kontejner */}
      <div
        className={`single-set-container ${
          nextSetToDo ? 'next-set-to-do' : ''
        }`}
      >
        {/* Indikator kompletnosti */}
        <div
          className={`completion-set-indicator
        ${completed ? 'set-completed-indicator' : ''}
        `}
        ></div>
        {/* Input polje */}
        <input
          type='text'
          className='set-repetition-number-input'
          placeholder={setType == 'time' ? 'Vreme' : 'broj ponavljanja'}
          value={completed ? inputValue : inputValue}
          onChange={inputHandler}
        />
        {/* Dugme za kompletiranje */}
        {!completed ? (
          <button
            onClick={(e) => {
              if (inputValue === '') {
                alert('Morate uneti vrednost serije')
                return
              }
              if (!nextSetToDo) {
                alert('Ne mozete preskakati serije!')
                return
              }
              completeSet(training_id, set_id, inputValue)

              // rokBa.current(training_id, set_id, inputValue)
            }}
          >
            Kompletiraj
          </button>
        ) : (
          ''
        )}
        {setType == 'time' && (
          <span className='set-goal set-time'>{setGoal}sec</span>
        )}
        {setType == 'repetition' && (
          <span className='set-goal set-reps'>{setGoal}kom</span>
        )}
        {/* Ovo refaktorisati  */}
      </div>
    </>
  )
}

function areEqual(prevProp, nextProp) {
  // console.log('prevProp:')
  // console.log(prevProp)
  // console.log('nextProp')
  // console.log(nextProp)
  if (
    prevProp.completed === nextProp.completed &&
    prevProp.nextSetToDo === nextProp.nextSetToDo
  ) {
    return true
  }
  return false
}
export default React.memo(Set, areEqual)
