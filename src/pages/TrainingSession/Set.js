import { useState, useContext, useEffect } from 'react'
import { TrainingContext } from './TrainingSession'
import React from 'react'
import { Exception } from 'sass'
import { useRef } from 'react'

function Set({
  set_id,
  setType,
  rest,
  setGoal,
  completed,
  completionInfo,
  training_id,
  nextSetToDo,
  getContextData,
}) {
  if (set_id == '630c6c9693bb7fb4a470c49c')
    console.log('ja sam set, moj value:', completionInfo?.value)

  const completeSet = getContextData('completeSet')

  //vrednost input polja gde
  // const [inputValue, setInputValue] = useState(
  //   completionInfo ? completionInfo.value : ''
  // )
  const inputRef = useRef(null)
  if (inputRef.current) {
    if (completionInfo?.value) inputRef.current.value = completionInfo?.value
  }

  useEffect(() => {
    console.log('sets render')
  })
  const inputHandler = (e) => {
    // if (!completed) {
    //   setInputValue(e.target.value)
    // }
  }
  return (
    <>
      {/* pojedinacan set kontejner */}
      <div
        className={`single-set-container ${
          nextSetToDo === true ? 'next-set-to-do' : ''
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
          ref={inputRef}
          type='text'
          className='set-repetition-number-input'
          placeholder={setType == 'time' ? 'Vreme' : 'broj ponavljanja'}
          // value={completed ? inputValue : inputValue}
          // value={completionInfo ? completionInfo.value : ''}
          defaultValue={completionInfo ? completionInfo.value : ''}
          // onChange={inputHandler}
        />
        {/* Dugme za kompletiranje */}
        {!completed ? (
          <button
            onClick={(e) => {
              let inputValue = inputRef.current.value
              console.log(inputValue)
              if (inputValue === '') {
                alert('Morate uneti vrednost serije')
                return
              }

              let inputResolved = parseInt(inputValue)
              if (isNaN(inputResolved)) {
                alert('Morate uneti brojnu vrednost!')
                return
              }
              completeSet(training_id, set_id, inputResolved)
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
  // return false
  if (prevProp?.set_id == '630c6c9693bb7fb4a470c49c') {
    console.log('prosliProp', prevProp.completionInfo?.value)
    console.log('nextPRop', nextProp.completionInfo?.value)
  }
  if (
    prevProp.completed === nextProp.completed &&
    prevProp.nextSetToDo === nextProp.nextSetToDo &&
    prevProp.completionInfo?.value === nextProp.completionInfo?.value
  ) {
    return true
  }
  return false
}
export default React.memo(Set, areEqual)
// export default Set
