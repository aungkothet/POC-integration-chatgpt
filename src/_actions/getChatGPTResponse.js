'use server'
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_ACCESS_TOKEN });

export default async function getAutomateResponse(message) {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: [{ type: "text", text: message }] }],
        model: "gpt-3.5-turbo",
    });
    console.log("inside promise: ", completion);
    
    return completion.choices;
}