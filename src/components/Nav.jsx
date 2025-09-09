import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Principal from '../routes/Principal'
import Error from '../routes/Error'
import axios from "axios";
import Login from '../routes/Login'
import Escudo from '../routes/Escudo'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <header className="bg-black text-white p-4 flex justify-between items-center">
        {/* Logo e Título Alinhados à Esquerda */}
        <div className="flex items-center space-x-2"> 
          <h1 className="text-2xl font-bold">FutBolinas</h1>
        </div>
        <nav className="space-x-4">
          <Link to="Principal" className="hover:text-red-400">Principal</Link>
        </nav>
      </header>
    </div>
  )
}

export default Nav
