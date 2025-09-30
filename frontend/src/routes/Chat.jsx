import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, Loader2 } from 'lucide-react'; 

// URL do backend Flask. Mantenha esta URL se for rodar localmente na porta 5000.
const CHAT_API_URL = "http://localhost:5000/chat";

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "⚽ Olá! Eu sou a Botbolista. Pergunte-me algo sobre o futebol feminino no Brasil ou no mundo." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Efeito para rolar automaticamente para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Função para lidar com o envio de mensagens
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    
    // 1. Adiciona mensagem do usuário
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // 2. Faz a chamada ao backend Python
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
         throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();

      // 3. Adiciona resposta do bot
      setMessages((prev) => [...prev, { from: "bot", text: data.response }]);

    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Erro: Não consegui me conectar com o servidor. Verifique se o Flask está rodando na porta 5000." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  // Componente de Mensagem Estilizada
  const Message = ({ from, text, isFirstOfGroup }) => {
    const isUser = from === 'user';
    
    // Estilos que reforçam a identidade do bot
    const bubbleClass = isUser
      // Bolha do usuário: Fúcsia, cantos arredondados normais
      ? "bg-fuchsia-600 text-white rounded-xl shadow-md" 
      // Bolha do bot: Cinza claro para toque tecnológico, borda e cantos suaves
      : "bg-gray-100 text-gray-800 rounded-xl border border-gray-200 shadow-sm"; 
    
    const alignmentClass = isUser ? "justify-end" : "justify-start";
    
    // Margem superior: mais espaço se for a primeira do grupo, menos se for sequência
    const marginClass = isFirstOfGroup ? "mt-4" : "mt-1"; 

    return (
      <div className={`flex ${alignmentClass} ${marginClass} items-start`}>
        {!isUser && (
            // Reintrodução do ícone do Bot para reforçar a identidade
            <div className="mr-2 p-1.5 bg-fuchsia-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-5 h-5 text-fuchsia-700" />
            </div>
        )}
        <div className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 text-base leading-relaxed ${bubbleClass}`}>
          {text}
        </div>
      </div>
    );
  };
    
  // Renderiza as mensagens com a lógica de agrupamento para aparência de conversa
  const renderMessages = () => {
    return messages.map((msg, index) => {
      // É a primeira mensagem ou o emissor mudou? (inicia novo grupo)
      const isFirstOfGroup = index === 0 || messages[index - 1].from !== msg.from;
      return (
        <Message 
          key={index} 
          from={msg.from} 
          text={msg.text} 
          isFirstOfGroup={isFirstOfGroup} 
        />
      );
    });
  };

  return (
    // Fundo escuro com degradê elegante (Dark Gray para Fúcsia/Violeta Escuro)
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900" 
         style={{ backgroundImage: 'linear-gradient(to bottom right, #1a202c, #6b21a8)' }}> 

      {/* Caixa do chat (Com efeito Glassmorphism sutil) */}
      <div className="w-full max-w-xl h-[70vh] flex flex-col bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-100/50">
        
        {/* Cabeçalho Premium, mais compacto para simular a janela de chat */}
        <div className="bg-fuchsia-700 text-white flex items-center p-4 shadow-xl">
          <div className="p-2 bg-white/20 rounded-full mr-3">
              <Bot className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold tracking-wide">
            Botbolista - Chat de Futebol Feminino
          </h2>
        </div>

        {/* Mensagens - Agora usa a lógica de renderMessages para espaçamento de conversa */}
        <div className="flex-1 overflow-y-auto p-5 space-y-0 bg-gray-50">
          {renderMessages()}

          {/* Indicador de Digitação (Loader) */}
          {loading && (
            <div className="flex justify-start items-center mt-2">
               {/* Ícone do Bot no loader */}
               <div className="mr-2 p-1.5 bg-fuchsia-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-5 h-5 text-fuchsia-700 animate-pulse" />
              </div>
              {/* Bolha do loader */}
              <div className="flex items-center px-4 py-3 rounded-xl bg-gray-100 text-gray-600 shadow-md border border-gray-200">
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-fuchsia-500" />
                Digitando...
              </div>
            </div>
          )}
          {/* Ref para rolagem automática */}
          <div ref={messagesEndRef} />
        </div>

        {/* Campo de entrada */}
        <div className="p-4 flex gap-3 border-t border-gray-100 bg-white">
          <input
            type="text"
            className="flex-1 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 text-gray-900 transition duration-150 shadow-inner"
            placeholder="Faça sua pergunta sobre o futebol feminino..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            // Botão menor e mais focado apenas no ícone de envio
            className="bg-fuchsia-600 text-white w-12 py-3 rounded-lg hover:bg-fuchsia-700 transition duration-150 shadow-lg active:scale-[0.98] disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
