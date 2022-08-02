import Training from './Training'

function TrainingList(props) {
  return (
    <>
      <section className='training-list-container'>
        {/* Mapiramo svaki dan u jedan Training */}
        {props.dani.map((dan, index) => {
          // trening id koji se radi taj dan
          const tr_id = dan.trening_id?._id

          // iz trenutne sesije trazimo kompletirani trening
          // ako ga ima, ako ne onda je null
          let kompletiraniTreninzi =
            props.aktivne_sesije.completedTrainings?.filter(
              (kompletiraniTr) => {
                if (kompletiraniTr.tr_id === tr_id) {
                  return true
                }
                return false
              }
            )
          //ako nije kompletiran trening, onda je null
          let kompletiraniTrening =
            kompletiraniTreninzi.length > 0 ? kompletiraniTreninzi[0] : null
          return (
            <Training
              key={index}
              id={tr_id}
              brojDana={index + 1} // redni broj dana
              odmor={dan.odmor} //da li se odmara taj dan
              // ako se odmara, nemamo vezbe ni kompletirani trening
              vezbe={!dan.odmor ? dan.trening_id.vezbe : []}
              kompletiraniTrening={!dan.odmor ? kompletiraniTrening : null}
            ></Training>
          )
        })}
      </section>
    </>
  )
}

export default TrainingList
