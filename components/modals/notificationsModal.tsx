import { NotificationFormat } from "@/lib/notification/types";
import { Button, Modal } from "react-bootstrap";

export const NotificationsModal = ({
  showModal,
  setShowModal,
  notifications,
}: {
  showModal: boolean;
  setShowModal: () => void;
  notifications: NotificationFormat[];
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal()}
      centered
      scrollable // Importante si tienes 20 notificaciones
    >
      <Modal.Header closeButton closeVariant="white" className="bg-primary text-white">
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">

        {notifications?.length > 0 ? (
          notifications?.map((n, index) => (
            <div
              key={index}
              className="p-3 border-bottom hover-bg-light  cursor-pointer"
              onClick={() => {
                /* Navegar al link y cerrar modal */
              }}
            >
              <div className="d-flex justify-content-between">
                <h6 className="mb-1">{n.title}</h6>
                <small className="text-muted">{n.createdAt.toDateString()}</small>
              </div>
              <p className="small mb-0 text-secondary">{n.message}</p>
              <a href={n.link}>Watch Review </a>
            </div>
          ))
        ) : (
          <div className="p-5 text-center text-muted">
            No tienes notificaciones pendientes.
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="warning" onClick={() => setShowModal()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
