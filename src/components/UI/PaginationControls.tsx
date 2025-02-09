import React, { useMemo } from "react";
import { PaginationControlsProps } from "../../types/commonTypes";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  setItemsPerPage,
  handlePageChange,
}) => {
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5),
    [totalPages]
  );

  const getButtonClass = (disabled: boolean) =>
    disabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-300 text-gray-600";

  return (
    <div className="flex justify-between items-center border-gray-200 mt-4 rounded-md">
      <div className="flex items-center gap-2 relative">
        <div className="relative w-20">
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-gray-700 focus:ring-2 focus:ring-blue-500 appearance-none text-right"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              handlePageChange(1);
            }}
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <span className="text-gray-600">Itens por página:</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          className={`p-2 rounded-md ${getButtonClass(currentPage === 1)}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <FiChevronLeft />
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-md text-sm ${
              page === currentPage ? "bg-blue-600 text-white font-semibold" : "bg-gray-100 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`p-2 rounded-md ${getButtonClass(currentPage === totalPages)}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
