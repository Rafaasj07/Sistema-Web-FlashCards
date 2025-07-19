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

        // 2. O arquivo enviado (PDF) fica disponível em req.file.buffer
        const dataBuffer = req.file.buffer; 
        
        // 3. A biblioteca 'pdf-parse' lê o buffer do arquivo e extrai o texto.
        const data = await pdf(dataBuffer);

        // 4. O texto extraído é combinado com a pergunta do usuário.
        const { pergunta } = req.body;
        const textoCompleto = `${pergunta}\n\n${data.text}`;

        const resposta = await obterRespostaFlashCards(textoCompleto);
        res.json({ resposta });

    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao processar o arquivo PDF.' });
    }
};