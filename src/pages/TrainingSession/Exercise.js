import { useEffect, useRef, useState } from 'react'
import Set from './Set'
import React from 'react'
function Exercise(props) {
  let { serije, kompletiraniSetovi } = props

  const [brKomplSerija, setBrKomplSerija] = useState()
  const Refara = useRef()
  //pomocni brojac serija, preko njega brojimo na pocetku koliko imamo kompletiranih serija
  let brSerijaPom = 0

  useEffect(() => {
    setBrKomplSerija(brSerijaPom)
  }, [])
  function te() {
    const a = serije.map((serija, index) => {
      let pom = kompletiraniSetovi?.filter((ks) => {
        if (ks.set_id == serija._id) {
          return true
        }
      })
      let kompletiranaSerija = pom?.length > 0 ? pom[0] : null
      if (kompletiranaSerija != null) {
        brSerijaPom++
      }
      //setBrKomplSerija(5)

      return (
        <Set
          key={index}
          id={serija._id}
          odmor={serija.odmor}
          trajanje={serija.trajanje}
          ponavljanje={serija.ponavljanje}
          kompletiranaSerija={kompletiranaSerija}
        ></Set>
      )
    })

    return a
  }
  return (
    <>
      <div className='single-exercise-container'>
        {/* Header pojedinacne vezbe */}
        <div className='exercise-header'>
          <div className='exercise-name'>
            <h3>{props.imeVezbe}</h3>
          </div>
          <div className='exercise-status'>
            {brKomplSerija}/{serije.length}
          </div>
        </div>
        {/* Lista SETOVA */}
        <div className='sets-list-container' ref={Refara}>
          {te()}
        </div>
      </div>
    </>
  )
}
export default Exercise
