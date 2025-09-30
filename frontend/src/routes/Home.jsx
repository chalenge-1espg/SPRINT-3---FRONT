import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Configuração do Tailwind para usar a fonte Inter e aplicar arredondamentos globais
const TW_CONFIG = `
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
    body { font-family: 'Inter', sans-serif; }
    /* Aplicando rounded-xl como padrão para elementos principais */
    .rounded-xl { border-radius: 12px; }
  </style>
`;

// Usando a API key.
// NOTA: Esta API key é apenas um placeholder para ilustrar o uso.
const API_KEY = "live_6a0b5e7e6e42c089a2f84ae8441d5f";

// --- DADOS MOCKADOS FOCADOS NO FUTEBOL FEMININO ---
const MOCK_NOTICIAS = [
    { titulo: "Corinthians Conquista o Brasileirão Feminino A1 2025!", imagem: "https://s2-ge.glbimg.com/4kDBkvRr4Vp4tdVjFF82KJOfAd8=/0x0:4509x3001/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2025/G/F/NAlaGfQf6FAGzBqqleeg/rib0731.jpg" },
    { titulo: "Libertadores Feminina: Palmeiras se Prepara para a Fase de Grupos", imagem: "https://s2-ge.glbimg.com/Vz07r7Of2Ftp3hNKzPKVOeA9evw=/3200x0/filters:format(jpeg)/https://i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2025/G/k/fqovRUT2uyeqwf82Zjkw/54756514535-e84b4f8454-o.jpg" },
    { titulo: "Copa do Brasil Feminina: Santos x Flamengo nas Semifinais", imagem: "https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2023/02/52269435851-076d3035ab-o.jpg" }
];

const MOCK_JOGOS_RECENTES = [
    {
        homeTeam: { name: "Corinthians" },
        awayTeam: { name: "Cruzeiro" },
        score: { fullTime: { home: 1, away: 0 } },
        matchday: "Final Brasileirão A1",
        status: "FINISHED"
    },
    {
        homeTeam: { name: "Palmeiras" },
        awayTeam: { name: "São Paulo" },
        score: { fullTime: { home: 1, away: 2 } },
        matchday: "Paulista Feminino",
        status: "FINISHED"
    },
    {
        homeTeam: { name: "Ferroviária" },
        awayTeam: { name: "Internacional" },
        score: { fullTime: { home: 3, away: 1 } },
        matchday: "Copa do Brasil Feminina",
        status: "FINISHED"
    },
];

// DADOS ATUALIZADOS: JOGOS IMPORTANTES DE OUTUBRO DE 2025 (DATAS E HORAS REAIS PROVÁVEIS)
const MOCK_PROXIMOS_JOGOS = [
    {
        id: 101,
        time_casa: { nome: "Corinthians" },
        time_visitante: { nome: "Ferroviária" },
        campeonato: "Brasileirão Feminino A1 - SEMIFINAL (Volta)",
        data: "2025-10-05T16:00:00-03:00", // 05/Outubro, 16h00
    },
    {
        id: 102,
        time_casa: { nome: "Internacional" },
        time_visitante: { nome: "Palmeiras" },
        campeonato: "Copa Libertadores Feminina - FASE DE GRUPOS",
        data: "2025-10-10T19:30:00-03:00", // 10/Outubro, 19h30
    },
    {
        id: 103,
        time_casa: { nome: "Santos" },
        time_visitante: { nome: "Red Bull Bragantino" },
        campeonato: "Paulista Feminino - QUARTAS DE FINAL",
        data: "2025-10-14T15:00:00-03:00", // 14/Outubro, 15h00
    },
    {
        id: 104,
        time_casa: { nome: "Universidade de Chile" },
        time_visitante: { nome: "Corinthians" },
        campeonato: "Copa Libertadores Feminina - FASE DE GRUPOS",
        data: "2025-10-18T21:00:00-03:00", // 18/Outubro, 21h00
    },
    {
        id: 105,
        time_casa: { nome: "Ferroviária" },
        time_visitante: { nome: "Santa Fe" },
        campeonato: "Copa Libertadores Feminina - FASE DE GRUPOS",
        data: "2025-10-22T17:00:00-03:00", // 22/Outubro, 17h00
    },
    {
        id: 106,
        time_casa: { nome: "Corinthians" },
        time_visitante: { nome: "Internacional" },
        campeonato: "Brasileirão Feminino A1 - FINAL (Ida)",
        data: "2025-10-27T20:30:00-03:00", // 27/Outubro, 20h30
    },
];
// ----------------------------------------------------------------------------------

// Componente Skeleton de Carregamento (mantido)
const GameCardSkeleton = () => (
    <div className="bg-[#1C172C] p-4 rounded-xl flex items-center justify-between shadow-lg border border-fuchsia-800/50 animate-pulse">
      <div className="flex items-center space-x-3 w-5/12">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="h-4 bg-gray-700 rounded w-20"></div>
      </div>
      <div className="h-6 bg-gray-700 rounded w-10 flex-shrink-0"></div>
      <div className="flex items-center space-x-3 justify-end w-5/12 text-right">
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
      </div>
    </div>
);

/**
 * Componente principal da Tela de Futebol, exibindo notícias e jogos.
 */
const TelaFutebolFeminino = () => {
    const [noticias, setNoticias] = useState([]);
    const [slideAtual, setSlideAtual] = useState(0);
    const [jogosFemininos, setJogosFemininos] = useState([]);
    const [noticiaDestaque, setNoticiaDestaque] = useState(null);
    // Inicializa com os novos jogos mockados
    const [proximosJogos, setProximosJogos] = useState(MOCK_PROXIMOS_JOGOS);
    const [isLoadingRecentes, setIsLoadingRecentes] = useState(true);
    // Define como false, pois já carregamos do mock
    const [isLoadingProximos, setIsLoadingProximos] = useState(false);

    // Mapeamento local de URLs de imagens dos times (melhorado com foco feminino e novos times).
    const imagensTimes = {
        Corinthians:
          "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png",
        Sport: "https://sportrecife.com.br/wp-content/uploads/2024/06/image14.png",
        Palmeiras:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/300px-Palmeiras_logo.svg.png",
        Santos: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Santos_Logo.png/500px-Santos_Logo.png",
        Flamengo:
          "https://upload.wikimedia.org/wikipedia/commons/9/93/Flamengo-RJ_%28BRA%29.png",
        "São Paulo":
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/770px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png",
        Internacional:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/1200px-Escudo_do_Sport_Club_Internacional.svg.png",
        Cruzeiro:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/2048px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png",
        Ferroviária: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Escudo_Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes.png/1107px-Escudo_Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes.png",
        Grêmio: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gremio_logo.svg/1718px-Gremio_logo.svg.png",
        Bahia: "https://logodownload.org/wp-content/uploads/2017/02/e-c-bahia-logo-escudo.png",
        "Atlético-MG":
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Atletico_mineiro_galo.png",
        Fluminense:
          "https://images.seeklogo.com/logo-png/5/2/fluminense-logo-png_seeklogo-56021.png",
        Avaí: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Avai_FC_%2805-E%29_-_SC.svg/945px-Avai_FC_%2805-E%29_-_SC.svg.png",
        'Botafogo-RJ': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/1816px-Botafogo_de_Futebol_e_Regatas_logo.svg.png',
        'Vasco da Gama': 'https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png',
        
        Audax: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Gr%C3%AAmio_Osasco_Audax_%2801%29_-_SP.png',
        'Red Bull Bragantino': 'https://www.ogol.com.br/img/logos/equipas/3156_imgbank_1683624209.png',
        
        'Universidade de Chile': 'https://www.ogol.com.br/img/logos/equipas/2273_imgbank_1750938169.png',
        'Santa Fe': 'https://www.ogol.com.br/img/logos/equipas/2302_imgbank_1688124532.png',
    };

    
    useEffect(() => {
        
        setNoticias(MOCK_NOTICIAS);

        const fetchWikipediaImage = async (attempt = 0) => {
            const maxAttempts = 3;
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
                if (attempt < maxAttempts) {
                    setTimeout(() => fetchWikipediaImage(attempt + 1), 2 ** attempt * 1000);
                }
            }
        };
        fetchWikipediaImage();
    }, []);

    // 2. Buscar partidas do Brasileirão Feminino (Resultados Recentes)
    useEffect(() => {
      const fetchJogosFemininos = async () => {
        setIsLoadingRecentes(true);
        try {
          // Tenta buscar o Brasileirão Feminino A1
          const response = await axios.get(
            "https://api.football-data.org/v4/competitions/BRA_FEM/matches?season=2025",
            { headers: { "X-Auth-Token": API_KEY } }
          );
          // Filtra para mostrar apenas jogos importantes (Finais, Semifinais, etc.)
          const jogosImportantes = response.data.matches.filter(match =>
            match.stage === "FINAL" || match.stage === "SEMI_FINALS" || match.matchday > 10
          ).slice(0, 5);

          if (jogosImportantes.length > 0) {
            setJogosFemininos(jogosImportantes);
          } else {
              // Se não encontrar jogos importantes, usa o mock
              setJogosFemininos(MOCK_JOGOS_RECENTES);
          }
        } catch (error) {
          // Em caso de 'Network Error' ou outro erro, usa dados mockados femininos
          console.warn("API football-data/BRA_FEM falhou. Usando dados MOCKADOS. Erro:", error.message);
          setJogosFemininos(MOCK_JOGOS_RECENTES);
        } finally {
          setIsLoadingRecentes(false);
        }
      };
      fetchJogosFemininos();
    }, []);

    // 3. Slide automático do carrossel (mantido)
    useEffect(() => {
      const intervalo = setInterval(() => {
        if (noticias.length > 0) {
          setSlideAtual((prev) => (prev + 1) % noticias.length);
        }
      }, 3000);
      return () => clearInterval(intervalo);
    }, [noticias]);

    // 4. Busca de próximos jogos AGORA DESABILITADA PARA FORÇAR O MOCK DE OUTUBRO
    // useEffect(() => {
    //   // A busca da API foi desabilitada para garantir a exibição dos jogos de outubro mockados.
    //   // setIsLoadingProximos(false); // Já está false
    //   // setProximosJogos(MOCK_PROXIMOS_JOGOS); // Já está no useState
    // }, []);

    // Função auxiliar para tratamento de erro de imagem (mantido)
    const handleImageError = (e) => {
        // Se o escudo não carregar, substitui pela imagem placeholder
        e.target.src = "https://placehold.co/50/555/FFF?text=Logo";
    };

    // Função para renderizar o resultado/placar no card de Próximos Jogos (agora mostrando a competição)
    const renderProximoJogoDetalhe = (jogo) => {
        // Formata a data para exibir 'dia/mês'
        const dataFormatada = new Date(jogo.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        // Formata a hora
        const horaFormatada = new Date(jogo.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' });

        return (
          <div className="flex flex-col items-center justify-center space-y-1 sm:w-1/3 border-y sm:border-x border-fuchsia-700/50 py-2 sm:py-0 sm:px-4 w-full">
            <span className="text-sm font-bold text-yellow-300 uppercase tracking-wide text-center">
                {jogo.campeonato || 'Próxima Partida'}
            </span>
            <span className="text-3xl font-black text-white">VS</span>
            <span className="text-xs font-medium text-gray-300 text-center">
                {dataFormatada} às
                <span className="font-bold text-sm text-fuchsia-300"> {horaFormatada}</span>
            </span>
          </div>
        );
    };


    return (
      <>
        {/* Insere a configuração do Tailwind para fonte Inter e estilos */}
        <div dangerouslySetInnerHTML={{ __html: TW_CONFIG }} />

        {/* NOVO ESTILO: Fundo Deep Violet (Deep Blue/Purple) */}
        <div className="min-h-screen bg-[#130E26] text-white font-inter">

          {/* === HEADER FIXO PARA NAVEGAÇÃO PROFISSIONAL === */}
          <header className="fixed top-0 left-0 right-0 z-20 bg-[#130E26] border-b border-fuchsia-700/50 p-4 shadow-xl">
              <div className="flex justify-between items-center max-w-7xl mx-auto">
                <h1 className="text-2xl font-black text-pink-400 tracking-wider uppercase">FUT FEM BRASIL</h1> {/* Título atualizado */}
                  <div className="flex space-x-4">
                      {/* Ícone de Usuário (placeholder) */}
                      <button className="text-white hover:text-fuchsia-400 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </button>
                      {/* Ícone de Notificações (placeholder) */}
                      <button className="text-white hover:text-fuchsia-400 transition">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.36 17a1.5 1.5 0 0 0 3.28 0"/></svg>
                      </button>
                  </div>
              </div>
          </header>

          {/* Conteúdo Principal com padding para compensar o header fixo */}
          <main className="p-4 pt-20 max-w-4xl mx-auto">

            {/* Banner principal */}
            <div className="relative rounded-xl text-center overflow-hidden shadow-2xl mb-8 border border-fuchsia-700/50">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(https://i.ibb.co/YZnnpwP/banner-futebol.jpg)` }}
              >
                <div className="absolute inset-0 bg-black/70"></div> {/* Escurecido para melhor contraste do texto */}
              </div>
              <div className="relative z-10 p-6 text-white">
                <h2 className="text-4xl font-black tracking-widest uppercase text-pink-400">⚽ MONTE SEU ELENCO FEMININO</h2>
                <p className="mt-2 text-xl font-light italic">SEJA A TÉCNICA DO SEU TIME!</p>
                <p className="text-sm mt-1 text-gray-300">Crie seu time e comece a competir com suas amigas.</p>

                            <Link to="/cadastro">
            <button
              type="button"
              className="inline-block mt-5 bg-pink-500 text-white px-10 py-3 rounded-full font-extrabold hover:bg-pink-600 transition shadow-pink-500/50 shadow-lg transform hover:scale-105"
            >
              CRIAR TIME AGORA
            </button>
          </Link>
              </div>
            </div>

            {/* Vantagens */}
            <h3 className="text-2xl font-bold mb-5 flex items-center border-b border-fuchsia-700 pb-2">
              <span className="text-pink-400 mr-2 text-3xl">💎</span> VANTAGENS DA ASSINATURA PREMIUM
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#1C172C] p-6 rounded-xl text-center shadow-xl border border-fuchsia-800/50 transition duration-300 hover:border-fuchsia-500">
                <h4 className="font-extrabold text-2xl text-yellow-300">💰 2x de Moedas</h4>
                <p className="text-sm mt-2 text-gray-300">
                  Ganhe o dobro de moedas no início da temporada e acesso exclusivo!
                </p>
              </div>
              <div className="bg-[#1C172C] p-6 rounded-xl text-center shadow-xl border border-fuchsia-800/50 transition duration-300 hover:border-fuchsia-500">
                <h4 className="font-extrabold text-2xl text-teal-400">🎟️ Ingresso VIP</h4>
                <p className="text-sm mt-2 text-gray-300">Ganhe ingressos VIP para jogos do seu time favorito.</p>
              </div>
              <div className="bg-[#1C172C] p-6 rounded-xl text-center shadow-xl border border-fuchsia-800/50 transition duration-300 hover:border-fuchsia-500">
                <h4 className="font-extrabold text-2xl text-pink-400">📊 Análise Pro</h4>
                <p className="text-sm mt-2 text-gray-300">Dados profissionais sobre o desempenho do seu time.</p>
              </div>
            </div>

            {/* Notícia em Destaque (Marta) */}
            <h3 className="text-2xl font-bold mb-5 flex items-center border-b border-fuchsia-700 pb-2">
              <span className="text-red-500 mr-2 text-3xl">📰</span> NOTÍCIA EM FOCO
            </h3>
            {noticiaDestaque ? (
              <div className="bg-[#1C172C] rounded-xl p-5 mb-10 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 shadow-2xl border-l-4 border-fuchsia-500 transition duration-300 hover:shadow-fuchsia-900/50">
                {noticiaDestaque.imagem && (
                  <img
                    src={noticiaDestaque.imagem}
                    alt={noticiaDestaque.titulo}
                    className="w-full sm:w-28 h-28 object-cover rounded-lg shadow-xl flex-shrink-0"
                    onError={handleImageError}
                  />
                )}
                <p className="text-white text-center sm:text-left text-lg">
                  <strong className="text-fuchsia-400 font-bold uppercase block mb-1">{noticiaDestaque.titulo}</strong>: {noticiaDestaque.descricao}
                </p>
              </div>
            ) : (
              <p className="text-gray-400 mb-10 p-4 bg-[#1C172C] rounded-xl animate-pulse">Carregando notícia em destaque...</p>
            )}

            {/* Carrossel (Foco Feminino) */}
            <h3 className="text-2xl font-bold mb-5 flex items-center border-b border-fuchsia-700 pb-2">
              <span className="text-yellow-500 mr-2 text-3xl">🏆</span> DESTAQUES DO FUTEBOL FEMININO
            </h3>
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-10 shadow-2xl border-2 border-yellow-500/50">
              {noticias.length > 0 ? (
                <>
                  <img
                    src={
                      noticias[slideAtual]?.imagem ||
                      "https://placehold.co/300x200/222/FFF?text=Partida"
                    }
                    alt={noticias[slideAtual]?.titulo || "Partida"}
                    className="w-full h-full object-cover bg-gray-700 transition duration-500"
                    onError={handleImageError}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-5">
                    <p className="text-xl font-extrabold text-center text-yellow-300 drop-shadow-lg">{noticias[slideAtual]?.titulo || "Sem título"}</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 bg-gray-800 animate-pulse">
                  <p>Carregando partidas...</p>
                </div>
              )}
            </div>

            {/* Jogos Brasileirão Feminino (Resultados Recentes) */}
            <h3 className="text-2xl font-bold mb-5 flex items-center border-b border-fuchsia-700 pb-2">
              <span className="text-teal-400 mr-2 text-3xl">⚽</span> RESULTADOS FINAIS - CAMPEONATOS FEMININOS
            </h3>
            <div className="space-y-4 mb-10">
              {isLoadingRecentes ? (
                <>
                  <GameCardSkeleton /><GameCardSkeleton /><GameCardSkeleton />
                </>
              ) : (
                jogosFemininos.length > 0 ? (
                  jogosFemininos.map((jogo, index) => {
                    const timeCasa = jogo.homeTeam.name;
                    const timeFora = jogo.awayTeam.name;
                    const scoreCasa = jogo.score?.fullTime?.home ?? 0;
                    const scoreFora = jogo.score?.fullTime?.away ?? 0;
                    const rodada = jogo.matchday || "Resultado Recente"; // Adiciona a rodada
                    return (
                      <div
                        key={index}
                        className="bg-[#1C172C] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between shadow-lg border border-teal-800/50 hover:bg-[#2A233D] transition duration-300"
                      >
                          <div className="text-xs text-gray-400 mb-2 sm:mb-0 sm:order-last sm:w-1/4 text-center sm:text-right font-medium">{rodada}</div>

                        {/* Time Casa */}
                        <div className="flex items-center space-x-3 w-5/12 sm:w-auto">
                          <img
                            src={imagensTimes[timeCasa] || "https://placehold.co/50/555/FFF?text=Logo"}
                            alt={timeCasa}
                            className="w-10 h-10 object-contain"
                            onError={handleImageError}
                          />
                          <span className="text-white font-semibold text-lg truncate">{timeCasa}</span>
                        </div>

                        {/* Placar */}
                        <span className="text-2xl font-black text-teal-400 mx-4 flex-shrink-0 bg-[#2A233D] px-4 py-1 rounded-lg shadow-inner">
                          {scoreCasa} x {scoreFora}
                        </span>

                        {/* Time Visitante */}
                        <div className="flex items-center space-x-3 justify-end w-5/12 sm:w-auto text-right">
                          <span className="text-white font-semibold text-lg truncate">{timeFora}</span>
                          <img
                            src={imagensTimes[timeFora] || "https://placehold.co/50/555/FFF?text=Logo"}
                            alt={timeFora}
                            className="w-10 h-10 object-contain"
                            onError={handleImageError}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 p-4 bg-[#1C172C] rounded-xl">Nenhum resultado recente de jogos importantes encontrado.</p>
                )
              )}
            </div>

            {/* PRÓXIMOS JOGOS (Foco Feminino) - ATUALIZADO COM DATAS DE OUTUBRO */}
            <h3 className="text-2xl font-bold mb-5 flex items-center border-b border-fuchsia-700 pb-2">
              <span className="text-fuchsia-400 mr-2 text-3xl">📅</span> PRÓXIMOS JOGOS IMPORTANTES EM OUTUBRO
            </h3>
            <div className="space-y-4 mb-10">
              {isLoadingProximos ? (
                <>
                  <GameCardSkeleton /><GameCardSkeleton /><GameCardSkeleton />
                </>
              ) : (
                proximosJogos.length > 0 ? (
                  proximosJogos.map((jogo) => (
                    <div
                      key={jogo.id}
                      className="bg-[#2A233D] p-5 rounded-xl shadow-xl flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 border border-fuchsia-500/70"
                    >
                      {/* Time Casa */}
                      <div className="flex items-center space-x-4 w-full sm:w-1/3 justify-start">
                        <img
                          src={imagensTimes[jogo.time_casa.nome] || "https://placehold.co/50/555/FFF?text=Logo"}
                          alt={jogo.time_casa.nome}
                          className="w-10 h-10 object-contain"
                          onError={handleImageError}
                        />
                        <span className="text-white text-xl font-extrabold">{jogo.time_casa.nome}</span>
                      </div>

                      {/* Detalhes do Jogo (Centralizado e Separado) */}
                      {renderProximoJogoDetalhe(jogo)}

                      {/* Time Visitante */}
                      <div className="flex items-center space-x-4 justify-end w-full sm:w-1/3 text-right">
                        <span className="text-white text-xl font-extrabold">{jogo.time_visitante.nome}</span>
                        <img
                          src={imagensTimes[jogo.time_visitante.nome] || "https://placehold.co/50/555/FFF?text=Logo"}
                          alt={jogo.time_visitante.nome}
                          className="w-10 h-10 object-contain"
                          onError={handleImageError}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 p-4 bg-[#1C172C] rounded-xl">Nenhum próximo jogo importante encontrado.</p>
                )
              )}
            </div>

            {/* Vídeo */}
            <div className="bg-[#1C172C] p-6 rounded-xl text-center mb-10 shadow-2xl border border-fuchsia-700/50">
              <h3 className="font-bold text-2xl mb-4 text-pink-400">📺 CONFIRA O NOSSO VÍDEO DE ANÁLISE</h3>
              <iframe
                width="100%"
                height="250"
                className="rounded-xl border-4 border-fuchsia-500/50 shadow-inner shadow-fuchsia-900"
                src="https://www.youtube.com/embed/pr4wX4hCVLs"
                title="Passa a Bola"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Botões inferiores */}

                <div className="flex flex-wrap justify-center gap-4 pb-8 pt-4 border-t border-fuchsia-700/50">
                  <Link
                    to="/escalacao"  // Caminho da página de Escalacao
                    className="bg-pink-600 px-8 py-3 rounded-full font-bold text-white hover:bg-pink-700 transition shadow-lg transform hover:scale-105 min-w-[200px]"
                  >
                    <button
                      type="button" // Mantenha o tipo button
                      className="w-full h-full" // Faz com que o botão ocupe todo o espaço do Link
                    >
                      📋 Criar Escalações
                    </button>
                  </Link>

              <button className="bg-teal-600 px-8 py-3 rounded-full font-bold text-white hover:bg-teal-700 transition shadow-lg transform hover:scale-105 min-w-[200px]">
                👭 Adicionar Amigas
              </button>
            </div>
          </main>

          {/* BOTÃO FLUTUANTE DO CHATBOT NO INFERIOR DIREITO (MODIFICADO) */}
          <Link
            to="/chat"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-fuchsia-500/60 shadow-xl hover:from-purple-700 hover:to-fuchsia-600 transition duration-300 transform hover:scale-110"
            title="Abrir Chatbot"
          >
            {/* Ícone de Balão de Fala (Message Square) com tamanho aumentado */}
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </Link>
        </div>
      </>
    );
};

export default TelaFutebolFeminino;