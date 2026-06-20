import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

function getProductImage(product) {
  if (product?.images && product.images.length > 0) {
    return product.images[0].url;
  }

  return product?.image || product?.img || "";
}

function getProductPrice(product) {
  if (product?.price !== undefined) {
    return `${Number(product.price).toLocaleString("tr-TR")} TL`;
  }

  return "";
}

function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const cart = useSelector((state) => state.shoppingCart.cart);

  const totalCount = cart.reduce((total, item) => total + item.count, 0);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-[5px] text-[#23A6F0] hover:text-[#1687c7] transition"
      >
        <ShoppingCart size={18} strokeWidth={2.2} />
        <span>Sepetim</span>

        {totalCount > 0 && (
          <span className="min-w-[18px] h-[18px] rounded-full bg-[#E77C40] text-white text-[11px] leading-[18px] font-bold text-center px-[5px]">
            {totalCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 w-[360px] bg-white border border-[#E6E6E6] rounded-[4px] shadow-xl">
          <div className="px-[16px] py-[14px] border-b border-[#E6E6E6]">
            <h3 className="text-[#252B42] text-[15px] font-bold">
              Sepetim ({totalCount} Ürün)
            </h3>
          </div>

          {cart.length === 0 ? (
            <div className="px-[16px] py-[24px] text-center">
              <p className="text-[#737373] text-[14px]">
                Sepetinizde ürün bulunmamaktadır.
              </p>
            </div>
          ) : (
            <>
              <div className="max-h-[300px] overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-[12px] px-[16px] py-[14px] border-b border-[#E6E6E6]"
                  >
                    <div className="w-[72px] h-[72px] bg-[#F6F6F6] overflow-hidden shrink-0">
                      <img
                        src={getProductImage(item.product)}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 text-left">
                      <h4 className="text-[#252B42] text-[13px] leading-[18px] font-bold line-clamp-2">
                        {item.product.name}
                      </h4>

                      <p className="text-[#737373] text-[12px] leading-[18px] mt-[4px]">
                        Adet: {item.count}
                      </p>

                      <p className="text-[#E77C40] text-[13px] leading-[18px] font-bold mt-[4px]">
                        {getProductPrice(item.product)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-[10px] p-[14px]">
                <Link
                  to="/cart"
                  className="h-[42px] border border-[#DDDDDD] rounded-[4px] flex items-center justify-center text-[#252B42] text-[14px] font-bold"
                >
                  Sepete Git
                </Link>

                <Link
                  to="/checkout"
                  className="h-[42px] bg-[#E77C40] rounded-[4px] flex items-center justify-center text-white text-[14px] font-bold"
                >
                  Siparişi Tamamla
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CartDropdown;