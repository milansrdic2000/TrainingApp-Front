function TrainingHeader(props) {
  return (
    <>
      <section className='plan-info-section'>
        {/* Ime treninga */}
        <h1 className='training-plan-name'>{props.ime}</h1>
        {/* Parametri treninga */}
        <div className='training-plan-info-container'>
          <div className='training-info'>3</div>
          <div className='training-info'>3</div>
          <div className='training-info'>2</div>
        </div>
        <div className='training-plan-action-container'>
          <div className='training-action-item'>3/8</div>
          <div className='training-action-item'>9</div>
          <div className='training-action-item'>
            <button>Gogogo</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default TrainingHeader
