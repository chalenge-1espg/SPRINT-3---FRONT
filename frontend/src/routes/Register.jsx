import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // NOVO: Estado para a confirmação de senha
  const [confirmSenha, setConfirmSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // 1. Lógica de Validação: Verifica se as senhas coincidem
    if (senha !== confirmSenha) {
      // Define uma mensagem de erro se as senhas forem diferentes
      setMessage("As senhas não coincidem. Por favor, verifique e tente novamente.");
      return; // Interrompe a submissão do formulário
    }

    // Limpa a mensagem caso estivesse mostrando um erro de não coincidência anterior
    setMessage('');

    try {
      const response = await axios.post("http://localhost:3000/register", { email, senha });
      setMessage(response.data.message);
      // Redireciona para /Login após 2 segundos
      setTimeout(() => navigate("/Login"), 2000);
    } catch (erro) {
      // Mensagem de erro do servidor
      setMessage(erro.response?.data?.message || "Erro ao registrar usuário. Tente novamente.");
    }
  };

  return (
    // Fundo e Centralização (Estilo Profissional)
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4"> 
      
      {/* Card Profissional */}
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700/50">
        
        {/* Título Estilizado */}
        <h2 className="text-3xl font-extrabold text-white text-center tracking-tight mb-2">
          Crie sua Conta
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Junte-se à nossa plataforma em segundos.
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Campo Email */}
          <div>
            <input
              type="email"
              placeholder="E-mail" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 placeholder-gray-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Campo Senha */}
          <div>
            <input
              type="password"
              placeholder="Senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 placeholder-gray-500 transition duration-150 ease-in-out"
            />
          </div>
          
          {/* NOVO: Campo Confirmar Senha */}
          <div>
            <input
              type="password"
              placeholder="Confirmar Senha" 
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 placeholder-gray-500 transition duration-150 ease-in-out"
            />
          </div>

          {/* Botão de Cadastro/Submit */}
          <button 
            type="submit"
            className="w-full py-3 mt-6 text-base font-semibold text-white bg-violet-600 rounded-lg shadow-md shadow-violet-600/40 hover:bg-violet-700 transition duration-200 ease-in-out transform hover:scale-[1.01]"
          >
            Cadastrar
          </button>
        </form>

        {/* Mensagens de Feedback Aprimoradas */}
        {message && (
          // O erro de não coincidência de senhas será tratado como um erro (text-red-400)
          <div className={`mt-5 p-3 rounded-lg text-center text-sm font-medium ${message.includes('Erro') || message.includes('não coincidem') ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>
            {message}
          </div>
        )}

        {/* Link de Acesso */}
        <p className="mt-8 text-center text-gray-400 text-sm">
          Já tem uma conta?{" "}
          <a href="/Login" className="text-violet-500 hover:text-violet-400 font-semibold transition duration-200">
            Faça Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;