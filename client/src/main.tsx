import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Singleplayer from './pages/Singleplayer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/singleplayer' element={<Singleplayer/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)