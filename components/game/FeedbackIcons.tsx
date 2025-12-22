import { responsePosition } from "@/lib/game/types";

interface FeedbackProps {
  results: (responsePosition | null)[];
}
export const FeedbackIcons = ({ results }: FeedbackProps) => {
  return (
    <div className="d-flex rounded shadow-lg p-2">
      {results.map((res, index) => {
  
        const iconStyle = {
          fontSize: "1.8rem", 
          lineHeight: "1", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };

        if (res?.matchPosition) {
          return (
            <span
              key={index}
              className="text-success"
              style={iconStyle}
              title="Correcto"
            >
              ●
            </span>
          );
        }
        if (res?.matchDifferentPosition) {
          return (
            <span
              key={index}
              className="text-warning"
              style={iconStyle}
              title="Color correcto, posición mal"
            >
              ●
            </span>
          );
        }
        return (
          <span
            key={index}
            className="text-secondary"
            style={{ ...iconStyle, opacity: 0.2 }}
            title="Nada"
          >
            ●
          </span>
        );
      })}
    </div>
  );
};
