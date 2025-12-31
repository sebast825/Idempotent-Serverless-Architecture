import { Modal, Button } from "react-bootstrap";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export function GenericModal({ onClose, children, title }: ModalProps) {
  return (
    <Modal show={true} onHide={() => onClose()} centered scrollable size="lg">
      <Modal.Header
        closeButton
        closeVariant="white"
        className="bg-primary text-white mb-2"
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
