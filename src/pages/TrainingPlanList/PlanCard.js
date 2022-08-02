import { Link } from 'react-router-dom'
function PlanCard(props) {
  return (
    <div className='plan-card-container'>
      <div className='plan-name'>
        <h3
          onClick={() => {
            console.log(props)
            window.location.href = `/training_plans/${props.planId}/training_sessions/${props.sessionId}`
          }}
        >
          {props.ime}
        </h3>
        <Link
          to={`/training_plans/${props.planId}/training_sessions/${props.sessionId}`}
        >
          Munje barikade
        </Link>
        {props.planId}
      </div>
      <div className='plan-parameters-container'>
        <div className='plan-parameters'>2</div>
        <div className='plan-parameters'>3</div>
        <div className='plan-parameters'>4</div>
      </div>
    </div>
  )
}

export default PlanCard
