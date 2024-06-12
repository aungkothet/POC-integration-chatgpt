import OpenAI from "openai";

export async function POST(req, res) {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPEN_AI_ACCESS_TOKEN });

        const reqBody = await req.json();
        const { message } = reqBody;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: [{ type: "text", text: message }] }],
            model: "gpt-3.5-turbo",
        });

        console.log("Completion Response: ", completion);
        return Response.json({ data: completion.choices })
    } catch (e) {
        console.log(e)
        return Response.json({ error: error.message, status: 500 })
    }
    // return Response.json({ data: 'OK' })
}