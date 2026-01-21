import { useState } from 'react';

const IconeOlhoAberto = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconeOlhoFechado = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064 7 9.542 7 .847 0 1.67.111 2.458.318M5.121 5.121A15.002 15.002 0 0121.879 12M12 15a3 3 0 110-6 3 3 0 010 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" />
  </svg>
);

const Flashcard = ({ pergunta, resposta }) => {
  const [respostaVisivel, setRespostaVisivel] = useState(false);

  const alternarVisibilidade = () => {
    setRespostaVisivel(!respostaVisivel);
  };

  return (
    <div className="group relative w-full max-w-96 bg-white rounded-2xl shadow-lg p-6 min-h-[300px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div
        className="absolute top-4 right-4 flex space-x-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button
          onClick={alternarVisibilidade}
          className="text-gray-400 hover:text-blue-600 p-1 rounded-full focus:outline-none"
          title={respostaVisivel ? "Ocultar Resposta" : "Mostrar Resposta"}
        >
          {respostaVisivel ? <IconeOlhoFechado /> : <IconeOlhoAberto />}
        </button>
      </div>

      <h3 className="font-bold text-gray-800">Pergunta:</h3>
      <p className="mb-4 text-gray-700">{pergunta}</p>

      <h3 className="font-bold text-blue-600">Resposta:</h3>

      {respostaVisivel ? (
        <p className="text-gray-700 animate-fadeIn">{resposta}</p>
      ) : (
        <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse flex items-center justify-center text-center">
          <p className="text-gray-500 text-sm px-2">Clique no olho para revelar</p>
        </div>
      )}
    </div>
  );
};

export default Flashcard;