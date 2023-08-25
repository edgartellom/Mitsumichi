import React, { useState, useEffect } from "react";

const Paginate = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  function handlePageInput(event) {
    let page = parseInt(event.target.value);
    page = isNaN(page) ? 1 : Math.max(1, Math.min(page, totalPages));
    setInputPage(page);
  }

  function handlePageSubmit(event) {
    event.preventDefault();
    onPageChange(inputPage);
  }

  function getPageNumbers() {
    const pages = [];
    const maxPageVisible = 5;
    const maxPage = Math.min(totalPages, maxPageVisible);

    if (totalPages <= maxPageVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxPage; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxPage + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  }

  return (
    <div className="flex flex-row pb-2 m-auto justify-center items-center text-black">
      <div className="flex items-center space-x-2">
        <button
          className="bg-gray-200 border-none cursor-pointer text-xl py-2 px-4 rounded-md hover:bg-[#ff9100] hover:text-black shadow transition duration-300 hover:bg-gold"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`bg-gray-200 border-none cursor-pointer text-xl py-2 px-4 rounded-md hover:bg-[#2020207e] hover:text-black shadow transition duration-300 ${
              currentPage === page ? "bg-gold" : "hover:bg-gold"
            }`}
            onClick={() => onPageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}

        <button
          className="bg-gray-200 border-none cursor-pointer text-xl py-2 px-4 rounded-md hover:bg-[#ff9100] hover:text-black shadow transition duration-300 hover:bg-gold"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Paginate;
