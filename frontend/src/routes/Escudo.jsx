import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const TelaEscolhaEscudo = () => {
  const fileInputRef = useRef(null);
  const [imagemEscudo, setImagemEscudo] = useState(null);
  const [escudoSelecionado, setEscudoSelecionado] = useState(null);

  // Atualiza o localStorage sempre que um dos dois muda
  const atualizarLocalStorage = (tipo, imagem) => {
    localStorage.setItem(
      "escudo",
      JSON.stringify({ tipo: tipo, imagem: imagem })
    );
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagemEscudo(imageUrl);
      atualizarLocalStorage(escudoSelecionado, imageUrl);
    }
  };

  const handleEscudoClick = (tipoEscudo) => {
    setEscudoSelecionado(tipoEscudo);
    atualizarLocalStorage(tipoEscudo, imagemEscudo);
  };

  const renderSelectedEscudo = () => {
    const baseClasses = "w-full h-full object-cover";
    let shapeClasses = "";
    let containerStyle = {};

    switch (escudoSelecionado) {
      case "quadrado":
        shapeClasses = "rounded-lg";
        break;
      case "circulo":
        shapeClasses = "rounded-full";
        break;
      case "triangulo":
        shapeClasses = "";
        containerStyle = {
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        };
        break;
      default:
        shapeClasses = "rounded-full";
    }

    if (imagemEscudo) {
      return (
        <div
          className="relative w-40 h-40 flex items-center justify-center mb-6 overflow-hidden border-2 border-gray-400"
          style={containerStyle}
        >
          <img
            src={imagemEscudo}
            alt="Escudo do time"
            className={`${baseClasses} ${shapeClasses}`}
            style={containerStyle}
          />
        </div>
      );
    }

    return (
      <div
        className={`relative w-40 h-40 flex items-center justify-center mb-6 overflow-hidden bg-gray-600 border-2 border-gray-400 ${shapeClasses}`}
        style={containerStyle}
      >
        {escudoSelecionado === null && (
          <span className="text-white text-4xl">+</span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-green-900 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">ESCOLHA SEU ESCUDO</h1>

      <div className="flex justify-center space-x-4 mb-8">
        <div
          className={`w-20 h-20 bg-gray-600 rounded-lg cursor-pointer ${
            escudoSelecionado === "quadrado" ? "border-4 border-yellow-400" : ""
          }`}
          onClick={() => handleEscudoClick("quadrado")}
        ></div>
        <div
          className={`w-20 h-20 bg-gray-600 rounded-full cursor-pointer ${
            escudoSelecionado === "circulo" ? "border-4 border-yellow-400" : ""
          }`}
          onClick={() => handleEscudoClick("circulo")}
        ></div>
        <div
          className={`w-20 h-20 bg-gray-600 cursor-pointer ${
            escudoSelecionado === "triangulo" ? "border-4 border-yellow-400" : ""
          }`}
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
          onClick={() => handleEscudoClick("triangulo")}
        ></div>
      </div>

      <h2 className="text-lg font-bold mb-4">
        MANDE A SUA IMAGEM PARA O CLUBE
      </h2>

      {renderSelectedEscudo()}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button
        onClick={handleButtonClick}
        className="bg-gray-700 text-white font-bold py-2 px-4 rounded-xl transition duration-300 transform hover:scale-105 mb-4"
      >
        ANEXAR IMAGEM!
      </button>

      <Link to="/Escalacao">
        <button className="bg-green-500 text-black font-bold py-2 px-4 rounded-xl transition duration-300 transform hover:scale-105">
          Próximo
        </button>
      </Link>
    </div>
  );
};

export default TelaEscolhaEscudo;
