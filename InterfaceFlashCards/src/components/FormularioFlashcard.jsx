import { useState } from 'react';

const FormularioFlashcard = ({ aoGerar, carregando }) => {
  const [pergunta, setPergunta] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [arquivoErro, setArquivoErro] = useState('');

  const TAMANHO_MAXIMO_EM_BYTES = 5 * 1024 * 1024;

  const aoMudarArquivo = (evento) => {
    const file = evento.target.files[0];

    setArquivo(null);
    setArquivoErro('');

    if (!file) {
      return;
    }

    if (file.size > TAMANHO_MAXIMO_EM_BYTES) {
      const tamanhoEmMb = (file.size / (1024 * 1024)).toFixed(2);
      setArquivoErro(`Arquivo muito grande! Máximo de 5MB. (Seu arquivo tem ${tamanhoEmMb} MB)`);
      setArquivo(null);
      evento.target.value = '';
    } else {
      setArquivoErro('');
      setArquivo(file);
    }
  };

  const aoSubmeter = (evento) => {
    evento.preventDefault(); 
    aoGerar(pergunta, arquivo);
  };

  return (
    <div className="w-full max-w-3xl p-4 rounded-lg mb-8">
      <form onSubmit={aoSubmeter}>
        <div className="mb-6">
          <label htmlFor="pergunta" className="block text-gray-300 text-lg font-semibold mb-2">
            Digite um tema para os seus Flashcards
          </label>
          <input
            type="text"
            id="pergunta"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            className="shadow-inner appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 bg-gray-800 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
            placeholder="Ex: 5 flashcards sobre a Roma Antiga"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="arquivo" className="block text-gray-300 text-lg font-semibold mb-2">
            Ou envie um arquivo PDF (Máx: 5MB)
          </label>
          <input
            type="file"
            id="arquivo"
            accept=".pdf"
            onChange={aoMudarArquivo}
            disabled={carregando}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600 cursor-pointer"
          />
          {arquivoErro && (
            <p className="text-red-500 text-sm mt-2">{arquivoErro}</p>
          )}
        </div>
        
        <div className="flex items-center justify-center mt-8">
          <button
            type="submit"
            disabled={carregando || (!pergunta && !arquivo) || !!arquivoErro}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 text-lg rounded-lg focus:outline-none focus:shadow-outline disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {carregando ? 'Gerando...' : 'Gerar Flashcards'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioFlashcard;