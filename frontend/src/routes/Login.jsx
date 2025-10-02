import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setMensagem("Login realizado com sucesso");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        setMensagem("Erro autenticar token");
      }
    } catch (erro) {
      console.error("Erro ao logar", erro);
      setMensagem("Erro ao tentar fazer login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 sm:px-4">
      <div className="bg-gray-800/90 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md text-center">
        {/* Título */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Login</h2>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 text-base sm:text-lg"
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-900/70 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 text-base sm:text-lg"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 
                       text-white font-semibold shadow-md transition duration-300 text-base sm:text-lg"
          >
            Entrar
          </button>
        </form>

        {/* Mensagem de feedback */}
        {mensagem && (
          <p className="mt-4 text-sm sm:text-base text-green-400">{mensagem}</p>
        )}

        {/* Link para cadastro */}
        <p className="mt-6 text-gray-300 text-sm">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Criar Conta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
