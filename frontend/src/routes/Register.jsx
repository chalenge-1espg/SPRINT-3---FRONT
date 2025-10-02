import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/register", { email, senha });
      setMessage(response.data.message);
      setTimeout(() => navigate("/Login"), 2000);
    } catch (erro) {
      setMessage(erro.response?.data?.message || "Erro ao registrar usuário");
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      
      <form onSubmit={handleRegister}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Cadastrar
        </button>
      </form>

      {message && (
        <div>
          {message}
        </div>
      )}

      <p>
        Já tem uma conta? <a href="/Login">Faça Login</a>
      </p>
    </div>
  );
}

export default Register;
