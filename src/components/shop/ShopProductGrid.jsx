import { Link } from "react-router-dom";

import { getProductDetailLink } from "../../utils/categoryUtils";

function getProductImage(product) {
  if (product?.images && product.images.length > 0) {
    return product.images[0].url;
  }

  return product?.image || product?.img || "";
}

function getProductTitle(product) {
  return product?.name || product?.title || "Graphic Design";
}

function getProductCategory(product) {
  return (
    product?.category?.title ||
    product?.category?.name ||
    product?.category ||
    "English Department"
  );
}

function getProductPrice(product) {
  if (product?.price) {
    return `$${Number(product.price).toFixed(2)}`;
  }

  return "$6.48";
}

function ShopProductGrid({ products, categories, isLoading, isFailed }) {
  if (isLoading) {
    return (
      <section className="w-full bg-white py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4 flex justify-center">
          <div className="w-[44px] h-[44px] border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (isFailed) {
    return (
      <section className="w-full bg-white py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4 text-center">
          <p className="text-red-500 text-[16px] font-bold">
            Ürünler alınamadı. Lütfen daha sonra tekrar deneyin.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white pt-[24px] pb-[48px]">
      <div className="max-w-[1050px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[30px] gap-y-[48px]">
          {products.map((product) => (
            <Link
              to={getProductDetailLink(product, categories)}
              key={product.id}
              className="text-center block cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-xl rounded-[6px] pb-[20px]"
            >
              <div className="w-full h-[280px] bg-[#F6F6F6] mb-[25px] overflow-hidden">
                <img
                  src={getProductImage(product)}
                  alt={getProductTitle(product)}
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
              </div>

              <h3 className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[10px] px-2">
                {getProductTitle(product)}
              </h3>

              <p className="text-[#737373] text-[14px] leading-[24px] font-bold mb-[10px]">
                {getProductCategory(product)}
              </p>

              <div className="flex items-center justify-center gap-[5px] mb-[10px]">
                <span className="text-[#BDBDBD] text-[16px] leading-[24px] font-bold">
                  $16.48
                </span>

                <span className="text-[#23856D] text-[16px] leading-[24px] font-bold">
                  {getProductPrice(product)}
                </span>
              </div>

              <div className="flex items-center justify-center gap-[6px]">
                <span className="w-[16px] h-[16px] rounded-full bg-[#23A6F0]" />
                <span className="w-[16px] h-[16px] rounded-full bg-[#23856D]" />
                <span className="w-[16px] h-[16px] rounded-full bg-[#E77C40]" />
                <span className="w-[16px] h-[16px] rounded-full bg-[#252B42]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopProductGrid;