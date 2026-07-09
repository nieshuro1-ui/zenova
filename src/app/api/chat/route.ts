import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message } = await request.json();

  const response = await client.responses.create({
    model: "gpt-5-mini",
    input: message,
  });

  return NextResponse.json({
    reply: response.output_text,
  });
}
