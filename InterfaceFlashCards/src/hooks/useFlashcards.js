import { useState } from 'react';
// Importa as funções que fazem a comunicação com a API.
import { api, apiComArquivo } from '../services/api';

// Hook personalizado para gerenciar a lógica dos flashcards.
export function useFlashcards() {
  // Estado para armazenar os flashcards gerados.
  const [flashcards, setFlashcards] = useState([]);
  // Estado para controlar a exibição do status de "carregando".
  const [carregando, setCarregando] = useState(false);
  // Estado para armazernar mensagem de erro
  const [erro, setErro] = useState(null)

  // Função assíncrona para buscar os flashcards na API.
  const obterFlashcards = async (pergunta, arquivo) => {
    setCarregando(true); // Ativa o estado de carregamento.
    setErro(null); // Limpa erros anteriores no início da chamada.
    
    try {
      let respostaApi;
      // Verifica se um arquivo foi enviado para chamar a API correspondente.
      if (arquivo) {
        respostaApi = await apiComArquivo(pergunta, arquivo);
      } else {
        respostaApi = await api(pergunta);
      }

      // Processa a resposta da API para formatar os flashcards.
      const listaDeFlashcards = respostaApi
        .split('\n') // Divide a string de resposta em linhas.
        .filter(linha => linha.includes('|')) // Filtra apenas as linhas que contêm o separador '|'.
        .map((linha, index) => { // Mapeia cada linha para um objeto de flashcard.
          const [partePergunta, parteResposta] = linha.split('|');
          return {
            id: index,
            pergunta: partePergunta.replace('Pergunta:', '').trim(),
            resposta: parteResposta.replace('Resposta:', '').trim(),
          };
        });

      // Atualiza o estado com os flashcards gerados.
      setFlashcards(listaDeFlashcards);
    } catch (error) {
      // Em caso de erro, exibe uma mensagem de falha.
      console.error("Erro ao processar os flashcards", error);
      // Define a mensagem de erro para ser exibida na UI, se desejado.
      setErro("Não foi possível gerar os flashcards. Verifique o arquivo ou tente novamente.")
      setFlashcards([]);
    } finally {
      // Garante que o estado de carregamento seja desativado ao final.
      setCarregando(false);
    }
  };

  // Retorna os estados e a função para serem usados em outros componentes.
  return { flashcards, carregando, obterFlashcards };
}