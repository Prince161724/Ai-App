import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = React.lazy(() => import('./Home'))
import Login from './Login'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App