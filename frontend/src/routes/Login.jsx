import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState("")
    const[user, setUser] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, password);
       try { 
        const response = await axios.post("http://localhost:3000/login", {
            email: email,
            senha: password
        });
        setUser(response.data)
        navigate('/home')
    } catch (error){
        if (!error?.response){
            setError('Erro ao acessar o servidor');
        } else if (error.response.status == 401){
            setError('Usuario ou senha invalidos')
        } 
    }
        


    };

    return (
    <div>
        {user == null? (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder='E-mail' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" name="password" placeholder='senha' required value={password} onChange={(e => setPassword(e.target.value))}/>
                <button type="submit">Login</button>
            </form>
            <p>{error}</p>
        </div>
        ) : (
            <div>
                <Link to="/home" />
            </div>
        )}
    </div>
    );
}
export default Login;
