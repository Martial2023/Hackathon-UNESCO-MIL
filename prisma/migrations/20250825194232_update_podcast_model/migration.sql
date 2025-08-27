-- AlterTable
ALTER TABLE "public"."Podcast" ADD COLUMN     "topic" TEXT NOT NULL DEFAULT 'Education',
ALTER COLUMN "thumbnailUrl" DROP NOT NULL;
