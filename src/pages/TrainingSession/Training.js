import Exercise from './Exercise'

function Training(props) {
  //dobijamo kompletirane setove u tom treningu
  const kompletiraniSetovi = props.kompletiraniTrening?.completedSets

  return (
    <>
      <div className='single-training-container'>
        {/* Heder treninga  */}
        <div className='training-header'>
          <div className='training-name'>
            <h2>
              Dan {props.brojDana}
              {props.odmor ? ' - odmor' : ''}
            </h2>
          </div>
          <div className='training-status'>incomplete</div>
        </div>
        {/* Lista vezbi */}
        <div className='exercises-list-container'>
          {/* Pojedinacna vezba */}
          {props.vezbe.map((vezba, index) => {
            return (
              <Exercise
                key={index}
                id={vezba.vezba_id._id}
                imeVezbe={vezba.vezba_id.imeVezbe}
                serije={vezba.serije}
                kompletiraniSetovi={kompletiraniSetovi}
              ></Exercise>
            )
          })}
        </div>
      </div>
    </>
  )
}
export default Training
