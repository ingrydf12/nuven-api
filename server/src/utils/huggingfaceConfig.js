import axios from 'axios';

const HF_API_TOKEN = process.env.HUGGING_TOKEN;

const MODEL_URL = 'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2';

export const perguntarHuggingFace = async (pergunta, contexto) => {
  try {
    const response = await axios.post(
      MODEL_URL,
      {
        inputs: {
          question: pergunta,
          context: contexto,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
        },
      }
    );

    const data = response.data;

    if (Array.isArray(data)) {

      return data[0]?.answer || 'Sem resposta válida.';
    } else if (typeof data === 'object' && data.answer) {
      return data.answer;
    } else {
      return 'Sem resposta válida.';
    }
  } catch (error) {
    console.error('Erro ao consultar Hugging Face:', error.response?.data || error.message);
    return 'Erro ao gerar resposta.';
  }
};