import { Button, Container } from "react-bootstrap";

interface PaginationBtnsProps {
  page: number;
  totalPages: number;
  goToPage: (newPage: number) => void;
}
const PaginationBtns = ({
  page,
  totalPages,
  goToPage,
}: PaginationBtnsProps) => {
  function incrementPage() {
    if (page < totalPages) {
      goToPage(page + 1);
    }
  }
  function decrementPage() {
    if (page > 0) {
      goToPage(page - 1);
    }
  }
  if (totalPages <= 1) return;
  return (
    <>
      <Container
        className="w-100 d-flex align-items-center justify-content-around p-2 "
        style={{ maxWidth: "200px" }}
      >
        <Button disabled={page == 0} onClick={decrementPage}>
          {"<"}
        </Button>
        <div className="d-flex align-items-center">
          <span>
            {page} / {totalPages}
          </span>
        </div>
        <Button disabled={page == totalPages} onClick={incrementPage}>
          {">"}
        </Button>
      </Container>
    </>
  );
};

export default PaginationBtns;
