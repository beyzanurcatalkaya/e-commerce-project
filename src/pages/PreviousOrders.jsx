import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, ChevronUp, PackageCheck } from "lucide-react";
import { toast } from "react-toastify";

import { fetchOrders } from "../store/actions/clientActions";

function formatPrice(price) {
  return `${Number(price || 0).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} TL`;
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "-";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getOrderId(order, index) {
  return order.id || order.order_id || index + 1;
}

function getOrderDate(order) {
  return order.order_date || order.created_at || order.date;
}

function getOrderPrice(order) {
  return order.price || order.total_price || order.total || 0;
}

function getOrderProducts(order) {
  if (Array.isArray(order.products)) {
    return order.products;
  }

  if (Array.isArray(order.order_products)) {
    return order.order_products;
  }

  if (Array.isArray(order.items)) {
    return order.items;
  }

  return [];
}

function getProductName(item) {
  return (
    item.product?.name ||
    item.name ||
    item.detail ||
    `Ürün #${item.product_id || item.id || "-"}`
  );
}

function getProductId(item) {
  return item.product_id || item.product?.id || item.id || "-";
}

function getProductCount(item) {
  return item.count || item.quantity || 1;
}

function getProductDetail(item) {
  return item.detail || item.product?.description || "-";
}

function PreviousOrders() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.client.orders);

  const [loading, setLoading] = useState(false);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        await dispatch(fetchOrders());
      } catch (error) {
        toast.error("Siparişler alınamadı.");
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [dispatch]);

  const orderList = useMemo(() => {
    if (Array.isArray(orders)) {
      return orders;
    }

    if (Array.isArray(orders?.orders)) {
      return orders.orders;
    }

    return [];
  }, [orders]);

  const handleToggleOrder = (orderId) => {
    setOpenOrderId((currentId) => (currentId === orderId ? null : orderId));
  };

  if (loading) {
    return (
      <main className="w-full bg-[#FAFAFA] py-[100px]">
        <div className="max-w-[1050px] mx-auto px-4 flex justify-center">
          <div className="w-[48px] h-[48px] border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-[#FAFAFA] py-[50px]">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="mb-[30px]">
          <h1 className="text-[#252B42] text-[32px] leading-[40px] font-bold mb-[8px]">
            Siparişlerim
          </h1>

          <p className="text-[#737373] text-[14px] leading-[24px]">
            Daha önce oluşturduğunuz siparişleri ve sipariş detaylarını buradan
            görüntüleyebilirsiniz.
          </p>
        </div>

        {orderList.length === 0 ? (
          <div className="bg-white border border-[#E6E6E6] rounded-[8px] p-[50px] text-center">
            <div className="flex justify-center mb-[18px]">
              <PackageCheck size={54} className="text-[#F47B20]" />
            </div>

            <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold mb-[8px]">
              Henüz siparişiniz bulunmamaktadır.
            </h2>

            <p className="text-[#737373] text-[14px] leading-[24px]">
              Sipariş oluşturduğunuzda bu sayfada listelenecektir.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-[#E6E6E6] rounded-[8px] overflow-hidden">
            <div className="hidden lg:grid grid-cols-[120px_220px_1fr_160px_100px] px-[24px] py-[16px] bg-[#FAFAFA] border-b border-[#E6E6E6]">
              <p className="text-[#737373] text-[14px] font-bold">Sipariş No</p>
              <p className="text-[#737373] text-[14px] font-bold">Tarih</p>
              <p className="text-[#737373] text-[14px] font-bold">Ürünler</p>
              <p className="text-[#737373] text-[14px] font-bold text-right">
                Tutar
              </p>
              <p className="text-[#737373] text-[14px] font-bold text-center">
                Detay
              </p>
            </div>

            {orderList.map((order, index) => {
              const orderId = getOrderId(order, index);
              const orderProducts = getOrderProducts(order);
              const isOpen = String(openOrderId) === String(orderId);

              return (
                <div key={orderId} className="border-b border-[#E6E6E6]">
                  <div className="grid grid-cols-1 lg:grid-cols-[120px_220px_1fr_160px_100px] gap-[12px] lg:gap-0 px-[24px] py-[20px] items-center">
                    <div>
                      <p className="lg:hidden text-[#737373] text-[12px] font-bold mb-[4px]">
                        Sipariş No
                      </p>

                      <p className="text-[#252B42] text-[14px] leading-[22px] font-bold">
                        #{orderId}
                      </p>
                    </div>

                    <div>
                      <p className="lg:hidden text-[#737373] text-[12px] font-bold mb-[4px]">
                        Tarih
                      </p>

                      <p className="text-[#252B42] text-[14px] leading-[22px]">
                        {formatDate(getOrderDate(order))}
                      </p>
                    </div>

                    <div>
                      <p className="lg:hidden text-[#737373] text-[12px] font-bold mb-[4px]">
                        Ürünler
                      </p>

                      <p className="text-[#252B42] text-[14px] leading-[22px] font-bold">
                        {orderProducts.length} ürün
                      </p>

                      {orderProducts[0] && (
                        <p className="text-[#737373] text-[13px] leading-[20px] line-clamp-1">
                          {getProductName(orderProducts[0])}
                        </p>
                      )}
                    </div>

                    <div className="lg:text-right">
                      <p className="lg:hidden text-[#737373] text-[12px] font-bold mb-[4px]">
                        Tutar
                      </p>

                      <p className="text-[#F47B20] text-[16px] leading-[24px] font-bold">
                        {formatPrice(getOrderPrice(order))}
                      </p>
                    </div>

                    <div className="flex lg:justify-center">
                      <button
                        type="button"
                        onClick={() => handleToggleOrder(orderId)}
                        className="h-[40px] px-[16px] border border-[#DDDDDD] rounded-[5px] text-[#252B42] text-[14px] font-bold flex items-center gap-[6px]"
                      >
                        Detay
                        {isOpen ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="bg-[#FAFAFA] px-[24px] py-[22px] border-t border-[#E6E6E6]">
                      <h3 className="text-[#252B42] text-[18px] leading-[26px] font-bold mb-[16px]">
                        Sipariş Detayları
                      </h3>

                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] border-collapse">
                          <thead>
                            <tr className="bg-white border border-[#E6E6E6]">
                              <th className="text-left p-[14px] text-[#737373] text-[13px] font-bold">
                                Ürün ID
                              </th>
                              <th className="text-left p-[14px] text-[#737373] text-[13px] font-bold">
                                Ürün
                              </th>
                              <th className="text-left p-[14px] text-[#737373] text-[13px] font-bold">
                                Detay
                              </th>
                              <th className="text-center p-[14px] text-[#737373] text-[13px] font-bold">
                                Adet
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {orderProducts.map((item, productIndex) => (
                              <tr
                                key={`${getProductId(item)}-${productIndex}`}
                                className="border border-[#E6E6E6] bg-white"
                              >
                                <td className="p-[14px] text-[#252B42] text-[14px]">
                                  {getProductId(item)}
                                </td>

                                <td className="p-[14px] text-[#252B42] text-[14px] font-bold">
                                  {getProductName(item)}
                                </td>

                                <td className="p-[14px] text-[#737373] text-[14px]">
                                  {getProductDetail(item)}
                                </td>

                                <td className="p-[14px] text-center text-[#252B42] text-[14px] font-bold">
                                  {getProductCount(item)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-[18px] grid grid-cols-1 md:grid-cols-3 gap-[12px]">
                        <div className="bg-white border border-[#E6E6E6] rounded-[6px] p-[14px]">
                          <p className="text-[#737373] text-[13px] mb-[4px]">
                            Adres ID
                          </p>

                          <p className="text-[#252B42] text-[14px] font-bold">
                            {order.address_id || "-"}
                          </p>
                        </div>

                        <div className="bg-white border border-[#E6E6E6] rounded-[6px] p-[14px]">
                          <p className="text-[#737373] text-[13px] mb-[4px]">
                            Kart
                          </p>

                          <p className="text-[#252B42] text-[14px] font-bold">
                            {order.card_name || "-"}
                          </p>
                        </div>

                        <div className="bg-white border border-[#E6E6E6] rounded-[6px] p-[14px]">
                          <p className="text-[#737373] text-[13px] mb-[4px]">
                            Toplam
                          </p>

                          <p className="text-[#F47B20] text-[14px] font-bold">
                            {formatPrice(getOrderPrice(order))}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default PreviousOrders;