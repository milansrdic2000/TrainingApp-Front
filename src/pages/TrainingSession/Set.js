import { useState } from 'react'

function Set(props) {
  let { trajanje, ponavljanje } = props

  // da li je serija kompletirana ili ne
  const [kompletirano, setKompletirano] = useState(
    props.kompletiranaSerija != null
  )
  //da li je vremenska serija ili serija na ponavljanja
  const [vremenskaSerija, setVremenskaSerija] = useState(
    !(trajanje == undefined)
  )

  //za vrednost input polja
  const [serijaVrednost, setSerijaVrednost] = useState(
    kompletirano ? (vremenskaSerija ? trajanje : ponavljanje) : ''
  )
  return (
    <>
      {/* pojedinacan set kontejner */}
      <div className='single-set-container'>
        {/* Indikator kompletnosti */}
        <div
          className={`completion-set-indicator
        ${kompletirano ? 'set-completed-indicator' : ''}
        `}
        ></div>
        {/* Input polje */}
        <input
          type='text'
          className='set-repetition-number-input'
          placeholder={vremenskaSerija ? 'Vreme' : 'broj ponavljanja'}
          value={serijaVrednost}
          onChange={(e) => {
            setSerijaVrednost(e.target.value)
          }}
        />
        {/* Dugme za kompletiranje */}
        {!kompletirano ? <button>Kompletiraj</button> : ''}
        {trajanje && <span className='set-goal set-time'>{trajanje}sec</span>}
        {ponavljanje && (
          <span className='set-goal set-reps'>{ponavljanje}kom</span>
        )}
      </div>
    </>
  )
}
export default Set
