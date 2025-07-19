import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;

export async function obterRespostaFlashCards(pergunta) {
  const messages = [
    {
      role: 'system',
      content: `
Você é um assistente de estudos especialista em criar flash cards claros, objetivos e didáticos para ajudar estudantes a revisarem conteúdos rapidamente.

Regras:
- Responda somente em português brasileiro.
- Crie flash cards no formato: "Pergunta: ... | Resposta: ...".
- Use frases curtas, simples e diretas.
- **Se o usuário enviar um texto ou arquivo, baseie-se EXCLUSIVAMENTE nesse conteúdo para criar os flash cards.**
- **Gere a quantidade de flash cards solicitada na pergunta do usuário.
- Se o usuário não especificar, gere no máximo 5 flash cards.**
- Evite respostas vagas ou genéricas.
- Não adicione explicações extras ou textos longos.
- Cada flash card deve focar em um conceito importante ou definição.
- Evite termos técnicos complexos, explique quando necessário.
- Não use listas, links, códigos ou qualquer formato diferente.
- Revise e garanta coerência antes de enviar.
      `,
    },
    {
      role: 'user',
      content: pergunta,
    },
  ];

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-r1:free',
        messages,
        max_tokens: 1500, 
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost',
          'Content-Type': 'application/json',
        },
      }
    );

    const resposta = response.data?.choices?.[0]?.message?.content;

    if (!resposta) throw new Error("Resposta vazia ou inválida da IA");

    return resposta.trim();
  } catch (error) {
    console.error("Erro OpenRouter:", error?.response?.data || error.message);
    throw new Error("Erro ao acessar OpenRouter");
  }
}
