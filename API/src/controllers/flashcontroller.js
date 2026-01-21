import { obterRespostaFlashCards } from "../services/openRouterServices.js";
import pdf from 'pdf-parse';

export const perguntarIA = async (req, res) => {
    try {
        const { pergunta } = req.body;

        if (!pergunta) {
            return res.status(400).json({
                erro: "É obrigatório enviar uma pergunta"
            });
        }

        const resposta = await obterRespostaFlashCards(pergunta);
        res.json({ resposta });
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao processar sua pergunta. Tente novamente!"
        });
    }
};


export const perguntarComArquivo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ erro: 'Nenhum arquivo enviado.' });
        }

        const dataBuffer = req.file.buffer;
        const data = await pdf(dataBuffer);

        const { pergunta } = req.body;
        const textoCompleto = `${pergunta}\n\n${data.text}`;

        const resposta = await obterRespostaFlashCards(textoCompleto);
        res.json({ resposta });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao processar o arquivo PDF.' });
    }
};