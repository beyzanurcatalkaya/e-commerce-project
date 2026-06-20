import { products } from "../../data/products";

function ProductCards() {
  return (
    <section className="w-full bg-white py-[80px]">
      <div className="max-w-[1124px] mx-auto px-4">
        <div className="text-center mb-[48px]">
          <p className="text-[#737373] text-[20px] leading-[30px] font-normal mb-[10px]">
            Featured Products
          </p>

          <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold tracking-[0.1px] mb-[10px]">
            BESTSELLER PRODUCTS
          </h2>

          <p className="text-[#737373] text-[14px] leading-[20px] font-normal">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-[30px] gap-y-[48px]">
          {products.map((product) => (
            <div key={product.id} className="text-center">
              <div className="w-full h-[238px] bg-[#F6F6F6] mb-[20px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[10px]">
                {product.title}
              </h3>

              <p className="text-[#737373] text-[14px] leading-[24px] font-bold mb-[10px]">
                {product.department}
              </p>

              <div className="flex items-center justify-center gap-[5px]">
                <span className="text-[#BDBDBD] text-[16px] leading-[24px] font-bold">
                  {product.oldPrice}
                </span>

                <span className="text-[#23856D] text-[16px] leading-[24px] font-bold">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-[70px]">
          <button
            type="button"
            className="w-[261px] h-[52px] border border-[#23A6F0] rounded-[5px] text-[#23A6F0] text-[14px] leading-[22px] font-bold hover:bg-[#23A6F0] hover:text-white transition"
          >
            LOAD MORE PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductCards;