export const MessageCard = ({
  icon,
  title,
  text,
}: {
  icon?: string;
  title: string;
  text: string;
}) => {
  return (
  
      <div className="p-4 border rounded-4 border-primary  h-100 shadow-sm">
        {icon && <div className="fs-2 mb-2">{icon}</div>}
        <h2 className="fw-bold">{title}</h2>
        <h5 className="text-muted mb-0">{text}</h5>
      </div>

  );
};