import OpenAI from "openai";

// Pega a chave da API da variável de ambiente
const openaiApiKey = process.env.OPENAI_API_KEY;

// Cria uma instância do OpenAI usando a chave da API
export const openai = new OpenAI({
    apiKey: openaiApiKey,
});
