import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Footer from "./components/Footer"
import Nav from "./components/Nav"
import Principal from "./routes/Home"
import Error from './routes/Error'
import Cadastro from './routes/Cadastro' 
import Escudo from './routes/Escudo'
import Login from './routes/Login'
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

        <Route path="/" element={<Login/>}/>

        <Route path="/home" element={<Principal/>}/>
        
        <Route path="/cadastro" element={<Cadastro/>}/>
        
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
