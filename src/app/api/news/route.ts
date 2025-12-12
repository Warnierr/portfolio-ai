import { NextResponse } from "next/server";

import { newsFeed } from "@/data/news";

// Réponse simple pour servir le flux des news (statique pour l'instant).
export const revalidate = 300;

export async function GET() {
  return NextResponse.json({ entries: newsFeed });
}

