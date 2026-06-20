import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";

function ShopCards() {
  return (
    <section className="w-full bg-white py-[30px]">
      <div className="max-w-[1110px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
          {/* Sol büyük kart */}
          <div className="relative h-[500px] overflow-hidden">
            <img
              src={product1}
              alt="Top Product Of the Week"
              className="w-full h-full object-cover"
            />

            <div className="absolute left-0 bottom-0 w-[68%] h-[198px] bg-[#2D9CDB]/80 flex flex-col justify-center pl-[55px]">
              <h3 className="text-white text-[24px] leading-[32px] font-bold mb-[22px] max-w-[240px]">
                Top Product Of the Week
              </h3>

              <button className="w-[198px] h-[52px] border border-white rounded-[5px] text-white text-[14px] leading-[22px] font-bold">
                EXPLORE ITEMS
              </button>
            </div>
          </div>

          {/* Sağ iki küçük kart */}
          <div className="grid grid-rows-2 gap-[16px]">
            <div className="relative h-[242px] overflow-hidden">
              <img
                src={product2}
                alt="Top Product Of the Week"
                className="w-full h-full object-cover"
              />

              <div className="absolute left-0 bottom-[31px] w-[62%] h-[145px] bg-[#2D9CDB]/80 flex flex-col justify-center pl-[35px]">
                <h3 className="text-white text-[22px] leading-[30px] font-bold mb-[20px]">
                  Top Product Of the Week
                </h3>

                <button className="w-[198px] h-[52px] border border-white rounded-[5px] text-white text-[14px] leading-[22px] font-bold">
                  EXPLORE ITEMS
                </button>
              </div>
            </div>

            <div className="relative h-[242px] overflow-hidden">
              <img
                src={product3}
                alt="Top Product Of the Week"
                className="w-full h-full object-cover"
              />

              <div className="absolute left-0 bottom-0 w-[64%] h-[145px] bg-[#2D9CDB]/80 flex flex-col justify-center pl-[35px]">
                <h3 className="text-white text-[22px] leading-[30px] font-bold mb-[20px]">
                  Top Product Of the Week
                </h3>

                <button className="w-[198px] h-[52px] border border-white rounded-[5px] text-white text-[14px] leading-[22px] font-bold">
                  EXPLORE ITEMS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopCards;