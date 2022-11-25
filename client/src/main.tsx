import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Multiplayer from './pages/Multiplayer'
import Singleplayer from './pages/Singleplayer'

import "./styles/css/styles.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/singleplayer' element={<Singleplayer/>}/>
        <Route path='/multiplayer' element={<Multiplayer/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
