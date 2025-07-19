import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = async (pergunta) => {
    try {
        const response = await axios.post(`${API_URL}flashCards/perguntar`, {
            pergunta
        });
        return response.data.resposta;
    } catch (err) {
        console.error("Error ao buscar resposta no servidor", err);
        throw err;
    }
};

export const apiComArquivo = async (pergunta, arquivo) => {
    try {
        const formData = new FormData();
        formData.append('pergunta', pergunta);
        formData.append('arquivo', arquivo);

        const response = await axios.post(`${API_URL}flashCards/perguntar-com-arquivo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.resposta;
    } catch (err) {
        console.error("Error ao buscar resposta no servidor com arquivo", err);
        throw err;
    }
};