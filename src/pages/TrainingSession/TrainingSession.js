import React, { useEffect, useState } from 'react'
import TrainingHeader from './TrainingHeader'
import '../../style/css/TrainingSession/trainingsession.css'
import TrainingList from './TrainingList'
import TrainingTimeWidget from './TrainingTimeWidget'

import { useParams } from 'react-router-dom'

function TrainingSession(props) {
  const [trainingPlan, setTrainingPlan] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { plan_id } = useParams()
  useEffect(() => {
    const getTrainingPlan = async (tr_id) => {
      const result = await fetch(
        `http://localhost:5000/api/trainingplans/${plan_id}`
      )
      const response = await result.json()
      const data = response.data

      setTrainingPlan(data)
      setIsLoading(false)
    }
    getTrainingPlan(plan_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {}, [trainingPlan])

  const { ime, brojCiklusa, brojdana, dani, aktivne_sesije } = trainingPlan

  return (
    <main className='training-session-main'>
      {isLoading ? (
        <div>Loaduje se</div>
      ) : (
        <React.Fragment>
          <TrainingHeader ime={ime}></TrainingHeader>
          <TrainingList
            brojCiklusa={brojCiklusa}
            dani={dani}
            aktivne_sesije={aktivne_sesije}
          ></TrainingList>
          <TrainingTimeWidget></TrainingTimeWidget>
        </React.Fragment>
      )}
    </main>
  )
}
export default TrainingSession
