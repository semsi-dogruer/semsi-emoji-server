import { emojis } from "@/lib/emojis.js"; //@ means src
import { NextResponse } from "next/server.js";

export function GET(request, response) {
  const { emojiId } = response.params;
  const emoji = emojis.filter((emoji) => emoji.id === +emojiId)[0];
  //console.log(emoji);
  if (!emoji) {
    return NextResponse.json({
      success: false,
      message: "No emoji with that ID was found.",
    });
  }

  return NextResponse.json({ success: true, emoji });
}

export function DELETE(request, response) {
  const { emojiId } = response.params;
  const index = emojis.findIndex((emoji) => {
    return +emojiId === emoji.id;
  });
  console.log(index);
  const emoji = emojis.splice(index, 1);

  console.log(emojis);

  return NextResponse.json({ success: true, emoji });
}

export async function PUT(request, response) {
  try {
    const { emojiId } = response.params;
    const { name, character } = await request.json();
    const index = emojis.findIndex((emoji) => {
      return +emojiId === emoji.id;
    });
    emojis[index].character = character;
    emojis[index].name = name;
    const emoji = { id: emojiId, character, name };
    return NextResponse.json({ success: true, emojis });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
