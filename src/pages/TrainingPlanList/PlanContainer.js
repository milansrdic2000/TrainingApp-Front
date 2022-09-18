import { useEffect, useState } from 'react'
import '../../style/css/TrainingPlanList/main.css'

import PlanCard from './PlanCard'
function PlanContainer() {
  const [plans, setPlans] = useState([])
  useEffect(() => {
    async function getPlans() {
      try {
        const result = await fetch(
          'http://localhost:5000/api/trainingplans/user'
        )
        const data = await result.json()

        setPlans(data.data)
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
          {plans.map((element, index) => {
            console.log(plans)
            return (
              <PlanCard
                key={index}
                planId={element._id}
                sessionId={element.activeSessions?._id}
                planName={element.planName}
              />
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default PlanContainer
