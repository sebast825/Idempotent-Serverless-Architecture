import { EngineeringDecisionsSection } from "../components/engineeringDecisionsSection";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="margin-top d-flex flex-column min-vh-100">

      <main className="flex-grow-1 mb-5">
        <EngineeringDecisionsSection />
      </main>

      <Footer />
    </div>
  );
}
