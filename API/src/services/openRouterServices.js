import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.OPENROUTER_API_KEY;

export async function obterRespostaFlashCards(pergunta) {
  const messages = [
    {
      role: 'system',
      content: `
Você é um assistente de estudos especializado em criar flash cards didáticos, claros e objetivos para revisão rápida de conteúdos.

Diretrizes obrigatórias:
- Responda exclusivamente em português brasileiro.
- Gere flash cards **somente** no formato: "Pergunta: ... | Resposta: ...".
- Utilize frases curtas, simples e diretas.
- Cada flash card deve abordar apenas **um conceito, definição ou ideia central**.
- Evite respostas vagas, genéricas ou ambíguas.
- Não inclua explicações extras, comentários, introduções ou conclusões.

Regras de conteúdo:
- Caso o usuário forneça um texto ou arquivo, utilize **apenas e exclusivamente esse conteúdo** como base.
- **Não acrescente informações externas, exemplos próprios ou inferências.**
- Explique termos técnicos apenas se eles aparecerem no conteúdo fornecido.

Quantidade:
- Gere exatamente a quantidade de flash cards solicitada pelo usuário.
- Se nenhuma quantidade for especificada, gere **no máximo 5 flash cards**.

Restrições de formato:
- Não use listas, tópicos, links, códigos ou qualquer outro formato.
- Não utilize emojis.
- Não altere o formato definido.
- Revise o conteúdo e garanta clareza, correção e coerência antes de responder.
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
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages,
        max_tokens: 1500,
        temperature: 0.2,
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
