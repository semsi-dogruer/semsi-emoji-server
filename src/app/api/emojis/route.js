import { emojis } from "@/lib/emojis.js"; //@ means src
import { NextResponse } from "next/server.js";

export function GET() {
  return NextResponse.json({ success: true, emojis });
}
export async function POST(request, response) {
  try {
    const { name, character } = await request.json();
    if (!name || !character) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name and an emoji to post!",
      });
    }

    console.log(name);
    console.log(character);
    const emoji = { id: emojis.length + 1, name, character };
    emojis.push(emoji);
    return NextResponse.json({ success: true, emoji });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
