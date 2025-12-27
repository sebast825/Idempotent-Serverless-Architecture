import { useNotifications } from "@/hooks/useNotifications";
import { NotificationFormat } from "@/lib/notification/types";

export const NotificationList = () => {
  const { data: notifications } = useNotifications();

  return (
    <>
      {notifications && notifications?.length > 0 ? (
        notifications?.map((n, index) => (
          <div
            key={index}
            className="p-3 border-bottom hover-bg-light  cursor-pointer"
            onClick={() => {}}
          >
            <div className="d-flex justify-content-between">
              <h6 className="mb-1">{n.title}</h6>
              <small className="text-muted">{n.createdAt}</small>
            </div>
            <p className="small mb-0 text-secondary">{n.message}</p>
         {n.link &&   <a href={n.link}>Watch Review </a>}
          </div>
        ))
      ) : (
        <div className="p-5 text-center text-muted">
          No tienes notificaciones pendientes.
        </div>
      )}
      
    </>
  );
};
