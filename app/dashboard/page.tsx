"use client";

     import { Button } from "react-bootstrap";

import { Opening } from "@/components/opening";
import { createChallengeGameAction } from "../actions/gameActions";

export default function Dashboard() {
  const handleCreateGame = async ()=>{
    var game = await createChallengeGameAction();
    console.log(game)
  }
  return (
    <>
     <Opening/>
    <Button onClick={handleCreateGame}>Start Game!</Button>
    </>
  );
}
