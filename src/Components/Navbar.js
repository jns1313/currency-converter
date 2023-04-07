import React from 'react'
import { NavLink } from 'react-router-dom'


// https://www.youtube.com/watch?v=v1zu2u2yzto this did work

export default function Navbar() {


  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" className="nav-item">Converter</NavLink>
        </li>
        <hr />
        <li>
          <NavLink to="/rates" className="nav-item">Rates</NavLink>
        </li>
        <hr />
        <li>
          <NavLink to="/info" className="nav-item">Info</NavLink>
        </li>
      </ul>
    </nav>
  )
}
