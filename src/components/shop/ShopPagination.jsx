function ShopPagination({ total, limit, offset, onPageChange }) {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  if (!total || totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleFirst = () => {
    onPageChange(0);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(offset - limit);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(offset + limit);
    }
  };

  const handlePageClick = (page) => {
    onPageChange((page - 1) * limit);
  };

  return (
    <div className="flex justify-center mt-[70px]">
      <div className="flex items-center border border-[#BDBDBD] rounded-[5px] overflow-hidden">
        <button
          type="button"
          onClick={handleFirst}
          disabled={currentPage === 1}
          className="h-[54px] px-[20px] bg-[#F3F3F3] text-[#BDBDBD] text-[14px] font-bold border-r border-[#BDBDBD] disabled:cursor-not-allowed"
        >
          First
        </button>

        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="h-[54px] px-[20px] bg-white text-[#23A6F0] text-[14px] font-bold border-r border-[#BDBDBD] disabled:text-[#BDBDBD] disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {pages.slice(0, 5).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageClick(page)}
            className={`h-[54px] w-[49px] text-[14px] font-bold border-r border-[#BDBDBD] ${
              currentPage === page
                ? "bg-[#23A6F0] text-white"
                : "bg-white text-[#23A6F0]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="h-[54px] px-[20px] bg-white text-[#23A6F0] text-[14px] font-bold disabled:text-[#BDBDBD] disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ShopPagination;