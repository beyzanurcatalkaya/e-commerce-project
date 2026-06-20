import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";

import {
  increaseCartItem,
  decreaseCartItem,
  removeFromCart,
  toggleCartItem,
  toggleAllCartItems,
} from "../store/actions/shoppingCartActions";

function getProductImage(product) {
  if (product?.images && product.images.length > 0) {
    return product.images[0].url;
  }

  return product?.image || product?.img || "";
}

function getProductName(product) {
  return product?.name || product?.title || "Product";
}

function getProductPrice(product) {
  return Number(product?.price || 0);
}

function formatPrice(price) {
  return `${Number(price).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} TL`;
}

function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.shoppingCart.cart);

  const totalProductCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.count, 0);
  }, [cart]);

  const checkedItems = useMemo(() => {
    return cart.filter((item) => item.checked);
  }, [cart]);

  const checkedProductCount = useMemo(() => {
    return checkedItems.reduce((total, item) => total + item.count, 0);
  }, [checkedItems]);

  const productsTotal = useMemo(() => {
    return checkedItems.reduce((total, item) => {
      return total + getProductPrice(item.product) * item.count;
    }, 0);
  }, [checkedItems]);

  const shippingPrice = checkedItems.length > 0 ? 29.99 : 0;

  const shippingDiscount = productsTotal >= 150 ? shippingPrice : 0;

  const grandTotal = productsTotal + shippingPrice - shippingDiscount;

  const allChecked = cart.length > 0 && cart.every((item) => item.checked);

  const handleToggleAll = () => {
    dispatch(toggleAllCartItems(!allChecked));
  };

  if (cart.length === 0) {
    return (
      <main className="w-full bg-white py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4 text-center">
          <div className="flex justify-center mb-[20px]">
            <ShoppingCart size={54} className="text-[#23A6F0]" />
          </div>

          <h1 className="text-[#252B42] text-[32px] leading-[40px] font-bold mb-[12px]">
            Sepetiniz Boş
          </h1>

          <p className="text-[#737373] text-[14px] leading-[24px] mb-[28px]">
            Sepetinize henüz ürün eklemediniz.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center h-[44px] px-[24px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] font-bold"
          >
            Alışverişe Başla
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-[#FAFAFA] py-[50px]">
      <div className="max-w-[1280px] mx-auto px-4">
        <h1 className="text-[#252B42] text-[32px] leading-[40px] font-bold mb-[30px]">
          Sepetim ({totalProductCount} Ürün)
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-[30px] items-start">
          {/* LEFT SIDE - CART LIST */}
          <div>
            <div className="bg-[#F3F6FF] rounded-[8px] px-[24px] py-[18px] flex items-center gap-[14px] mb-[26px]">
              <CheckCircle size={24} className="text-[#2DC071]" />

              <p className="text-[#252B42] text-[16px] leading-[24px] font-bold">
                Sepetindeki ürünleri bireysel veya kurumsal fatura seçerek
                alabilirsin.
              </p>
            </div>

            <div className="bg-white border border-[#E6E6E6] rounded-[8px] overflow-hidden">
              <div className="hidden lg:grid grid-cols-[70px_1.7fr_180px_160px_80px] items-center px-[24px] py-[16px] border-b border-[#E6E6E6] bg-white">
                <div>
                  <button
                    type="button"
                    onClick={handleToggleAll}
                    className={`w-[24px] h-[24px] rounded-[5px] border flex items-center justify-center ${
                      allChecked
                        ? "bg-[#F47B20] border-[#F47B20]"
                        : "bg-white border-[#BDBDBD]"
                    }`}
                  >
                    {allChecked && (
                      <span className="text-white text-[16px]">✓</span>
                    )}
                  </button>
                </div>

                <p className="text-[#737373] text-[14px] font-bold">Ürün</p>

                <p className="text-[#737373] text-[14px] font-bold text-center">
                  Adet
                </p>

                <p className="text-[#737373] text-[14px] font-bold text-right">
                  Toplam
                </p>

                <p className="text-[#737373] text-[14px] font-bold text-center">
                  Sil
                </p>
              </div>

              {cart.map((item) => {
                const product = item.product;
                const productPrice = getProductPrice(product);
                const rowTotal = productPrice * item.count;

                return (
                  <div
                    key={product.id}
                    className="grid grid-cols-1 lg:grid-cols-[70px_1.7fr_180px_160px_80px] gap-[18px] lg:gap-0 items-center px-[24px] py-[26px] border-b border-[#E6E6E6]"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => dispatch(toggleCartItem(product.id))}
                        className={`w-[24px] h-[24px] rounded-[5px] border flex items-center justify-center ${
                          item.checked
                            ? "bg-[#F47B20] border-[#F47B20]"
                            : "bg-white border-[#BDBDBD]"
                        }`}
                      >
                        {item.checked && (
                          <span className="text-white text-[16px]">✓</span>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-[18px]">
                      <div className="w-[96px] h-[110px] bg-[#F6F6F6] rounded-[6px] overflow-hidden shrink-0">
                        <img
                          src={getProductImage(product)}
                          alt={getProductName(product)}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[8px] line-clamp-2">
                          {getProductName(product)}
                        </h2>

                        <p className="text-[#737373] text-[13px] leading-[20px] mb-[6px]">
                          Ürün ID: {product.id}
                        </p>

                        <p className="text-[#737373] text-[13px] leading-[20px]">
                          Birim Fiyat:{" "}
                          <span className="text-[#F47B20] font-bold">
                            {formatPrice(productPrice)}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-start lg:justify-center">
                      <div className="flex items-center border border-[#E6E6E6] rounded-[4px] overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(decreaseCartItem(product.id))
                          }
                          className="w-[42px] h-[42px] flex items-center justify-center bg-[#F8F8F8] text-[#737373]"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-[50px] h-[42px] flex items-center justify-center text-[#252B42] text-[16px] font-bold">
                          {item.count}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(increaseCartItem(product.id))
                          }
                          className="w-[42px] h-[42px] flex items-center justify-center bg-[#F8F8F8] text-[#F47B20]"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-[#F47B20] text-[18px] leading-[28px] font-bold">
                        {formatPrice(rowTotal)}
                      </p>
                    </div>

                    <div className="flex lg:justify-center">
                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(product.id))}
                        className="w-[42px] h-[42px] flex items-center justify-center text-[#737373] hover:text-red-500 transition"
                        aria-label="Ürünü sil"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-[26px]">
              <Link
                to="/shop"
                className="h-[48px] px-[24px] border border-[#DDDDDD] rounded-[5px] inline-flex items-center justify-center text-[#252B42] text-[14px] font-bold bg-white"
              >
                Alışverişe Devam Et
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <aside className="w-full xl:sticky xl:top-[30px]">
            <Link
  to="/checkout"
  className="w-full h-[58px] bg-[#F47B20] text-white rounded-[6px] text-[18px] leading-[24px] font-bold flex items-center justify-center gap-[8px] mb-[24px]"
>
  Sepeti Onayla
  <ChevronRight size={22} />
</Link>

            <div className="bg-white border border-[#E6E6E6] rounded-[8px] p-[22px] shadow-sm mb-[24px]">
              <h2 className="text-[#252B42] text-[24px] leading-[32px] font-normal mb-[24px]">
                Sipariş Özeti
              </h2>

              <div className="space-y-[14px]">
                <div className="flex items-start justify-between gap-[15px]">
                  <p className="text-[#737373] text-[15px] leading-[22px]">
                    Ürünün Toplamı
                  </p>

                  <p className="text-[#252B42] text-[16px] leading-[22px] font-bold">
                    {formatPrice(productsTotal)}
                  </p>
                </div>

                <div className="flex items-start justify-between gap-[15px]">
                  <p className="text-[#737373] text-[15px] leading-[22px]">
                    Kargo Toplam
                  </p>

                  <p className="text-[#252B42] text-[16px] leading-[22px] font-bold">
                    {formatPrice(shippingPrice)}
                  </p>
                </div>

                <div className="flex items-start justify-between gap-[15px]">
                  <p className="text-[#737373] text-[15px] leading-[22px] max-w-[170px]">
                    150 TL ve Üzeri Kargo Bedava
                  </p>

                  <p className="text-[#F47B20] text-[16px] leading-[22px] font-bold">
                    -{formatPrice(shippingDiscount)}
                  </p>
                </div>
              </div>

              <hr className="border-[#E6E6E6] my-[20px]" />

              <div className="flex items-center justify-between gap-[15px]">
                <p className="text-[#252B42] text-[18px] leading-[26px] font-normal">
                  Toplam
                </p>

                <p className="text-[#F47B20] text-[22px] leading-[30px] font-bold">
                  {formatPrice(grandTotal)}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="w-full h-[50px] bg-white border border-[#E6E6E6] rounded-[6px] text-[#252B42] text-[14px] leading-[24px] font-bold flex items-center justify-center gap-[10px] mb-[20px]"
            >
              <Plus size={20} className="text-[#F47B20]" />
              İNDİRİM KODU GİR
            </button>

            <Link
  to="/checkout"
  className="w-full h-[58px] bg-[#F47B20] text-white rounded-[6px] text-[18px] leading-[24px] font-bold flex items-center justify-center gap-[8px]"
>
  Sepeti Onayla
  <ChevronRight size={22} />
</Link>

            <p className="mt-[18px] text-[#737373] text-[13px] leading-[20px] text-center">
              Seçili ürün sayısı:{" "}
              <span className="font-bold text-[#252B42]">
                {checkedProductCount}
              </span>
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;