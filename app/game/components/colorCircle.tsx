import { Button } from "react-bootstrap";

interface PropsColorCircle {
  color: string;
  btnAction?: () => void;
  isDisabled?: boolean;
  cursor: "pointer" | "default";
  customClass?: string;
  fullOpacity?: boolean;
}

export default function ColorCircle(props: PropsColorCircle) {
  const {
    color,
    btnAction,
    isDisabled = true,
    cursor,
    customClass,
    fullOpacity = true,
  } = props;

  return (
    <>
      <Button
        onClick={!isDisabled ? btnAction : undefined}
        disabled={isDisabled}
        className={`m-2 rounded-circle shadow-sm ${customClass}`}
        style={{
          backgroundColor: color.toLowerCase(),
          width: "40px",
          height: "40px",
          display: "inline-block",
          cursor: cursor,
          border: "2px solid #666",
          opacity: fullOpacity ? "1" : undefined,
        }}
        aria-label={`Select ${color}`}
      ></Button>
    </>
  );
}
