import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import PlanContainer from './pages/TrainingPlanList/PlanContainer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TrainingSession } from './pages/TrainingSession/TrainingSession'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<PlanContainer></PlanContainer>} />
      <Route
        path='/training_sessions/:session_id'
        element={<TrainingSession></TrainingSession>}
      ></Route>
    </Routes>
  </BrowserRouter>
)
