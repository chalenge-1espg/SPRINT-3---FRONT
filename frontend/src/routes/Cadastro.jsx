import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Shield, Zap, Heart, ChevronDown } from 'lucide-react';

// ✅ Logos dos times (Mantidas as URLs corrigidas)
const timesFemininoSerieA = [
    { name: "Escolha o time...", logo: null, value: "" }, 
    { name: "Corinthians", logo: "https://http2.mlstatic.com/D_615736-MLB69103708176_042023-C.jpg", value: "Corinthians" },
    { name: "Palmeiras", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/250px-Palmeiras_logo.svg.png", value: "Palmeiras" },
    { name: "São Paulo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/770px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png", value: "São Paulo" },
    { name: "Santos", logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/0/03/Escudo_do_Santos_Futebol_Clube.png/250px-Escudo_do_Santos_Futebol_Clube.png", value: "Santos" },
    { name: "Internacional", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/1200px-Escudo_do_Sport_Club_Internacional.svg.png", value: "Internacional" },
    { name: "Grêmio", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gremio_logo.svg/859px-Gremio_logo.svg.png", value: "Grêmio" },
    { name: "Flamengo", logo: "https://i.pinimg.com/736x/32/7b/21/327b21b580553d5ef274b782aaa65eaf.jpg", value: "Flamengo" },
    { name: "Botafogo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/681px-Botafogo_de_Futebol_e_Regatas_logo.svg.png", value: "Botafogo" },
    { name: "Cruzeiro", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/250px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png", value: "Cruzeiro" },
    { name: "Atlético-MG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/250px-Atletico_mineiro_galo.png", value: "Atlético-MG" },
    { name: "Ferroviária", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Escudo_Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes.png/1107px-Escudo_Associa%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Esportes.png", value: "Ferroviária" },
    { name: "Avaí/Kindermann", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Avai_FC_%2805-E%29_-_SC.svg/945px-Avai_FC_%2805-E%29_-_SC.svg.png", value: "Avaí/Kindermann" },
    { name: "Real Brasília", logo: "https://upload.wikimedia.org/wikipedia/pt/4/40/RealBras%C3%ADliaFC.png", value: "Real Brasília" },
    { name: "Fluminense", logo: "https://w7.pngwing.com/pngs/127/452/png-transparent-fluminense-fc-campeonato-brasileiro-serie-a-clube-de-regatas-do-flamengo-fluminense-de-feira-futebol-clube-brazil-football-emblem-logo-sports-thumbnail.png", value: "Fluminense" },
    { name: "América-MG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Escudo_do_America_Futebol_Clube.svg/1742px-Escudo_do_America_Futebol_Clube.svg.png", value: "América-MG" }
];

const Cadastro = () => {
    const navigate = useNavigate();
    
    // Estados do formulário
    const [teamName, setTeamName] = useState("");
    const [technicianName, setTechnicianName] = useState("");
    const [accompaniedTeam, setAccompaniedTeam] = useState(timesFemininoSerieA[0].value); 
    const [favoritePlayer, setFavoritePlayer] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

    // Validação
    const isFormValid = teamName.trim() !== "" && 
                        technicianName.trim() !== "" && 
                        accompaniedTeam !== timesFemininoSerieA[0].value;

    const handleSubmit = () => {
        if (!isFormValid) return;

        // Salva todos os dados
        localStorage.setItem("nomeDoTime", teamName.trim());
        localStorage.setItem("cadastroCompleto", JSON.stringify({
            teamName: teamName.trim(),
            technicianName: technicianName.trim(),
            accompaniedTeam,
            favoritePlayer: favoritePlayer.trim()
        }));

        navigate("/escudo");
    };

    const selectedTeamObject = timesFemininoSerieA.find(
        (team) => team.value === accompaniedTeam
    );

    return (
        // Fundo escuro profundo com degradê para sensação de profundidade
        <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-fixed p-6" 
             style={{ backgroundImage: 'linear-gradient(to bottom right, #1a202c, #312651)' }}>
            
            {/* Card com efeito Glassmorphism sutil e Shadow profissional */}
            <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-10 border border-purple-100/50 transition duration-300 hover:shadow-purple-500/40">
                
                {/* Cabeçalho */}
                <header className="mb-8 border-b pb-4 border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Seja Bem-Vindo(a),
                    </h1>
                    <p className="text-lg text-purple-700 font-medium mt-1 uppercase">
                        Área de Cadastro da Técnica ⚽
                    </p>
                </header>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    
                    {/* Campos de Input Refatorados */}
                    {[
                        { id: "teamName", label: "Nome do Time!", icon: Shield, placeholder: "Ex: Guerreiras do Amanhã", state: teamName, setState: setTeamName, required: true },
                        { id: "technicianName", label: "Nome do Técnico(a)", icon: User, placeholder: "Seu nome completo", state: technicianName, setState: setTechnicianName, required: true },
                        { id: "favoritePlayer", label: "Jogadora Favorita", icon: Zap, placeholder: "Ex: Marta, Debinha (Opcional)", state: favoritePlayer, setState: setFavoritePlayer, required: false },
                    ].map(({ id, label, icon: Icon, placeholder, state, setState, required }) => (
                        <div key={id} className="group relative">
                            <label htmlFor={id} className="mb-1 block text-sm font-semibold text-gray-700">
                                <Icon className="inline-block w-4 h-4 mr-2 text-purple-600" />
                                {label} {required && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type="text"
                                id={id}
                                placeholder={placeholder}
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:border-purple-600 focus:ring-2 focus:ring-purple-300 outline-none transition duration-200 placeholder-gray-400 text-gray-900 shadow-sm"
                                required={required}
                            />
                        </div>
                    ))}
                    
                    {/* Campo: Qual time acompanha? (CUSTOM DROPDOWN COM LOGOS) */}
                    <div className="group relative z-10">
                        <label htmlFor="accompaniedTeam" className="mb-1 block text-sm font-semibold text-gray-700">
                            <Heart className="inline-block w-4 h-4 mr-2 text-purple-600" />
                            Qual time acompanha? <span className="text-red-500">*</span>
                        </label>
                        
                        {/* Botão para abrir/fechar o dropdown */}
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-left flex items-center justify-between text-gray-900 cursor-pointer focus:border-purple-600 focus:ring-2 focus:ring-purple-300 outline-none transition duration-200 hover:border-purple-400 shadow-sm"
                        >
                            {selectedTeamObject && selectedTeamObject.logo && (
                                <img
                                    src={selectedTeamObject.logo}
                                    alt={`${selectedTeamObject.name} logo`}
                                    className="w-5 h-5 mr-3 object-contain"
                                />
                            )}
                            <span className={`flex-grow truncate ${accompaniedTeam === timesFemininoSerieA[0].value ? 'text-gray-500 italic' : 'text-gray-900 font-medium'}`}>
                                {selectedTeamObject && selectedTeamObject.name !== timesFemininoSerieA[0].name 
                                    ? selectedTeamObject.name 
                                    : "Escolha o time..."}
                            </span>
                            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Lista de opções do dropdown */}
                        {isDropdownOpen && (
                            <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto z-20">
                                {timesFemininoSerieA.map((time) => (
                                    <button
                                        key={time.value || time.name}
                                        type="button"
                                        onClick={() => {
                                            setAccompaniedTeam(time.value);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`flex items-center w-full p-3 text-sm hover:bg-purple-50 transition-colors duration-150 ${time.value === accompaniedTeam ? 'bg-purple-100 font-bold' : 'font-medium'} ${time.value === "" ? 'text-gray-500 italic' : 'text-gray-800'}`}
                                        disabled={time.value === ""}
                                    >
                                        {time.logo && (
                                            <img
                                                src={time.logo}
                                                alt={`${time.name} logo`}
                                                className="w-5 h-5 mr-3 object-contain"
                                            />
                                        )}
                                        {time.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                        // Botão robusto, com cor sólida e efeito de "pressionar"
                        className="w-full mt-10 rounded-lg bg-purple-700 py-3.5 text-lg font-bold text-white shadow-lg transition duration-150 hover:bg-purple-800 active:bg-purple-900 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:bg-gray-400 disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                        Avançar
                    </button>
                    
                    {!isFormValid && (
                        <p className="text-center text-xs text-red-600 font-medium pt-2">
                            Preencha todos os campos obrigatórios (*) para continuar.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Cadastro;