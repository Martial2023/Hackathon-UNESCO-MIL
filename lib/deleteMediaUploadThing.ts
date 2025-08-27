'use client'

export async function deleteMediaUploadThing(mediaUrls: string[]) {
    try {
        await fetch("/api/uploadthing/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ urls: mediaUrls }),
        });
    } catch (error) {
        console.error("Erreur lors de la suppression du fichier UploadThing:", error);
    }
}