import { Modal, Button } from "react-bootstrap";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title : string
}

export function GenericModal({ onClose, children,title }: ModalProps) {
  return (
    <Modal show={true} onHide={() => onClose()} centered scrollable>
      <Modal.Body className="p-0">
        <Modal.Header
          closeButton
          closeVariant="white"
          className="bg-primary text-white"
        >
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {children}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="warning" onClick={() => onClose()}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
