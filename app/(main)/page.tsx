import HeroSection from "@/components/HeroSection";
import PodcastSection from "@/components/PodcastSection";
import FeatureSection from "@/components/FeatureSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeatureSection />
      <PodcastSection />
    </main>
  );
}
