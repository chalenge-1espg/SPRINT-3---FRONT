// Escalacao.jsx
import React, { useState, useEffect, useRef } from "react";
// ⚠️ IMPORTANTE: Certifique-se de que 'html2canvas' está instalado e importado.
// Se não estiver instalado, use: npm install html2canvas ou yarn add html2canvas
import html2canvas from "html2canvas"; 
import { Link } from "react-router-dom";
import { Zap, Home, Image as ImageIcon, X, Settings } from "lucide-react";

const FALLBACK = "https://via.placeholder.com/240x240.png?text=Sem+imagem";

// Componente CampoFutsal
const CampoFutsal = () => (
    // Fundo azul escuro (piso da quadra)
    <div className="absolute inset-0 bg-blue-800 border-4 border-white shadow-inner">
        {/* Linhas externas */}
        <div className="absolute inset-2 border-2 border-white/80"></div>
        
        {/* Linha central */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/80 -translate-y-1/2"></div>
        
        {/* Círculo central */}
        <div className="absolute left-1/2 top-1/2 w-20 h-20 border-2 border-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Ponto central */}
        <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

        {/* Áreas do gol - lado de baixo (Goleira) */}
        <div className="absolute bottom-0 left-1/4 w-1/2 h-[10%] border-2 border-white/80 border-t-0"></div>
        <div className="absolute bottom-0 left-1/2 w-0 h-[10%] border-l-2 border-white/80 -translate-x-1/2"></div>
        
        {/* Marcas de pênalti (aproximado) */}
        <div className="absolute bottom-[20%] left-1/4 w-1/2 h-[2px] bg-white/80"></div>
        <div className="absolute bottom-[20%] left-1/2 w-2 h-2 bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Áreas do gol - lado de cima (Atacantes) */}
        <div className="absolute top-0 left-1/4 w-1/2 h-[10%] border-2 border-white/80 border-b-0"></div>
        <div className="absolute top-0 left-1/2 w-0 h-[10%] border-l-2 border-white/80 -translate-x-1/2"></div>
        
        {/* Marcas de pênalti (aproximado) */}
        <div className="absolute top-[20%] left-1/4 w-1/2 h-[2px] bg-white/80"></div>
        <div className="absolute top-[20%] left-1/2 w-2 h-2 bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
);


export default function Escalacao() {
    const [nomeDoTime, setNomeDoTime] = useState("FutboleirasFC");
    const [formacao, setFormacao] = useState("4-4-2");
    const [selecionando, setSelecionando] = useState(null);
    const [escudoImagem, setEscudoImagem] = useState(null);
    const [imagensPersonalizadas, setImagensPersonalizadas] = useState({});
    const [nomesPersonalizados, setNomesPersonalizados] = useState({});
    const [golsJogadoras, setGolsJogadoras] = useState({}); 
    const [tipoDeCampo, setTipoDeCampo] = useState("futebol"); 
    const [mostrarOpcoesCampo, setMostrarOpcoesCampo] = useState(false);

    const fileInputRef = useRef(null);

    // ✅ FORMAÇÕES
    const formacoesFutsal = {
        "4-0": [
            { x: "50%", y: "90%", pos: "Goleira" },
            { x: "30%", y: "70%", pos: "Fixo" },
            { x: "70%", y: "70%", pos: "Fixo" },
            { x: "30%", y: "30%", pos: "Ala" },
            { x: "70%", y: "30%", pos: "Ala" },
        ],
        "3-1": [
            { x: "50%", y: "90%", pos: "Goleira" },
            { x: "50%", y: "65%", pos: "Fixo" },
            { x: "25%", y: "45%", pos: "Ala Esq" },
            { x: "75%", y: "45%", pos: "Ala Dir" },
            { x: "50%", y: "25%", pos: "Pivô" },
        ],
    };

    const formacoesFutebol = {
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
    
    // ✅ Determina o conjunto de formações
    const formacoesAtuais = tipoDeCampo === 'futsal' ? formacoesFutsal : formacoesFutebol;

    // Efeito para carregar o estado salvo do localStorage
    useEffect(() => {
        // ... Carregamento de Escudo, Nome do Time, Imagens, Nomes Personalizados, Gols (Mantido) ...
        const savedEscudo = localStorage.getItem("escudo");
        if (savedEscudo) { try { const parsedEscudo = JSON.parse(savedEscudo); setEscudoImagem(parsedEscudo.imagem); } catch (e) { setEscudoImagem(null); } }
        
        const nomeSalvo = localStorage.getItem("nomeDoTime");
        if (nomeSalvo) { setNomeDoTime(nomeSalvo); }

        const savedCustomImages = localStorage.getItem("imagensPersonalizadas");
        if (savedCustomImages) { try { setImagensPersonalizadas(JSON.parse(savedCustomImages)); } catch (e) { console.warn("Erro ao carregar imagens personalizadas:", e); } }

        const savedCustomNames = localStorage.getItem("nomesPersonalizados");
        if (savedCustomNames) { try { setNomesPersonalizados(JSON.parse(savedCustomNames)); } catch (e) { console.warn("Erro ao carregar nomes personalizados:", e); } }

        const savedGols = localStorage.getItem("golsJogadoras");
        if (savedGols) { try { setGolsJogadoras(JSON.parse(savedGols)); } catch (e) { console.warn("Erro ao carregar gols das jogadoras:", e); } }
        
        // ✅ CARREGA TIPO DE CAMPO E DEFINE A FORMAÇÃO ATUAL SALVA
        const savedTipo = localStorage.getItem("tipoDeCampo");
        const savedFormacao = localStorage.getItem("formacao");
        
        if (savedTipo) {
            setTipoDeCampo(savedTipo);
            
            const conjuntoFormacoes = savedTipo === 'futsal' ? formacoesFutsal : formacoesFutebol;
            
            if (savedFormacao && conjuntoFormacoes[savedFormacao]) {
                setFormacao(savedFormacao);
            } else {
                setFormacao(Object.keys(conjuntoFormacoes)[0]); // Pega o primeiro como padrão
            }
        }
    }, []);

    // 🆕 EFEITO para salvar o tipo de campo e FORMAÇÃO
    useEffect(() => {
        localStorage.setItem("tipoDeCampo", tipoDeCampo);
        localStorage.setItem("formacao", formacao);
    }, [tipoDeCampo, formacao]);

    // EFEITOS DE SALVAMENTO (Mantidos)
    useEffect(() => { localStorage.setItem("imagensPersonalizadas", JSON.stringify(imagensPersonalizadas)); }, [imagensPersonalizadas]);
    useEffect(() => { localStorage.setItem("nomesPersonalizados", JSON.stringify(nomesPersonalizados)); }, [nomesPersonalizados]);
    useEffect(() => { localStorage.setItem("golsJogadoras", JSON.stringify(golsJogadoras)); }, [golsJogadoras]);


    // ✅ FUNÇÃO PARA EXPORTAR IMAGEM (Corrigida e única)
    const exportarImagem = () => {
        const area = document.getElementById("campo");
        
        if (typeof html2canvas === 'undefined') {
            alert("A função de exportar requer a biblioteca html2canvas.");
            return;
        }
        
        html2canvas(area, { useCORS: true, allowTaint: true }).then((canvas) => {
            const link = document.createElement("a");
            link.download = "minha_escalacao.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };
    
    // ✅ FUNÇÃO PARA LIDAR COM O UPLOAD DA IMAGEM (Mantida e única)
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && selecionando !== null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagensPersonalizadas(prev => ({ ...prev, [selecionando]: reader.result }));
                if (!nomesPersonalizados[selecionando]) {
                    setNomesPersonalizados(prev => ({ ...prev, [selecionando]: "Nome Jogadora" }));
                }
                setSelecionando(null);
            };
            reader.readAsDataURL(file);
        }
    };

    // ✅ FUNÇÃO PARA REMOVER A IMAGEM PERSONALIZADA (Mantida e única)
    const handleRemoveCustomImage = (index) => {
        setImagensPersonalizadas(prev => {
            const newImagens = { ...prev };
            delete newImagens[index];
            return newImagens;
        });
        setNomesPersonalizados(prev => {
            const newNomes = { ...prev };
            delete newNomes[index];
            return newNomes;
        });
        setGolsJogadoras(prev => {
            const newGols = { ...prev };
            delete newGols[index];
            return newGols;
        });
        setSelecionando(null);
    };

    // ✅ FUNÇÃO PARA LIDAR COM A EDIÇÃO DO NOME (Mantida e única)
    const handleNameChange = (e) => {
        if (selecionando !== null) {
            setNomesPersonalizados(prev => ({ ...prev, [selecionando]: e.target.value }));
        }
    };

    // ✅ FUNÇÃO PARA LIDAR COM A EDIÇÃO DOS GOLS INDIVIDUAIS (Mantida e única)
    const handleGoalsChange = (e) => {
        if (selecionando !== null) {
            const value = Math.max(0, parseInt(e.target.value, 10) || 0);
            setGolsJogadoras(prev => ({ ...prev, [selecionando]: value }));
        }
    };


    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center p-4">
            {/* Input de arquivo oculto */}
            <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                style={{ display: 'none' }} 
            />

            {/* HEADER com Seletor de Campo */}
            <div className="flex items-center justify-between w-full max-w-md mb-4 bg-white/70 p-3 rounded-xl shadow-lg border border-pink-200">
                <div className="flex items-center gap-2">
                    {/* Escudo */}
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
                    <span className="font-bold text-gray-800">{nomeDoTime}</span>
                </div>
                
                {/* Seletor de Formação (Muda baseado no tipoDeCampo) */}
                <select
                    value={formacao}
                    onChange={(e) => setFormacao(e.target.value)}
                    className="px-3 py-1 rounded bg-pink-300 text-pink-900 font-semibold border-2 border-pink-400 shadow-inner hover:bg-pink-400 transition"
                >
                    {/* ✅ Mapeia as formações do conjunto atual */}
                    {Object.keys(formacoesAtuais).map((f) => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>

                {/* Botão para Opções de Campo */}
                <button
                    onClick={() => setMostrarOpcoesCampo(!mostrarOpcoesCampo)}
                    className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition shadow-md"
                    title="Mudar Tipo de Campo"
                >
                    <Settings className="w-5 h-5"/>
                </button>
            </div>
            
            {/* Opções de Campo (aparece se mostrarOpcoesCampo for true) */}
            {mostrarOpcoesCampo && (
                <div className="w-full max-w-md mb-4 p-3 bg-white/70 rounded-xl shadow-lg border border-pink-200 flex gap-4 justify-center">
                    <button
                        onClick={() => { setTipoDeCampo('futebol'); setFormacao(Object.keys(formacoesFutebol)[0]); setMostrarOpcoesCampo(false); }}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${tipoDeCampo === 'futebol' ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Futebol (Grama)
                    </button>
                    <button
                        onClick={() => { setTipoDeCampo('futsal'); setFormacao(Object.keys(formacoesFutsal)[0]); setMostrarOpcoesCampo(false); }}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${tipoDeCampo === 'futsal' ? 'bg-blue-700 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        Futsal (Azul)
                    </button>
                </div>
            )}


            {/* CAMPO DINÂMICO */}
            <div id="campo" className="relative w-full max-w-md aspect-[2/3] rounded-lg overflow-hidden border-4 border-white shadow-2xl">
                
                {/* Renderiza o campo de acordo com o estado tipoDeCampo */}
                {tipoDeCampo === 'futsal' ? (
                    <CampoFutsal />
                ) : (
                    // Campo de Futebol (Grama) - Padrão
                    <div className="absolute inset-0 bg-green-600">
                        <div className="absolute bottom-0 left-1/4 w-1/2 h-[12%] border-2 border-white/80"></div>
                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/80 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-1/3 w-1/3 h-[5%] border-2 border-white/80"></div>
                        <div className="absolute top-0 left-1/4 w-1/2 h-[12%] border-2 border-white/80"></div>
                        <div className="absolute top-0 left-1/3 w-1/3 h-[5%] border-2 border-white/80"></div>
                        <div className="absolute left-1/2 top-1/2 w-24 h-24 border-2 border-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white/80 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                )}
                

                {/* Jogadoras (posicionamento baseado na formacaoAtuais) */}
                {/* ⚠️ Nota: formacoesAtuais[formacao] pode ser undefined se o estado de formação estiver desatualizado ao trocar de campo. */}
                {(formacoesAtuais[formacao] || []).map((pos, index) => { // ✅ Adicionado (|| []) para evitar erro se 'formacao' for inválida
                    const imagemPersonalizada = imagensPersonalizadas[index]; 
                    const nomeExibido = nomesPersonalizados[index] || pos.pos;
                    const golsMarcados = golsJogadoras[index] || 0; 

                    return (
                        <div key={index} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10" style={{ left: pos.x, top: pos.y }}>
                            {selecionando === index ? (
                                <div className="bg-pink-50 p-3 rounded-xl shadow-2xl border-2 border-pink-400 w-52 z-20">
                                    <div className="text-sm font-bold text-pink-700 mb-2 px-1">Posição: {pos.pos}</div>
                                    
                                    <div className="mb-2">
                                        <label htmlFor={`nome-jogadora-${index}`} className="block text-xs font-semibold text-gray-600 mb-1">Nome da Jogadora:</label>
                                        <input
                                            type="text"
                                            id={`nome-jogadora-${index}`}
                                            value={nomesPersonalizados[index] || ""}
                                            onChange={handleNameChange}
                                            placeholder="Digite o nome"
                                            className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label htmlFor={`gols-jogadora-${index}`} className="block text-xs font-semibold text-gray-600 mb-1">Gols Marcados:</label>
                                        <input
                                            type="number"
                                            min="0"
                                            id={`gols-jogadora-${index}`}
                                            value={golsJogadoras[index] || 0}
                                            onChange={handleGoalsChange}
                                            placeholder="0"
                                            className="w-full p-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        />
                                    </div>

                                    <div className="flex gap-2 mb-2 p-1 border-b border-pink-200">
                                        <button 
                                            onClick={() => fileInputRef.current.click()} 
                                            className="flex items-center justify-center gap-1 w-full text-center text-sm font-semibold p-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition shadow-sm"
                                        >
                                            <ImageIcon className="w-4 h-4"/> Anexar Imagem
                                        </button>
                                        
                                        {imagemPersonalizada && (
                                            <button 
                                                onClick={() => handleRemoveCustomImage(index)} 
                                                className="flex items-center justify-center gap-1 w-full text-center text-sm font-semibold p-2 rounded-lg bg-red-400 text-white hover:bg-red-500 transition shadow-sm"
                                                title="Remover imagem personalizada"
                                            >
                                                <X className="w-4 h-4"/> Remover
                                            </button>
                                        )}
                                    </div>
                                    
                                    <button onClick={() => setSelecionando(null)} className="text-xs mt-3 text-center block w-full text-pink-600 hover:text-pink-800 font-semibold underline">Fechar</button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setSelecionando(index)}
                                        className="bg-white rounded-full border-4 border-pink-500 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center overflow-hidden transition-transform transform hover:scale-105 shadow-xl"
                                        title={`Posição: ${pos.pos}\nClique para editar`}
                                    >
                                        {imagemPersonalizada ? (
                                            <img 
                                                src={imagemPersonalizada} 
                                                alt={nomeExibido} 
                                                className="object-cover w-full h-full" 
                                                onError={(e)=>{e.currentTarget.src=FALLBACK}}
                                            />
                                        ) : <span className="text-pink-500 text-lg font-extrabold">+</span>}
                                    </button>
                                    
                                    <div className="flex flex-col items-center mt-1">
                                        <span className="text-xs text-white font-semibold drop-shadow-md max-w-20 truncate bg-pink-700/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                            {nomeExibido}
                                        </span>
                                        
                                        {golsMarcados > 0 && (
                                            <span className="text-[10px] mt-0.5 bg-yellow-400 text-black font-extrabold px-1.5 py-0.5 rounded-full shadow-md">
                                                ⚽ {golsMarcados}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* BOTÕES (Mantido) */}
            <div className="flex flex-col gap-4 mt-8 w-full max-w-xs"> 
                
                <Link 
                    to="/home" 
                    className="flex items-center justify-center gap-2 bg-fuchsia-600 px-6 py-3 rounded-3xl text-white font-extrabold hover:bg-fuchsia-700 transition transform hover:scale-[1.02] shadow-xl shadow-fuchsia-300/50 uppercase tracking-wider text-lg"
                >
                    <Home className="w-6 h-6"/>
                    Home
                </Link>

                <button onClick={exportarImagem} className="bg-pink-600 px-6 py-3 rounded-3xl text-white font-extrabold hover:bg-pink-700 transition transform hover:scale-[1.02] shadow-xl shadow-pink-300/50 uppercase tracking-wider text-lg">
                    Exportar Escalação
                </button>
                <Link to="/Escudo" className="bg-gray-300 px-6 py-3 rounded-3xl text-gray-800 font-semibold hover:bg-gray-400 transition shadow-lg uppercase tracking-wider text-lg">
                    Editar Escudo
                </Link>
            </div>
        </div>
    );
}