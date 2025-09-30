import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Square, Circle, Triangle, Upload, Camera, Sparkles } from "lucide-react"; 
import classNames from 'classnames';

const TelaEscolhaEscudo = () => {
    const fileInputRef = useRef(null);
    const [imagemEscudo, setImagemEscudo] = useState(null);
    const [escudoSelecionado, setEscudoSelecionado] = useState("circulo"); 
    const [isHovering, setIsHovering] = useState(false); 

    // --- Lógica de LocalStorage (Persistência) ---

    // 1. Função para SALVAR no LocalStorage
    // O useCallback é crucial aqui para evitar que a função mude e cause loops no useEffect
    const atualizarLocalStorage = useCallback((tipo, imagem) => {
        // Salva um objeto JSON que contém o tipo do escudo e a imagem (Base64)
        localStorage.setItem(
            "escudo",
            JSON.stringify({ tipo: tipo, imagem: imagem })
        );
    }, []);

    // 2. Efeito para CARREGAR os dados salvos ao iniciar
    useEffect(() => {
        const storedEscudo = localStorage.getItem("escudo");
        if (storedEscudo) {
            try {
                const { tipo, imagem } = JSON.parse(storedEscudo);
                setEscudoSelecionado(tipo || "circulo");
                setImagemEscudo(imagem || null);
            } catch (e) {
                console.error("Erro ao carregar escudo do localStorage:", e);
            }
        }
    }, []);

    // 3. Efeito para SALVAR os dados sempre que 'escudoSelecionado' ou 'imagemEscudo' mudar
    useEffect(() => {
        atualizarLocalStorage(escudoSelecionado, imagemEscudo);
    }, [escudoSelecionado, imagemEscudo, atualizarLocalStorage]);

    // --- Handlers ---
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // reader.result é a string Base64 da imagem que será salva
                setImagemEscudo(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEscudoClick = (tipoEscudo) => {
        setEscudoSelecionado(tipoEscudo);
        // Ao mudar o formato, a imagem deve ser resetada, a menos que você queira que ela persista. 
        // No seu código original, ela é resetada, então mantemos:
        // setImagemEscudo(null); 
    };

    // --- Subcomponente 1: EscudoOpcao (Botões de Seleção) ---
    const EscudoOpcao = ({ tipo, shapeClasses, Icon }) => {
        const isSelected = escudoSelecionado === tipo;
        const commonClasses = "w-16 h-16 bg-fuchsia-900/50 backdrop-blur-sm cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-xl relative";
        
        const selectedClasses = isSelected
            ? "border-4 border-lime-400 ring-2 ring-lime-300/50" 
            : "border border-fuchsia-800 hover:border-lime-400";
        
        let style = {};
        if (tipo === "triangulo") {
            style = { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" };
        }

        return (
            <button
                type="button" 
                title={`Selecionar formato ${tipo}`}
                className={classNames(commonClasses, shapeClasses, selectedClasses)}
                style={style}
                onClick={() => handleEscudoClick(tipo)}
            >
                <Icon className={classNames("w-8 h-8", isSelected ? 'text-lime-400' : 'text-fuchsia-300')} />
                {isSelected && <Sparkles className="absolute w-5 h-5 text-lime-400 top-[-10px] right-[-10px]" fill="currentColor" />}
            </button>
        );
    };

    // --- Subcomponente 2: EscudoPreview (Visualização) ---
    const EscudoPreview = () => {
        
        const getShapeStyles = (tipo) => {
            let shapeClasses = "";
            let containerStyle = {};
            switch (tipo) {
                case "quadrado": shapeClasses = "rounded-xl"; break;
                case "circulo": shapeClasses = "rounded-full"; break;
                case "triangulo": containerStyle = { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }; break;
                default: shapeClasses = "rounded-full";
            }
            return { shapeClasses, containerStyle };
        };

        const { shapeClasses, containerStyle } = getShapeStyles(escudoSelecionado);
        
        const baseClasses = "relative w-40 h-40 flex items-center justify-center overflow-hidden transition-all duration-300 border-4 cursor-pointer";
        const borderColor = imagemEscudo ? "border-lime-400" : "border-fuchsia-600";
        const shadowClass = "shadow-2xl shadow-fuchsia-900/50";
        const hoverScale = isHovering ? "scale-[1.05]" : "scale-100";

        return (
            <div
                className={classNames(baseClasses, shapeClasses, borderColor, shadowClass, hoverScale)}
                style={containerStyle}
                onClick={handleButtonClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {imagemEscudo ? (
                    <>
                        <img
                            src={imagemEscudo} // String Base64 da imagem
                            alt="Pré-visualização do Escudo"
                            className={classNames("w-full h-full object-cover transition-opacity duration-300", shapeClasses)}
                            style={containerStyle}
                        />
                        <div className={classNames("absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-200", shapeClasses, {'opacity-100': isHovering})}>
                             <Camera className="w-8 h-8 text-white/90" />
                        </div>
                    </>
                ) : (
                    <div className={classNames("w-full h-full bg-fuchsia-900/40 flex flex-col items-center justify-center text-fuchsia-300 transition-colors duration-300 hover:text-lime-400", shapeClasses)} style={containerStyle}>
                        <Upload className="w-12 h-12 mb-1" />
                        <span className="text-xs font-medium uppercase mt-1">Clique para enviar</span>
                    </div>
                )}
            </div>
        );
    };

    // --- Renderização Principal ---

    return (
        // Fundo com gradiente roxo escuro
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-purple-900 text-white p-6 flex flex-col items-center font-sans">
            
            {/* Branding no topo (permanece) */}
            <div className="w-full text-center py-6">
                <div className="inline-block text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-yellow-300 tracking-widest uppercase">
                    FutBolinas
                </div>
            </div>

            <h1 className="text-5xl font-extrabold mb-2 text-gray-100 uppercase tracking-tighter text-center drop-shadow-lg">
                DEFINA O BRASÃO
            </h1>
            <p className="text-sm text-gray-400 mb-10">
                Personalize o símbolo oficial do seu clube.
            </p>

            {/* PASSO 1: Geometria */}
            <div className="w-full max-w-lg mb-12 p-8 bg-fuchsia-900/70 rounded-xl border border-fuchsia-800 shadow-2xl">
                <h2 className="text-sm font-semibold mb-6 text-center text-gray-300 uppercase tracking-wider">
                    PASSO 1: Geometria
                </h2>
                <div className="flex justify-around space-x-6">
                    <EscudoOpcao tipo="quadrado" shapeClasses="rounded-xl" Icon={Square} />
                    <EscudoOpcao tipo="circulo" shapeClasses="rounded-full" Icon={Circle} />
                    <EscudoOpcao tipo="triangulo" shapeClasses="" Icon={Triangle} />
                </div>
            </div>
            
            {/* PASSO 2: Arte Personalizada e Preview */}
            <div className="w-full max-w-lg flex flex-col items-center">
                <h2 className="text-sm font-semibold mb-4 text-center text-gray-300 uppercase tracking-wider">
                    PASSO 2: Arte Personalizada
                </h2>

                <EscudoPreview />

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden" 
                    onChange={handleFileChange}
                />

                {/* Botão de Substituir (Link discreto) */}
                <button
                    onClick={handleButtonClick}
                    className="text-lime-400 font-medium py-2 px-4 transition duration-200 hover:text-lime-300 hover:scale-[1.01] mb-8 w-full max-w-xs uppercase tracking-wider flex items-center justify-center disabled:opacity-50 text-sm"
                    disabled={!escudoSelecionado}
                >
                    <Upload className="w-4 h-4 mr-2" />
                    {imagemEscudo ? 'Substituir Arte (Opcional)' : 'Carregar Imagem (Opcional)'}
                </button>
            </div>

            {/* Botão Próximo */}
            <Link to="/Escalacao" className="w-full max-w-xs">
                <button
                    className="bg-lime-500 text-gray-950 font-extrabold py-3 px-8 rounded-full transition duration-300 transform hover:bg-lime-400 hover:scale-105 shadow-xl w-full uppercase tracking-widest disabled:opacity-50"
                    disabled={!escudoSelecionado}
                >
                    <CheckCircle className="w-5 h-5 mr-2 inline-block" />
                    SALVAR E CONTINUAR
                </button>
            </Link>
        </div>
    );
};

export default TelaEscolhaEscudo;