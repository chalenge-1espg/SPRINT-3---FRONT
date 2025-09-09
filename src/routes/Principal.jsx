import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// NOTE: Local image imports and external libraries like 'axios'
// may not work directly in this single-file immersive. For images, consider using a
// public URL. For API calls, you can use the built-in 'fetch' API.

const TelaFutebol = ({ onNavigate }) => {
  const [noticias, setNoticias] = useState([
    {
      titulo: "Corinthians x Sport - Campeonato Brasileiro Feminino 2025",
      imagem: "https://via.placeholder.com/300x200?text=Notícia+1",
    },
    {
      titulo: "Marta é eleita a melhor jogadora da história pela IFFHS",
      imagem: "https://via.placeholder.com/300x200?text=Notícia+2",
    },
    {
      titulo: "Flamengo anuncia novo técnico para a temporada",
      imagem: "https://via.placeholder.com/300x200?text=Notícia+3",
    },
  ]);

  const [slideAtual, setSlideAtual] = useState(0);

  // Buscar notícias da API
  useEffect(() => {
    // Para este ambiente, 'axios' não está disponível.
    // Usaremos a API 'fetch' embutida.
    const fetchNoticias = async () => {
      try {
        const response = await fetch(
          "https://api.sportmonks.com/v2.0/news/latest?api_token=4kz47dZrpM4QTcGwepxVx5HsX7Iev7trLkbRkQgfY5BKEKiDBQyJsKYAp3Rr"
        );
        const data = await response.json();
        const noticiasAPI = data.data.map((item) => {
          return {
            titulo: item.title || "Sem título",
            imagem:
              item.image_url ||
              item.image?.original ||
              item.image?.medium ||
              "https://via.placeholder.com/300x200?text=Notícia",
          };
        });

        if (noticiasAPI.length > 0) {
          setNoticias(noticiasAPI.slice(0, 5));
        }
      } catch (error) {
        console.error("Erro ao buscar notícias da API:", error);
      }
    };

    fetchNoticias();
  }, []);

  // Slide automático
  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideAtual((prev) => (prev + 1) % noticias.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, [noticias]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-green-900 text-white p-4">
      {/* Seção Monte seu elenco */}
      <div className="relative rounded-xl text-center mb-6 overflow-hidden">
        {/* Camada de fundo com a imagem da taça e o fundo escurecido */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://via.placeholder.com/600x400?text=Taca)` }}
        >
          {/* Esta é a camada preta semi-transparente para escurecer a imagem */}
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Conteúdo da seção em primeiro plano */}
        {/* O texto agora é branco para se destacar no fundo escuro */}
        <div className="relative z-10 p-4 text-white">
          <h2 className="text-lg font-bold">MONTE SEU ELENCO</h2>
          <p className="mt-2">SEJA O TÉCNICO DO SEU TIME!</p>
          <p className="text-sm">
            Crie seu time e comece a competir com seus amigos.
          </p>
          <Link
          to="/login"
          className="inline-block mt-3 bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold text-center"
          >
            CRIAR
          </Link>
        </div>
      </div>

      {/* Vantagens da assinatura */}
      <h3 className="text-lg font-bold mb-3">VANTAGENS DA ASSINATURA</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-pink-700 p-4 rounded-xl text-center">
          <h4 className="font-bold text-lg">2x de Moedas</h4>
          <p className="text-sm mt-2">
            Ganhe o dobro de moedas no início da temporada e acesso exclusivo!
          </p>
        </div>

        <div className="bg-yellow-600 p-4 rounded-xl text-center">
          <h4 className="font-bold text-lg">Ingresso Para um Jogo</h4>
          <p className="text-sm mt-2">
            Ganhe ingressos para jogos do seu time favorito.
          </p>
        </div>

        <div className="bg-purple-700 p-4 rounded-xl text-center">
          <h4 className="font-bold text-lg">Análise e Estatísticas</h4>
          <p className="text-sm mt-2">
            Dados profissionais sobre o desempenho do seu time.
          </p>
        </div>
      </div>

      {/* Notícias com slide */}
      <h3 className="text-lg font-bold mb-3">NOTÍCIAS</h3>
      <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6">
        <img
          src={
            noticias[slideAtual]?.imagem ||
            "https://via.placeholder.com/300x200?text=Notícia"
          }
          alt={noticias[slideAtual]?.titulo || "Imagem da notícia"}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2">
          <p className="text-sm">
            {noticias[slideAtual]?.titulo || "Sem título"}
          </p>
        </div>
      </div>

      {/* Canal do Passa Bola (embed YouTube) */}
      <div className="bg-pink-600 p-4 rounded-xl text-center mb-6">
        <h3 className="font-bold mb-2">CONFIRA O NOSSO VÍDEO</h3>
        <iframe
          width="100%"
          height="200"
          className="rounded-xl"
          src="https://www.youtube.com/embed/pr4wX4hCVLs"
          title="Passa a Bola"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Botões inferiores */}
      <div className="flex justify-around">
        <button className="bg-green-700 px-4 py-2 rounded-full">
          Escalações
        </button>
        <button className="bg-pink-700 px-4 py-2 rounded-full">
          Adicionar Amigo
        </button>
      </div>
    </div>
  );
};

export default TelaFutebol;
