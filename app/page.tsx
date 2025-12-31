import { EngineeringDecisionsSection } from "./home/components/engineeringDecisionsSection";
import { Footer } from "@/components/footer";
import { OpeningHome } from "./home/components/hero";
import { HeroActions } from "./home/components/heroActions";

export default function Home() {
  return (
    <div className="margin-top d-flex flex-column min-vh-100">
      <main className="flex-grow-1 mb-5">
        <OpeningHome />
        <HeroActions />
        <EngineeringDecisionsSection />
      </main>

      <Footer />
    </div>
  );
}
