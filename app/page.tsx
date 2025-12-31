import styles from "./page.module.css";
import { EngineeringDecisionsSection } from "../components/engineeringDecisionsSection";

// app/page.tsx
export default function Home() {
  return (
    <div className={styles.page}>

      <main className={styles.main}>
     
        <EngineeringDecisionsSection></EngineeringDecisionsSection>
      </main>
   
    </div>
  );
}
