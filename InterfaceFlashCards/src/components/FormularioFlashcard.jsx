import { useState } from 'react';

// Componente do formulário para o usuário inserir o tema e/ou o arquivo.
const FormularioFlashcard = ({ aoGerar, carregando }) => {
  const [pergunta, setPergunta] = useState('');
  const [arquivo, setArquivo] = useState(null);
  // Estado para armazenar a mensagem de erro do arquivo.
  const [arquivoErro, setArquivoErro] = useState('');

  // Define o tamanho máximo em bytes (0.1 MB neste exemplo).
  const TAMANHO_MAXIMO_EM_BYTES = 0.1 * 1024 * 1024;

  // Função chamada quando o usuário seleciona um arquivo.
  const aoMudarArquivo = (evento) => {
    const file = evento.target.files[0];

    // Limpa os estados anteriores para uma nova verificação.
    setArquivo(null);
    setArquivoErro('');

    // Se nenhum arquivo for selecionado, encerra a função.
    if (!file) {
      return;
    }

    // --- Verificação do Tamanho do arquivo ---
    if (file.size > TAMANHO_MAXIMO_EM_BYTES) {
      // Se o arquivo for muito grande, define a mensagem de erro e limpa o estado.
      const tamanhoEmMb = (file.size / (1024 * 1024)).toFixed(2);
      setArquivoErro(`Arquivo muito grande! Máximo de 0.1MB. (Seu arquivo tem ${tamanhoEmMb} MB)`);
      setArquivo(null);
      // Limpa o valor do input para que o usuário possa selecionar outro arquivo.
      evento.target.value = '';
    } else {
      // Se o arquivo for válido, limpa o erro e define o arquivo no estado.
      setArquivoErro('');
      setArquivo(file);
    }
  };

  // Função chamada quando o formulário é enviado.
  const aoSubmeter = (evento) => {
    evento.preventDefault(); // Impede o recarregamento da página.
    aoGerar(pergunta, arquivo);
  };

  return (
    <div className="w-full max-w-3xl p-4 rounded-lg mb-8">
      <form onSubmit={aoSubmeter}>
        {/* Seção do input de texto */}
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

        {/* Seção do input de arquivo */}
        <div className="mb-6">
          <label htmlFor="arquivo" className="block text-gray-300 text-lg font-semibold mb-2">
            Ou envie um arquivo PDF (Máx: 0.1MB)
          </label>
          <input
            type="file"
            id="arquivo"
            accept=".pdf"
            onChange={aoMudarArquivo}
            disabled={carregando} // Desabilita o input apenas se estiver gerando.
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600 cursor-pointer"
          />
          {/* Exibe a mensagem de erro do arquivo, se houver */}
          {arquivoErro && (
            <p className="text-red-500 text-sm mt-2">{arquivoErro}</p>
          )}
        </div>
        
        {/* Botão de submissão */}
        <div className="flex items-center justify-center mt-8">
          <button
            type="submit"
            // Desabilita o botão se estiver carregando, se não houver input ou se houver erro no arquivo.
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