'use server'
import { getUser } from "@/lib/auth-session";
import { prisma } from "@/lib/prisma";
import { PodcastType } from "@/lib/types";

type PodcastParams = {
  title: string;
  topic: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  transcription: string;
};

export async function PublishPodcast(params: PodcastParams): Promise<PodcastType> {
  try {
    const connectedUser = await getUser();
    if (!connectedUser || !connectedUser.id) {
      throw new Error("User not authenticated");
    }

    const newPodcast = await prisma.podcast.create({
      data: {
        userId: connectedUser.id,
        title: params.title,
        topic: params.topic,
        description: params.description,
        videoUrl: params.videoUrl,

        thumbnailUrl: params.thumbnailUrl,
        transcription: params.transcription,
      }
    });

    return newPodcast;
  } catch (error) {
    console.error("Error publishing podcast:", error);
    throw new Error("Failed to publish podcast");
  }
}

type getPodcastsParams = {
  search: string;
  page: number;
  pageSize: number;
}
export async function getPodcasts(params: getPodcastsParams): Promise<PodcastType[]> {
  try {
    const podcasts = await prisma.podcast.findMany({
      where: {
        OR: [
          { title: { contains: params.search, mode: 'insensitive' } },
          { description: { contains: params.search, mode: 'insensitive' } },
          { transcription: { contains: params.search, mode: 'insensitive' } },
          // { topic: { contains: params.search, mode: 'insensitive' } }
        ]
      },
      orderBy: { createdAt: 'desc' },
      take: params.pageSize,
      skip: (params.page - 1) * params.pageSize
    });
    return podcasts;
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    throw new Error("Failed to fetch podcasts");
  }
}

type getPodcastByIdParams = {
  podcastId: string;
}
export async function getPodcastById(params:getPodcastByIdParams) {
  try {
    const podcast = await prisma.podcast.findUnique({
      where: { id: params.podcastId }
    });
    if (!podcast) {
      throw new Error("Podcast not found");
    }
    return podcast;
  } catch (error) {
    console.error("Error fetching podcast by ID:", error);
    throw new Error("Failed to fetch podcast");
  }
  
}