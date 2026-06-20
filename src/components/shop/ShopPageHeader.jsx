import vector from "../../assets/shoppage/Vector.png";

function ShopPageHeader() {
  return (
    <section className="w-full bg-[#FAFAFA] py-[34px]">
      <div className="max-w-[1050px] mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-[#252B42] text-[24px] leading-[32px] font-bold">
            Shop
          </h1>

          <div className="flex items-center gap-[15px]">
            <span className="text-[#252B42] text-[14px] leading-[24px] font-bold">
              Home
            </span>

            <img
              src={vector}
              alt="breadcrumb arrow"
              className="w-[9px] h-[16px] object-contain"
            />

            <span className="text-[#BDBDBD] text-[14px] leading-[24px] font-bold">
              Shop
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopPageHeader;