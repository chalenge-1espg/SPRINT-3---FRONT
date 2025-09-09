import React from "react";
import { useNavigate } from "react-router-dom";

const TelaLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mx-auto w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-800">
          Bem - Vindo Técnica(o)
        </h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="teamName" className="mb-1 block text-sm font-medium text-gray-700">
              Nome do Time!
            </label>
            <input
              type="text"
              id="teamName"
              placeholder="Digite aqui..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="technicianName" className="mb-1 block text-sm font-medium text-gray-700">
              Nome do Técnico(a)
            </label>
            <input
              type="text"
              id="technicianName"
              placeholder="Digite aqui..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="accompaniedTeam" className="mb-1 block text-sm font-medium text-gray-700">
              Qual time acompanha?
            </label>
            <input
              type="text"
              id="accompaniedTeam"
              placeholder="Digite aqui..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="favoritePlayer" className="mb-1 block text-sm font-medium text-gray-700">
              Jogadora Favorita
            </label>
            <input
              type="text"
              id="favoritePlayer"
              placeholder="Digite aqui..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="button"
            onClick={() => navigate("/escudo")}
            className="w-full rounded-md bg-lime-500 py-3 text-lg font-bold text-white shadow-lg transition duration-200 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
          >
            Próximo
          </button>
        </form>
      </div>
    </div>
  );
};

export default TelaLogin;
