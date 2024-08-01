import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Create a new assistant
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const assistantName = searchParams.get("assistantName");


  const assistant = await openai.beta.assistants.create({
    name: assistantName,
    instructions: "Você é um especialista em ler os conteúdos fornecidos nos arquivos em anexo e responder perguntas",
    model: "gpt-4o",
    tools: [{"type": "file_search"}],
  });


  return Response.json({ assistantId: assistant.id });
}

export async function GET() {

  const response = await openai.beta.assistants.list();
  return Response.json({ assistants: response.data });
}