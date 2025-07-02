import React, { useState } from "react";

function useHandleCarouselPages(products, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  return { currentPage, currentProducts, nextPage, previousPage, totalPages };
}

export default useHandleCarouselPages;
