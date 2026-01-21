import { useState } from 'react';
import { api, apiComArquivo } from '../services/api';

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null)

  const obterFlashcards = async (pergunta, arquivo) => {
    setCarregando(true);
    setErro(null);

    try {
      let respostaApi;
      if (arquivo) {
        respostaApi = await apiComArquivo(pergunta, arquivo);
      } else {
        respostaApi = await api(pergunta);
      }

      const listaDeFlashcards = respostaApi
        .split('\n')
        .filter(linha => linha.includes('|'))
        .map((linha, index) => {
          const [partePergunta, parteResposta] = linha.split('|');
          return {
            id: index,
            pergunta: partePergunta.replace('Pergunta:', '').trim(),
            resposta: parteResposta.replace('Resposta:', '').trim(),
          };
        });

      setFlashcards(listaDeFlashcards);
    } catch (error) {
      console.error("Erro ao processar os flashcards", error);
      setErro("Não foi possível gerar os flashcards. Verifique o arquivo ou tente novamente.")
      setFlashcards([]);
    } finally {
      setCarregando(false);
    }
  };

  return { flashcards, carregando, erro, obterFlashcards };
}