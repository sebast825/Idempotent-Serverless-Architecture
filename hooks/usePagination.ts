import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  return {
    page,
    pageSize,
    goToPage   
  };
};
