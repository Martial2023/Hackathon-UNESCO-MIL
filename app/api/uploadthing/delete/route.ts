'use server'
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(req: Request) {
  try {
    const { urls } = await req.json();
    // Extraction de la clé du fichier (tout après le dernier '/')
    interface UrlsRequest {
      urls: string[];
    }

    const fileKeys: string[] = (urls as UrlsRequest["urls"]).map((url: string) => url.substring(url.lastIndexOf("/") + 1));
    const utapi = new UTApi();
    await utapi.deleteFiles(fileKeys);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur suppression UploadThing:", err);
    return NextResponse.json({ error: "Suppression failed" }, { status: 500 });
  }
}