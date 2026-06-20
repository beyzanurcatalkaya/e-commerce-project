import icon1 from "../../assets/shoppage/icon1.png";
import icon2 from "../../assets/shoppage/icon2.png";
import down from "../../assets/shoppage/down.png";

function ShopFilterRow({
  totalProducts,
  filter,
  onFilterChange,
  sortValue,
  onSortChange,
  onApplyFilter,
  limit,
  onLimitChange,
}) {
  return (
    <section className="w-full bg-white py-[24px]">
      <div className="max-w-[1050px] mx-auto px-4">
        <div className="h-auto md:h-[98px] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-[#737373] text-[14px] leading-[24px] font-bold">
            Showing all {totalProducts} results
          </p>

          <div className="flex items-center gap-[15px]">
            <span className="text-[#737373] text-[14px] leading-[24px] font-bold">
              Views:
            </span>

            <button
              type="button"
              aria-label="Grid view"
              className="w-[46px] h-[46px] border border-[#ECECEC] rounded-[5px] flex items-center justify-center bg-white"
            >
              <img
                src={icon1}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
            </button>

            <button
              type="button"
              aria-label="List view"
              className="w-[46px] h-[46px] border border-[#ECECEC] rounded-[5px] flex items-center justify-center bg-white"
            >
              <img
                src={icon2}
                alt=""
                className="w-[16px] h-[16px] object-contain"
              />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[15px]">
            <input
              type="text"
              value={filter}
              onChange={onFilterChange}
              placeholder="Search products"
              className="w-full sm:w-[170px] h-[50px] border border-[#DDDDDD] rounded-[5px] bg-[#F9F9F9] px-[18px] text-[#737373] text-[14px] leading-[28px] outline-none"
            />

            <div className="relative w-full sm:w-[155px] h-[50px]">
              <select
                value={sortValue}
                onChange={onSortChange}
                className="appearance-none w-full h-full border border-[#DDDDDD] rounded-[5px] bg-[#F9F9F9] pl-[18px] pr-[38px] text-[#737373] text-[14px] leading-[28px] outline-none"
              >
                <option value="">Select Sort</option>
                <option value="price:asc">price:asc</option>
                <option value="price:desc">price:desc</option>
                <option value="rating:asc">rating:asc</option>
                <option value="rating:desc">rating:desc</option>
              </select>

              <img
                src={down}
                alt=""
                className="pointer-events-none absolute right-[16px] top-1/2 -translate-y-1/2 w-[10px] h-[6px] object-contain"
              />
            </div>

            <div className="relative w-full sm:w-[95px] h-[50px]">
              <select
                value={limit}
                onChange={onLimitChange}
                className="appearance-none w-full h-full border border-[#DDDDDD] rounded-[5px] bg-[#F9F9F9] pl-[14px] pr-[30px] text-[#737373] text-[14px] leading-[28px] outline-none"
              >
                <option value={25}>25</option>
                <option value={20}>20</option>
                <option value={12}>12</option>
                <option value={8}>8</option>
              </select>

              <img
                src={down}
                alt=""
                className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 w-[10px] h-[6px] object-contain"
              />
            </div>

            <button
              type="button"
              onClick={onApplyFilter}
              className="w-full sm:w-[94px] h-[50px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[24px] font-bold"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopFilterRow;