import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_KEY = "a5b87c36275742bdaf666a378c76283b";

const TelaFutebol = () => {
  const [noticias, setNoticias] = useState([]);
  const [slideAtual, setSlideAtual] = useState(0);
  const [jogosFemininos, setJogosFemininos] = useState([]);
  const [noticiaDestaque, setNoticiaDestaque] = useState(null);

  // Imagens dos times
  const imagensTimes = {
    Corinthians: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png",
    Sport: "https://upload.wikimedia.org/wikipedia/pt/5/56/Sport_Club_do_Recife.png",
    Palmeiras: "https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.png",
    Santos: "https://upload.wikimedia.org/wikipedia/commons/3/35/Santos_logo.png",
    Flamengo: "https://upload.wikimedia.org/wikipedia/pt/3/35/Clube_de_Regatas_do_Flamengo_logo.svg",
    "São Paulo": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Sao_Paulo_FC_crest.svg",
    Internacional: "https://upload.wikimedia.org/wikipedia/pt/9/9f/SC_Internacional_logo.svg",
    Cruzeiro: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Cruzeiro_Esporte_Clube_%28logo%29.svg",
    Ferroviária: "https://upload.wikimedia.org/wikipedia/pt/7/79/Ferroviaria_logo.png",
    Grêmio: "https://upload.wikimedia.org/wikipedia/pt/b/b0/Gremio_logo.svg",
    Bahia: "https://upload.wikimedia.org/wikipedia/pt/7/7e/ECBahia.png",
    "Atlético-MG": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Clube_Atl%C3%A9tico_Mineiro_logo.svg",
    "Realidade Jovem": "https://upload.wikimedia.org/wikipedia/pt/8/87/Realidade_Jovem_FC.png",
    Fluminense: "https://upload.wikimedia.org/wikipedia/commons/8/88/Fluminense_FC_escudo.png",
  };

  // Buscar partidas gerais (para carrossel)
  useEffect(() => {
    const fetchPartidas = async () => {
      try {
        const response = await fetch("https://api.football-data.org/v4/matches", {
          headers: { "X-Auth-Token": API_KEY },
        });
        const data = await response.json();

        if (data.matches) {
          const partidas = data.matches.slice(0, 5).map((match) => ({
            titulo: `${match.homeTeam.name} x ${match.awayTeam.name}`,
            imagem:
              match.homeTeam.crest ||
              match.awayTeam.crest ||
              "https://via.placeholder.com/300x200?text=Partida",
          }));
          setNoticias(partidas);
        }
      } catch (error) {
        console.error("Erro ao buscar partidas gerais:", error);
      }
    };

    fetchPartidas();
  }, []);

  // Buscar partidas do Brasileirão Feminino
  useEffect(() => {
    const fetchJogosFemininos = async () => {
      try {
        const response = await axios.get(
          "https://api.football-data.org/v4/competitions/BRA_FEM/matches?season=2025",
          { headers: { "X-Auth-Token": API_KEY } }
        );
        setJogosFemininos(response.data.matches.slice(0, 5));
      } catch (error) {
        console.error("Erro ao buscar jogos femininos:", error);
      }
    };

    fetchJogosFemininos();
  }, []);

  // Buscar notícia da Marta via Wikipedia
  useEffect(() => {
    const fetchWikipediaImage = async () => {
      try {
        const response = await axios.get(
          "https://pt.wikipedia.org/api/rest_v1/page/summary/Marta_(futebolista)"
        );
        setNoticiaDestaque({
          titulo: response.data.title,
          descricao: "Marta é eleita a melhor jogadora da história pela IFFHS",
          imagem: response.data.thumbnail?.source || null,
        });
      } catch (error) {
        console.error("Erro ao buscar imagem da Wikipedia:", error);
      }
    };

    fetchWikipediaImage();
  }, []);

  // Slide automático
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (noticias.length > 0) {
        setSlideAtual((prev) => (prev + 1) % noticias.length);
      }
    }, 3000);
    return () => clearInterval(intervalo);
  }, [noticias]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-green-900 text-white m-0 p-0 pt-16 overflow-x-hidden">
      {/* Banner */}
      <div className="relative rounded-xl text-center overflow-hidden shadow-lg mb-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://i.ibb.co/YZnnpwP/banner-futebol.jpg)` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 p-6 text-white">
          <h2 className="text-2xl font-bold">⚽ MONTE SEU ELENCO</h2>
          <p className="mt-2">SEJA O TÉCNICO DO SEU TIME!</p>
          <p className="text-sm mt-1">Crie seu time e comece a competir com seus amigos.</p>
          <Link
            to="/Cadastro"
            className="inline-block mt-3 bg-yellow-400 text-black px-6 py-2 rounded-xl font-bold hover:bg-yellow-500 transition"
          >
            CRIAR
          </Link>
        </div>
      </div>

      {/* Vantagens */}
      <h3 className="text-lg font-bold mb-3">✨ VANTAGENS DA ASSINATURA</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-pink-700 p-4 rounded-xl text-center shadow-md">
          <h4 className="font-bold text-lg">💰 2x de Moedas</h4>
          <p className="text-sm mt-2">
            Ganhe o dobro de moedas no início da temporada e acesso exclusivo!
          </p>
        </div>
        <div className="bg-yellow-600 p-4 rounded-xl text-center shadow-md">
          <h4 className="font-bold text-lg">🎟️ Ingresso Para um Jogo</h4>
          <p className="text-sm mt-2">Ganhe ingressos para jogos do seu time favorito.</p>
        </div>
        <div className="bg-purple-700 p-4 rounded-xl text-center shadow-md">
          <h4 className="font-bold text-lg">📊 Análise e Estatísticas</h4>
          <p className="text-sm mt-2">Dados profissionais sobre o desempenho do seu time.</p>
        </div>
      </div>

      {/* Notícias */}
      <h3 className="text-lg font-bold mb-3">📰 NOTÍCIAS</h3>
      {noticiaDestaque ? (
        <div className="bg-green-800 rounded-xl p-4 mb-6 flex items-center space-x-4 shadow-md">
          {noticiaDestaque.imagem && (
            <img
              src={noticiaDestaque.imagem}
              alt={noticiaDestaque.titulo}
              className="w-24 h-24 object-cover rounded-md"
            />
          )}
          <p className="text-white font-medium">
            <strong>{noticiaDestaque.titulo}</strong>: {noticiaDestaque.descricao}
          </p>
        </div>
      ) : (
        <p className="text-gray-300 mb-6">Carregando notícia em destaque...</p>
      )}

      {/* Carrossel */}
      <h3 className="text-lg font-bold mb-3">🏆 JOGOS EM DESTAQUE</h3>
      <div className="relative w-full h-56 rounded-xl overflow-hidden mb-6 shadow-md">
        {noticias.length > 0 ? (
          <>
            <img
              src={
                noticias[slideAtual]?.imagem ||
                "https://via.placeholder.com/300x200?text=Partida"
              }
              alt={noticias[slideAtual]?.titulo || "Partida"}
              className="w-full h-full object-contain bg-black"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2">
              <p className="text-sm font-semibold">
                {noticias[slideAtual]?.titulo || "Sem título"}
              </p>
            </div>
          </>
        ) : (
          <p className="text-center">Carregando partidas...</p>
        )}
      </div>

      {/* Jogos Brasileirão Feminino */}
      <h3 className="text-lg font-bold mb-3">⚽ BRASILEIRÃO FEMININO - PRÓXIMOS JOGOS</h3>
      <div className="space-y-4 mb-6">
        {jogosFemininos.length > 0 ? (
          jogosFemininos.map((jogo, index) => {
            const timeCasa = jogo.homeTeam.name;
            const timeFora = jogo.awayTeam.name;
            return (
              <div
                key={index}
                className="bg-green-800 p-3 rounded-lg flex items-center justify-between shadow"
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={imagensTimes[timeCasa] || "https://via.placeholder.com/50"}
                    alt={timeCasa}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-white font-semibold">{timeCasa}</span>
                </div>
                <span className="text-white font-bold">X</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{timeFora}</span>
                  <img
                    src={imagensTimes[timeFora] || "https://via.placeholder.com/50"}
                    alt={timeFora}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-300">Carregando jogos do Brasileirão Feminino...</p>
        )}
      </div>

      {/* Vídeo */}
      <div className="bg-pink-600 p-4 rounded-xl text-center mb-6 shadow-md">
        <h3 className="font-bold mb-2">📺 CONFIRA O NOSSO VÍDEO</h3>
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
      <div className="flex justify-around mt-4">
        <Link
          to="/Escalacao"
          className="bg-green-700 px-6 py-2 rounded-full font-bold hover:bg-green-800 transition"
        >
          Escalações
        </Link>

        <button className="bg-pink-700 px-6 py-2 rounded-full font-bold hover:bg-pink-800 transition">
          Adicionar Amigo
        </button>
      </div>
    </div>
  );
};

export default TelaFutebol;