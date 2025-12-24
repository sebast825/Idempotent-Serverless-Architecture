import { MastermindColor } from "@/lib/game/types";
import { Button } from "react-bootstrap";

interface PropsColorCircle {
  color: MastermindColor;
  btnAction: () => void;
  isDisabled: boolean;
  cursor: "pointer" | "default";
}

export default function ColorCircle(props: PropsColorCircle) {
  const { color, btnAction, isDisabled, cursor } = props;
  return (
    <>
      <Button
        onClick={btnAction}
        disabled={isDisabled}
        className="m-2 rounded-circle shadow-sm"
        style={{
          backgroundColor: color.toLowerCase(),
          width: "40px",
          height: "40px",
          display: "inline-block",
          cursor: cursor,
          border: "2px solid #666",
        }}
        aria-label={`Select ${color}`}
      ></Button>
    </>
  );
}
