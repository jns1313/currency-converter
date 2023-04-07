import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Rates from './Pages/Rates'
import Info from './Pages/Info'
import './styles.css'


export default function App() {

  return (
    <Router>
        <h1>FX Converter Elite</h1>
        <main>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="Rates" element={<Rates />} />
                <Route path="Info" element={<Info />} />
            </Routes>
        </main>
    </Router>
        
  )
}
