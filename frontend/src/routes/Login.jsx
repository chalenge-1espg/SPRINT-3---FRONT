import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        senha: password,
      });
      setUser(response.data);
      navigate("/home");
    } catch (error) {
      if (!error?.response) {
        setError("Erro ao acessar o servidor");
      } else if (error.response.status == 401) {
        setError("Usuário ou senha inválidos");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      {user == null ? (
        <div className="bg-gray-800/90 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
         
          <h2 className="text-3xl font-bold text-white mb-6">Login</h2>

          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition duration-300"
            >
              Entrar
            </button>
          </form>

         
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      ) : (
        <div>
          <Link to="/home" />
        </div>
      )}
    </div>
  );
};

export default Login;
