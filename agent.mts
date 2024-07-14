import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { agentInstructions } from "./instructions";

const TEMPLATE = `
${agentInstructions}

Current conversation:
{chat_history}

User: {input}
AI:`;

const prompt = PromptTemplate.fromTemplate(TEMPLATE);

const model = new ChatOpenAI({
  temperature: 0.4,
  model: "gpt-3.5-turbo-0125",
});

const outputParser = new HttpResponseOutputParser();

export const chain = prompt.pipe(model).pipe(outputParser);
