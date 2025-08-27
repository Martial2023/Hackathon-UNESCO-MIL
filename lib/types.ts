export interface PodcastType {
    id: string;
    userId: string;
    title: string;
    topic: string;
    description: string;
    videoUrl: string;
    thumbnailUrl?: string | null;
    transcription: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface QuizQuestion {
  question: string
  choices: string[]
  answer: string
}