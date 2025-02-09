import { useState, useMemo, useCallback } from "react";
import { UsePaginationProps } from "../types/commonTypes";

export const usePagination = <T,>({ data, initialItemsPerPage = 10 }: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(data.length / itemsPerPage)), [data.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage((prev) => (newPage >= 1 && newPage <= totalPages ? newPage : prev));
  }, [totalPages]);

  return {
    paginatedData,
    currentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    handlePageChange,
  };
};
