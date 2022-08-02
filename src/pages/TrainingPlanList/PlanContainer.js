import { useEffect, useState } from 'react'
import '../../style/css/TrainingPlanList/main.css'

import PlanCard from './PlanCard'
function PlanContainer() {
  const [planovi, setPlanovi] = useState([])
  useEffect(() => {
    async function getPlans() {
      try {
        const result = await fetch(
          'http://localhost:5000/api/trainingplans/user'
        )
        const data = await result.json()
        setPlanovi(data.data)
      } catch (e) {
        alert(e)
      }
    }
    getPlans()
    console.log('idemo')
  }, [])
  return (
    <main className='plan-container-main'>
      <div className='main-container'>
        <h1>Trening planovi</h1>
        <div className='plan-list-container'>
          {planovi.map((element, index) => {
            console.log(planovi)
            return (
              <PlanCard
                key={index}
                planId={element._id}
                sessionId={element.aktivne_sesije?._id}
                ime={element.ime}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default PlanContainer
