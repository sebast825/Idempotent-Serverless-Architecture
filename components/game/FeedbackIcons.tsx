import { FeedbackStatus} from "@/lib/game/types";

interface FeedbackProps {
  results: (FeedbackStatus | null)[];
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

        if (res == 'MATCH' ) {
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
        if (res == 'COLOR_ONLY' ) {
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
