import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import Principal from "./routes/Principal"
import Error from './routes/Error'
import Login from './routes/Login' 
import Escudo from './routes/Escudo'
import axios from "axios";
function App() {
 

  return (
    <>
    <BrowserRouter>
     
     <Nav/>
      <main>
      {/* Gerencia a exibição dos componentes com base na URL */}
      <Routes>
        {/* Rota para chamar o Error */}
        <Route path="*" element={<Error/>}/>

         {/* Rota para chamar a calculadora */}
        <Route path="/principal" element={<Principal/>}/>
        
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/escudo" element={<Escudo/>}/>
        
    
      </Routes>
    </main>



    
    {/* Chamando o componente Footer */}
    <Footer/>






    </BrowserRouter>


     
    </>
  )
}

export default App
