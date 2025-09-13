// Escalacao.jsx
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom"; // pode remover se não usar

// ✅ IMAGENS FIXAS DAS JOGADORAS
const imagensFixas = {
  "Marta":
    "https://lendasdofutebol.com/wp-content/uploads/2023/02/perfil-marta-jogadora-optimized.jpg",
  "Bia Zaneratto":
    "https://f.i.uol.com.br/fotografia/2023/07/25/169031229164c01e638d798_1690312291_3x2_md.jpg",
  "Debinha":
    "https://img.olympics.com/images/image/private/t_1-1_300/f_auto/primary/s4j4ovxn1dfsx1bbgxd4",
  "Geyse":
    "https://midias.correiobraziliense.com.br/_midias/png/2023/07/18/675x450/1_geyce-28517551.png",
  "Antonia":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9BdzZ0wDIMjRKqEApPex0PGkm6wuvag8K7XA8l4YdKoFpwTWYWQusvTxWE1Zmqo9c5cU&usqp=CAU",
  "Rafaelle":
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTqHIoaUJhAmGtTMYoTBmFDchbW_oZF2jyRZtwHQygjvlWg-P-g96eZjRjRfsgD3cQM7XQozA-4NthJGm0fe4VrJIOLE0E4iKyiaXpYMA",
  "Andressa Alves":
    "https://midias.correiobraziliense.com.br/_midias/png/2023/07/18/1000x1000/1_andressa_alves-28517463.png?20230718122116?20230718122116",
  "Tamires":
    "https://pbs.twimg.com/profile_images/1813036866809028608/fdL5_Jpq_400x400.jpg",
  "Adriana":
    "https://s2-ge.glbimg.com/_k3V3bKJqDx-MV-lBLLPtJgr8R8=/0x0:640x506/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/X/y/VAzyKeT1m4sAa3UflCIA/339544313-2321885581331390-2863101517711701915-n.jpg",
  "Letícia":
    "https://f.i.uol.com.br/fotografia/2023/07/23/169013086264bd59ae0c823_1690130862_3x2_md.jpgg",
  "Camila":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Camila_Rodrigues_2023_03.jpg/960px-Camila_Rodrigues_2023_03.jpg",
  "Lauren":
    "https://midias.correiobraziliense.com.br/_midias/png/2023/07/18/1200x801/1_copadomundofeminina_selecaobrasileira_futebolfeminino_lauren_1_900x506-28517611.png?20230718123805?20230718123805",
  "Yasmim":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRinDXUDbbAuWyNtyNVu7-y9BdAjrHaSsMHMw&s",
  "Ary Borges":
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRpLbBbFQ9-TaXPRM1v3fhOxJpMRTEDqv9ZvHo-sydvEC6L5jofdvbNA1AE9r4-pQnZlvP9TaZB_rrJcPxaRbrxF3xFbQWkD8bjbq_arKU",
  "Kerolin":
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYGFYGY5r0lakUQofK6Pgxed-8s-nF7ip6jaeGV1yqee5geBfpF6iDlwAgA6FSjTEQjeNm5Cb7x3xH203ZMpdkAkLRNdM8_cTGU0_V_w",
  "Angelina":
    "https://www.cob.org.br/_next/image?url=https%3A%2F%2Fadmin.cob.org.br%2Fuploads%2FAngelina_prata_com_a_selecao_nos_Jogos_Paris_2024_ec81215a91.jpeg&w=3840&q=75",
  "Duda Sampaio":
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRRZUqE2eE_tFECr7weFEyynpQNCqZluw7qqNG2s3RE09GV-TwG0jzpET0tvUo7sqnHQHS_-t0LL3KRLAnx-ZV3nBu0yuiHF4OnoIT9C0ER",
  "Bruna Benites":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGfe_klBhVNWgDPWL-ym64mIVcwrimk5AXg&s",
  "Tainara":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn6VBm-J3wCEJS_PJQCkcCRX1qpDDifiYaMA&s",
  "Leticia":
    "https://f.i.uol.com.br/fotografia/2023/07/23/169013086264bd59ae0c823_1690130862_3x2_md.jpg",
  "Luciana":
    "https://www.esporteemacaooficial.com.br/uploads/images/2024/07/luciana-segue-com-os-treinamentos-da-selecao-brasileira-feminina-1f34a.jpg"
  
};

const jogadorasPorPosicao = {
  Goleiro: ["Leticia", "Camila", "Luciana"],
  Zagueiro: ["Rafaelle", "Lauren", "Tainara"],
  "Lateral Esq": ["Tamires", "Yasmim"],
  "Lateral Dir": ["Antonia", "Bruna Benites"],
  Volante: ["Ary Borges", "Duda Sampaio", "Angelina"],
  "Meia Esq": ["Andressa Alves", "Adriana"],
  "Meia Dir": ["Kerolin", "Ary Borges"],
  Atacante: ["Marta", "Bia Zaneratto", "Debinha", "Geyse"],
};

const formacoes = {
  "4-4-2": [
    { x: "50%", y: "90%", pos: "Goleiro" },
    { x: "15%", y: "75%", pos: "Lateral Esq" },
    { x: "40%", y: "75%", pos: "Zagueiro" },
    { x: "60%", y: "75%", pos: "Zagueiro" },
    { x: "85%", y: "75%", pos: "Lateral Dir" },
    { x: "20%", y: "50%", pos: "Meia Esq" },
    { x: "80%", y: "50%", pos: "Meia Dir" },
    { x: "40%", y: "55%", pos: "Volante" },
    { x: "60%", y: "55%", pos: "Volante" },
    { x: "40%", y: "20%", pos: "Atacante" },
    { x: "60%", y: "20%", pos: "Atacante" },
  ],
};

const FALLBACK =
  "https://via.placeholder.com/240x240.png?text=Sem+imagem";

async function fetchWikiThumbnail(name) {
  const endpoints = [
    `https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(
      name
    )}&pithumbsize=400&origin=*`,
    `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(
      name
    )}&pithumbsize=400&origin=*`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const pages = data?.query?.pages;
      const page = Object.values(pages || {})[0];
      if (page?.thumbnail?.source) {
        return page.thumbnail.source;
      }
    } catch (_) {}
  }
  return null;
}

export default function Escalacao() {
  const [formacao, setFormacao] = useState("4-4-2");
  const [jogadores, setJogadores] = useState({});
  const [selecionando, setSelecionando] = useState(null);
  const [imagens, setImagens] = useState({});

  // ✅ Carrega do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("escalacao");
    if (saved) {
      try {
        setJogadores(JSON.parse(saved));
      } catch (e) {
        console.warn("Erro ao carregar escalação:", e);
      }
    }
  }, []);

  // ✅ Salva no localStorage
  useEffect(() => {
    localStorage.setItem("escalacao", JSON.stringify(jogadores));
  }, [jogadores]);

  const selecionarJogadora = async (index, nome) => {
    setJogadores((prev) => ({ ...prev, [index]: nome }));
    setSelecionando(null);

    if (imagens[nome]) return;

    if (imagensFixas[nome]) {
      setImagens((prev) => ({ ...prev, [nome]: imagensFixas[nome] }));
      return;
    }

    setImagens((prev) => ({ ...prev, [nome]: "loading" }));
    const thumb = await fetchWikiThumbnail(nome);
    setImagens((prev) => ({
      ...prev,
      [nome]: thumb || FALLBACK,
    }));
  };

  const exportarImagem = () => {
    const area = document.getElementById("campo");
    html2canvas(area).then((canvas) => {
      const link = document.createElement("a");
      link.download = "minha_escalacao.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center p-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <div className="flex items-center gap-2">
          <img
            src="https://via.placeholder.com/40"
            alt="perfil"
            className="rounded-full w-10 h-10"
          />
          <span className="font-bold text-gray-800">FutboleirasFC</span>
        </div>

        <select
          value={formacao}
          onChange={(e) => setFormacao(e.target.value)}
          className="px-3 py-1 rounded bg-pink-200 text-gray-800 font-semibold"
        >
          {Object.keys(formacoes).map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <span className="text-sm font-bold text-gray-600">Créditos: 100</span>
      </div>

      {/* Campo com ID para exportar */}
      <div
        id="campo"
        className="relative w-full max-w-md aspect-[2/3] bg-green-600 rounded-lg overflow-hidden border-4 border-white"
      >
        {/* Linhas do campo */}
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[12%] border-2 border-white"></div>
        <div className="absolute bottom-0 left-1/3 w-1/3 h-[5%] border-2 border-white"></div>
        <div className="absolute top-0 left-1/4 w-1/2 h-[12%] border-2 border-white"></div>
        <div className="absolute top-0 left-1/3 w-1/3 h-[5%] border-2 border-white"></div>
        <div className="absolute left-1/2 top-1/2 w-24 h-24 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>

        {/* Jogadoras */}
        {formacoes[formacao].map((pos, index) => {
          const nomeSelecionado = jogadores[index];
          const imagemDaJogadora = nomeSelecionado
            ? imagens[nomeSelecionado]
            : null;

          return (
            <div
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: pos.x, top: pos.y }}
            >
              {selecionando === index ? (
                <div className="bg-pink-200 rounded-xl shadow-lg p-2 border border-pink-400 w-48">
                  <div className="text-xs text-gray-600 mb-2 px-1">
                    Escolha jogadora ({pos.pos})
                  </div>
                  <div className="max-h-48 overflow-auto">
                    {(jogadorasPorPosicao[pos.pos] || []).map((j) => (
                      <button
                        key={j}
                        onClick={() => selecionarJogadora(index, j)}
                        className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-pink-300 transition"
                      >
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center border">
                          {imagens[j] === "loading" ? (
                            <div className="w-4 h-4 rounded-full border-2 border-pink-400 animate-spin" />
                          ) : (
                            <img
                              src={imagens[j] || FALLBACK}
                              alt={j}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{j}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-right">
                    <button
                      onClick={() => setSelecionando(null)}
                      className="text-xs px-3 py-1 rounded-full bg-white/70 hover:bg-white"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="w-12 h-12 bg-pink-500 text-white flex items-center justify-center rounded-full cursor-pointer border-2 border-pink-300 hover:scale-105 transition overflow-hidden"
                  onClick={() => setSelecionando(index)}
                >
                  {nomeSelecionado ? (
                    imagemDaJogadora === "loading" ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white animate-spin" />
                    ) : (
                      <img
                        src={imagemDaJogadora || FALLBACK}
                        alt={nomeSelecionado}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <span className="text-lg font-bold">+</span>
                  )}
                </div>
              )}
              <span className="text-xs text-white font-semibold mt-1 text-center">
                {nomeSelecionado || pos.pos}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex justify-between gap-2 w-full max-w-md mt-4">
        <button className="px-4 py-2 rounded-lg bg-pink-300 font-semibold shadow">
          Início
        </button>
        <button className="px-4 py-2 rounded-lg bg-pink-300 font-semibold shadow">
          Adicionar amigo
        </button>
        <button
          onClick={exportarImagem}
          className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold shadow"
        >
          Exportar imagem
        </button>
      </div>
    </div>
  );
}