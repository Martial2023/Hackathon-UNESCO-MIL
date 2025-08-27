import { getUser } from "@/lib/auth-session";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  image: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await getUser()

      if (!user || !user?.id) {
        throw new Error("Vous devez être connecté pour uploader une image.");
      }
      return { userId: user.id };
    })
    // Callback exécuté après l'upload
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("Upload complete, file URL:", file.url);
        console.log("User ID:", metadata.userId);
      } catch (error) {
        console.error("Erreur dans onUploadComplete :", error);
        throw new Error("Erreur lors du traitement du callback");
      }
    }),
  video: f({
    video: {
      maxFileSize: "1024MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await getUser()

      if (!user || !user?.id) {
        throw new Error("Vous devez être connecté pour uploader une vidéo.");
      }
      return { userId: user.id };
    })
    // Callback exécuté après l'upload
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("Upload complete, file URL:", file.url);
        console.log("User ID:", metadata.userId);
      } catch (error) {
        console.error("Erreur dans onUploadComplete :", error);
        throw new Error("Erreur lors du traitement du callback");
      }
    }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;