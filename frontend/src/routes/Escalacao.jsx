// Escalacao.jsx
import React, { useState, useEffect } from "react";
// import html2canvas from "html2canvas"; // A função 'html2canvas' será chamada diretamente.
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

// ✅ Imagens fixas das jogadoras (Mantido)
const imagensFixas = {
    "Marta": "https://lendasdofutebol.com/wp-content/uploads/2023/02/perfil-marta-jogadora-optimized.jpg",
    "Bia Zaneratto": "https://f.i.uol.com.br/fotografia/2023/07/25/169031229164c01e638d798_1690312291_3x2_md.jpg",
    "Debinha": "https://img.olympics.com/images/image/private/t_1-1_300/f_auto/primary/s4j4ovxn1dfsx1bbgxd4",
    "Geyse": "https://midias.correiobraziliense.com.br/_midias/png/2023/07/18/675x450/1_geyce-28517551.png",
    "Antonia": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9BdzZ0wDIMjRKqEApPex0PGkm6wuvag8K7XA8l4YdKoFpwTWYWQusrTxWE1Zmqo9c5cU&usqp=CAU",
    "Rafaelle": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTqHIoaUJhAmGtTMYoTBmFDchbW_oZF2jyRZtwHQygjvlWg-P-g96eZjRzTwHQygjvlWg-P-g96eZjRjRfsgD3cQM7XQozA-4NthJGm0fe4VrJIOLE0E4iKyiaXpYMA",
    "Andressa Alves": "https://midias.correiobraziliense.com.br/_midias/png/2023/07/18/1000x1000/1_andressa_alves-28517463.png?20230718122116",
    "Tamires": "https://pbs.twimg.com/profile_images/1813036866809028608/fdL5_Jpq_400x400.jpg",
    "Adriana": "https://s2-ge.glbimg.com/_k3V3bKJqDx-MV-lBLLPtJgr8R8=/0x0:640x506/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/X/y/VAzyKeT1m4sAa3UflCIA/339544313-2321885581331390-2863101517711701915-n.jpg",
    "Leticia": "https://f.i.uol.com.br/fotografia/2023/07/23/169013086264bd59ae0c823_1690130862_3x2_md.jpg",
    "Camila": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Camila_Rodrigues_2023_03.jpg/960px-Camila_Rodrigues_2023_03.jpg",
    "Lauren": "https://midias.correiobraziliense.com.br/_midias/png/2023/07/18/1200x801/1_copadomundofeminina_selecaobrasileira_futebolfeminino_lauren_1_900x506-28517611.png",
    "Yasmim": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRinDXUDbbAuWyNtyNVu7-y9BdAjrHaSsMHMw&s",
    "Ary Borges": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRpLbBbFQ9-TaXPRM1v3fhOxJpMRTEDqv9ZvHo-sydvEC6L5jofdvbNA1AE9r4-pQnZlvP9TaZB_rrJcPxaRbrxF3xFbQWkD8bjbq_arKU",
    "Kerolin": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQYGFYGY5r0lakUQofK6Pgxed-8s-nF7ip6jaeGV1yqee5geBfpF6iDlwAgA6FSjTEQjeNm5Cb7x3xH203ZMpdkAkLRNdM8_cTGU0_V_w",
    "Angelina": "https://www.cob.org.br/_next/image?url=https%3A%2F%2Fadmin.cob.org.br%2Fuploads%2FAngelina_prata_com_a_selecao_nos_Jogos_Paris_2024_ec8121215a91.jpeg&w=3840&q=75",
    "Duda Sampaio": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRRZUqE2eE_tFECr7weFEyynpQNCqZluw7qqNG2s3RE09GV-TwG0jzpET0tvUo7sqnHQHS_-t0LL3KRLAnx-ZV3nBu0yuiHF4OnoIT9C0ER",
    "Bruna Benites": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGfe_klBhVNWgDPWL-ym64mIVcwrimk5AXg&s",
    "Tainara": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn6VBm-J3wCEJS_PJQCkcCRX1qpDDifiYaMA&s",
    "Luciana": "https://www.esporteemacaooficial.com.br/uploads/images/2024/07/luciana-segue-com-os-treinamentos-da-selecao-brasileira-feminina-1f34a.jpg"
};

// ✅ Jogadoras por posição (Mantido)
const jogadorasPorPosicao = {
    Goleira: ["Leticia", "Camila", "Luciana"],
    Zagueira: ["Rafaelle", "Lauren", "Tainara"],
    "Lateral Esq": ["Tamires", "Yasmim"],
    "Lateral Dir": ["Antonia", "Bruna Benites"],
    Volante: ["Ary Borges", "Duda Sampaio", "Angelina"],
    "Meia Esq": ["Andressa Alves", "Adriana"],
    "Meia Dir": ["Kerolin", "Ary Borges"],
    Atacante: ["Marta", "Bia Zaneratto", "Debinha", "Geyse"],
};

// ✅ Formações (Mantido)
const formacoes = {
    "4-4-2": [
        { x: "50%", y: "90%", pos: "Goleira" },
        { x: "15%", y: "75%", pos: "Lateral Esq" },
        { x: "40%", y: "75%", pos: "Zagueira" },
        { x: "60%", y: "75%", pos: "Zagueira" },
        { x: "85%", y: "75%", pos: "Lateral Dir" },
        { x: "20%", y: "50%", pos: "Meia Esq" },
        { x: "80%", y: "50%", pos: "Meia Dir" },
        { x: "40%", y: "55%", pos: "Volante" },
        { x: "60%", y: "55%", pos: "Volante" },
        { x: "40%", y: "20%", pos: "Atacante" },
        { x: "60%", y: "20%", pos: "Atacante" },
    ],
    "4-3-3": [
        { x: "50%", y: "90%", pos: "Goleira" },
        { x: "15%", y: "75%", pos: "Lateral Esq" },
        { x: "40%", y: "75%", pos: "Zagueira" },
        { x: "60%", y: "75%", pos: "Zagueira" },
        { x: "85%", y: "75%", pos: "Lateral Dir" },
        { x: "33%", y: "55%", pos: "Volante" },
        { x: "50%", y: "50%", pos: "Meia Dir" },
        { x: "67%", y: "55%", pos: "Volante" },
        { x: "25%", y: "20%", pos: "Atacante" },
        { x: "50%", y: "15%", pos: "Atacante" },
        { x: "75%", y: "20%", pos: "Atacante" },
    ],
};

const FALLBACK = "https://via.placeholder.com/240x240.png?text=Sem+imagem";

// ✅ Busca imagens na Wikipedia (Mantido)
async function fetchWikiThumbnail(name) {
    const endpoints = [
        `https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(name)}&pithumbsize=400&origin=*`,
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(name)}&pithumbsize=400&origin=*`,
    ];

    for (const url of endpoints){ 
        try {
            const res = await fetch(url);
            if (!res.ok) continue;
            const data = await res.json();
            const pages = data?.query?.pages;
            const page = Object.values(pages || {})[0];
            if (page?.thumbnail?.source) return page.thumbnail.source;
        } catch (_) {}
    }
    return null;
}

export default function Escalacao() {
    // 1. ADICIONA O ESTADO PARA O NOME DO TIME
    const [nomeDoTime, setNomeDoTime] = useState("FutboleirasFC"); // Fallback para "FutboleirasFC"
    // ... outros estados
    const [formacao, setFormacao] = useState("4-4-2");
    const [jogadores, setJogadores] = useState({});
    const [selecionando, setSelecionando] = useState(null);
    const [imagens, setImagens] = useState({});
    const [escudoImagem, setEscudoImagem] = useState(null); 

    // Efeito para carregar a escalação, o escudo E O NOME DO TIME
    useEffect(() => {
        // --- Carrega Escalacao Salva ---
        const saved = localStorage.getItem("escalacao");
        if (saved) {
            try { setJogadores(JSON.parse(saved)); } 
            catch (e) { console.warn("Erro ao carregar escalação:", e); }
        }

        // --- LÓGICA DE CARREGAMENTO DO ESCUDO ---
        const savedEscudo = localStorage.getItem("escudo");
        if (savedEscudo) {
            try {
                const parsedEscudo = JSON.parse(savedEscudo);
                setEscudoImagem(parsedEscudo.imagem);
            } catch (e) {
                console.warn("Erro ao parsear dados do escudo:", e);
                setEscudoImagem(null);
            }
        }
        
        // 2. CARREGA O NOME DO TIME DO LOCALSTORAGE
        const nomeSalvo = localStorage.getItem("nomeDoTime");
        if (nomeSalvo) {
            setNomeDoTime(nomeSalvo);
        }
    }, []);

    // Efeito para salvar a escalação (Mantido)
    useEffect(() => {
        localStorage.setItem("escalacao", JSON.stringify(jogadores));
    }, [jogadores]);
    
    // ... Funções selecionarJogadora e exportarImagem (Mantidas)
    const selecionarJogadora = async (index, nome) => {
        setJogadores(prev => ({ ...prev, [index]: nome }));
        setSelecionando(null);
        if (imagens[nome]) return;
        if (imagensFixas[nome]) { setImagens(prev => ({ ...prev, [nome]: imagensFixas[nome] })); return; }
        setImagens(prev => ({ ...prev, [nome]: "loading" }));
        const thumb = await fetchWikiThumbnail(nome);
        setImagens(prev => ({ ...prev, [nome]: thumb || FALLBACK }));
    };

    const exportarImagem = () => {
        const area = document.getElementById("campo");
        if (typeof html2canvas === 'undefined') {
             console.error("A biblioteca html2canvas não está disponível. A função de exportar não funcionará.");
             return;
        }
        
        html2canvas(area, { useCORS: true, allowTaint: true }).then((canvas) => {
            const link = document.createElement("a");
            link.download = "minha_escalacao.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };

    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center p-4">
            {/* HEADER */}
            <div className="flex items-center justify-between w-full max-w-md mb-4 bg-white/70 p-3 rounded-xl shadow-lg border border-pink-200">
                <div className="flex items-center gap-2">
                    {/* Imagem do Escudo (Mantido) */}
                    {escudoImagem ? (
                        <img 
                            src={escudoImagem} 
                            alt="escudo do clube" 
                            className="w-12 h-12 rounded-full border-2 border-pink-400 object-cover shadow-md" 
                            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/40"; e.currentTarget.alt = "Erro ao carregar escudo"; }}
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center border-2 border-pink-400">
                            <Zap className="w-5 h-5 text-pink-600"/>
                        </div>
                    )}
                    {/* 3. EXIBE O NOME DO TIME CARREGADO */}
                    <span className="font-bold text-gray-800">{nomeDoTime}</span>
                </div>
                <select
                    value={formacao}
                    onChange={(e) => setFormacao(e.target.value)}
                    className="px-3 py-1 rounded bg-pink-300 text-pink-900 font-semibold border-2 border-pink-400 shadow-inner hover:bg-pink-400 transition"
                >
                    {Object.keys(formacoes).map((f) => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>
                <span className="text-sm font-bold text-gray-600">Créditos: 100</span>
            </div>

            {/* CAMPO (Mantido) */}
            <div id="campo" className="relative w-full max-w-md aspect-[2/3] bg-green-600 rounded-lg overflow-hidden border-4 border-white shadow-2xl">
                <div className="absolute bottom-0 left-1/4 w-1/2 h-[12%] border-2 border-white/80"></div>
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/80 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-1/3 w-1/3 h-[5%] border-2 border-white/80"></div>
                <div className="absolute top-0 left-1/4 w-1/2 h-[12%] border-2 border-white/80"></div>
                <div className="absolute top-0 left-1/3 w-1/3 h-[5%] border-2 border-white/80"></div>
                <div className="absolute left-1/2 top-1/2 w-24 h-24 border-2 border-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

                {/* Jogadoras (Mantido) */}
                {formacoes[formacao].map((pos, index) => {
                    const nomeSelecionado = jogadores[index];
                    const imagemDaJogadora = nomeSelecionado ? imagens[nomeSelecionado] : null;

                    return (
                        <div key={index} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10" style={{ left: pos.x, top: pos.y }}>
                            {selecionando === index ? (
                                <div className="bg-pink-50 p-3 rounded-xl shadow-2xl border-2 border-pink-400 w-52 z-20">
                                    <div className="text-sm font-bold text-pink-700 mb-2 px-1">Escolha jogadora ({pos.pos})</div>
                                    <div className="max-h-60 overflow-y-auto space-y-1">
                                        {(jogadorasPorPosicao[pos.pos] || []).map((j) => (
                                            <button key={j} onClick={() => selecionarJogadora(index, j)} className="flex items-center gap-3 w-full text-left p-2 rounded-lg bg-white hover:bg-pink-100 transition shadow-sm">
                                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border border-pink-300">
                                                    {imagens[j] === "loading" ? <Zap className="w-4 h-4 animate-spin text-pink-400" /> : <img src={imagens[j] || imagensFixas[j] || FALLBACK} alt={j} className="object-cover w-full h-full"/>}
                                                </div>
                                                <span className="text-gray-800 font-medium">{j}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setSelecionando(null)} className="text-xs mt-3 text-center block w-full text-pink-600 hover:text-pink-800 font-semibold underline">Cancelar</button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setSelecionando(index)}
                                    className="bg-white rounded-full border-4 border-pink-500 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center overflow-hidden transition-transform transform hover:scale-105 shadow-xl"
                                    title={`Posição: ${pos.pos}\nClique para escolher jogadora`}
                                >
                                    {imagemDaJogadora === "loading" ? <Zap className="w-6 h-6 animate-spin text-pink-500"/> : imagemDaJogadora ? (
                                        <img src={imagemDaJogadora} alt={nomeSelecionado} className="object-cover w-full h-full" onError={(e)=>{e.currentTarget.src=FALLBACK}}/>
                                    ) : <span className="text-pink-500 text-lg font-extrabold">+</span>}
                                </button>
                            )}
                            <span className="text-xs mt-1 text-white font-semibold drop-shadow-md max-w-20 truncate bg-pink-700/80 px-2 py-0.5 rounded-full backdrop-blur-sm">{nomeSelecionado || pos.pos}</span>
                        </div>
                    );
                })}
            </div>

            {/* BOTÕES (Mantido) */}
            <div className="flex gap-4 mt-8">
                <button onClick={exportarImagem} className="bg-pink-600 px-6 py-3 rounded-full text-white font-extrabold hover:bg-pink-700 transition transform hover:scale-[1.02] shadow-xl shadow-pink-300/50 uppercase">Exportar Escalação</button>
                <Link to="/Escudo" className="bg-gray-300 px-6 py-3 rounded-full text-gray-800 font-semibold hover:bg-gray-400 transition shadow-lg uppercase">Editar Escudo</Link>
            </div>
        </div>
    );
}