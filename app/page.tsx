import { Badge, Button, Container, Stack } from "react-bootstrap";
import { EngineeringDecisionsSection } from "./home/components/engineeringDecisionsSection";
import { Footer } from "@/components/footer";
import { OpeningHome } from "./home/components/hero";

export default function Home() {
  return (
    <div className="margin-top d-flex flex-column min-vh-100">
      <main className="flex-grow-1 mb-5">
        <OpeningHome />
    
        <EngineeringDecisionsSection />
      </main>

      <Footer />
    </div>
  );
}
