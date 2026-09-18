import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Trash2, User, Phone, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

import {
  fetchAddressList,
  addAddress,
  updateAddress,
  deleteAddress,
  fetchCreditCards,
  addCreditCard,
  updateCreditCard,
  deleteCreditCard,
} from "../store/actions/clientActions";

import { createOrder } from "../store/actions/shoppingCartActions";

const cities = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Konya",
  "Gaziantep",
  "Kocaeli",
  "Mersin",
  "Kayseri",
  "Eskişehir",
  "Diyarbakır",
  "Samsun",
  "Trabzon",
];

function getProductPrice(product) {
  return Number(product?.price || 0);
}

function formatPrice(price) {
  return `${Number(price).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} TL`;
}

function maskCardNumber(cardNo) {
  const cleaned = String(cardNo || "").replace(/\s/g, "");

  if (cleaned.length < 10) {
    return cleaned;
  }

  return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 6)}** **** ${cleaned.slice(
    -4
  )}`;
}

function CreateOrder() {
  const dispatch = useDispatch();

  const addressList = useSelector((state) => state.client.addressList);
  const creditCards = useSelector((state) => state.client.creditCards);
  const cart = useSelector((state) => state.shoppingCart.cart);

  const [activeStep, setActiveStep] = useState(1);

  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedShippingAddressId, setSelectedShippingAddressId] =
    useState(null);
  const [selectedBillingAddressId, setSelectedBillingAddressId] =
    useState(null);
  const [sameBillingAddress, setSameBillingAddress] = useState(true);
  const [addressLoading, setAddressLoading] = useState(false);

  const [isCardFormOpen, setIsCardFormOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [cardLoading, setCardLoading] = useState(false);
  const [use3DSecure, setUse3DSecure] = useState(false);
  const [cardCcv, setCardCcv] = useState("");

  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    reset: resetCard,
    formState: { errors: cardErrors, isSubmitting: isCardSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const checkedItems = useMemo(() => {
    return cart.filter((item) => item.checked);
  }, [cart]);

  const productsTotal = useMemo(() => {
    return checkedItems.reduce((total, item) => {
      return total + getProductPrice(item.product) * item.count;
    }, 0);
  }, [checkedItems]);

  const shippingPrice = checkedItems.length > 0 ? 29.99 : 0;
  const shippingDiscount = productsTotal >= 150 ? shippingPrice : 0;
  const grandTotal = productsTotal + shippingPrice - shippingDiscount;

  const selectedShippingAddress = addressList.find(
    (address) => String(address.id) === String(selectedShippingAddressId)
  );

  useEffect(() => {
    async function loadAddresses() {
      try {
        setAddressLoading(true);
        await dispatch(fetchAddressList());
      } catch (error) {
        toast.error("Adres bilgileri alınamadı.");
      } finally {
        setAddressLoading(false);
      }
    }

    loadAddresses();
  }, [dispatch]);

  useEffect(() => {
    async function loadCreditCards() {
      try {
        setCardLoading(true);
        await dispatch(fetchCreditCards());
      } catch (error) {
        toast.error("Kayıtlı kartlar alınamadı.");
      } finally {
        setCardLoading(false);
      }
    }

    loadCreditCards();
  }, [dispatch]);

  useEffect(() => {
    if (addressList.length > 0 && !selectedShippingAddressId) {
      setSelectedShippingAddressId(addressList[0].id);
      setSelectedBillingAddressId(addressList[0].id);
    }
  }, [addressList, selectedShippingAddressId]);

  useEffect(() => {
    if (sameBillingAddress) {
      setSelectedBillingAddressId(selectedShippingAddressId);
    }
  }, [sameBillingAddress, selectedShippingAddressId]);

  useEffect(() => {
    if (creditCards.length > 0 && !selectedCardId) {
      setSelectedCardId(creditCards[0].id);
    }
  }, [creditCards, selectedCardId]);

  const openNewAddressForm = () => {
    setEditingAddress(null);

    reset({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
    });

    setIsAddressFormOpen(true);
  };

  const openEditAddressForm = (address) => {
    setEditingAddress(address);

    reset({
      title: address.title || "",
      name: address.name || "",
      surname: address.surname || "",
      phone: address.phone || "",
      city: address.city || "",
      district: address.district || "",
      neighborhood: address.neighborhood || "",
    });

    setIsAddressFormOpen(true);
  };

  const closeAddressForm = () => {
    setEditingAddress(null);
    setIsAddressFormOpen(false);
    reset();
  };

  const onSubmitAddress = async (formData) => {
    const payload = {
      title: formData.title,
      name: formData.name,
      surname: formData.surname,
      phone: formData.phone,
      city: formData.city,
      district: formData.district,
      neighborhood: formData.neighborhood,
    };

    try {
      if (editingAddress) {
        await dispatch(
          updateAddress({
            id: editingAddress.id,
            ...payload,
          })
        );

        toast.success("Adres güncellendi.");
      } else {
        await dispatch(addAddress(payload));

        toast.success("Adres eklendi.");
      }

      closeAddressForm();
    } catch (error) {
      toast.error("Adres kaydedilemedi. Bilgileri kontrol edin.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await dispatch(deleteAddress(addressId));

      if (String(selectedShippingAddressId) === String(addressId)) {
        setSelectedShippingAddressId(null);
      }

      if (String(selectedBillingAddressId) === String(addressId)) {
        setSelectedBillingAddressId(null);
      }

      toast.success("Adres silindi.");
    } catch (error) {
      toast.error("Adres silinemedi.");
    }
  };

  const openNewCardForm = () => {
    setEditingCard(null);

    resetCard({
      card_no: "",
      expire_month: "",
      expire_year: "",
      name_on_card: "",
    });

    setIsCardFormOpen(true);
  };

  const openEditCardForm = (card) => {
    setEditingCard(card);

    resetCard({
      card_no: card.card_no || "",
      expire_month: card.expire_month || "",
      expire_year: card.expire_year || "",
      name_on_card: card.name_on_card || "",
    });

    setIsCardFormOpen(true);
  };

  const closeCardForm = () => {
    setEditingCard(null);
    setIsCardFormOpen(false);
    resetCard();
  };

  const onSubmitCard = async (formData) => {
    const payload = {
      card_no: formData.card_no.replace(/\s/g, ""),
      expire_month: Number(formData.expire_month),
      expire_year: Number(formData.expire_year),
      name_on_card: formData.name_on_card,
    };

    try {
      if (editingCard) {
        await dispatch(
          updateCreditCard({
            id: editingCard.id,
            ...payload,
          })
        );

        toast.success("Kart güncellendi.");
      } else {
        await dispatch(addCreditCard(payload));

        toast.success("Kart eklendi.");
      }

      closeCardForm();
    } catch (error) {
      toast.error("Kart kaydedilemedi. Bilgileri kontrol edin.");
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await dispatch(deleteCreditCard(cardId));

      if (String(selectedCardId) === String(cardId)) {
        setSelectedCardId(null);
      }

      toast.success("Kart silindi.");
    } catch (error) {
      toast.error("Kart silinemedi.");
    }
  };

  const handleContinueToPayment = () => {
    if (!selectedShippingAddressId) {
      toast.error("Lütfen teslimat adresi seçiniz.");
      return;
    }

    setActiveStep(2);
  };

  const handlePaymentSubmit = async () => {
    const selectedCard = creditCards.find(
      (card) => String(card.id) === String(selectedCardId)
    );

    if (!selectedShippingAddressId) {
      toast.error("Lütfen teslimat adresi seçiniz.");
      return;
    }

    if (!selectedCard) {
      toast.error("Lütfen ödeme için kart seçiniz.");
      return;
    }

    if (!/^\d{3,4}$/.test(cardCcv)) {
      toast.error("Lütfen geçerli bir CVV giriniz.");
      return;
    }

    if (checkedItems.length === 0) {
      toast.error("Sipariş oluşturmak için en az bir ürün seçiniz.");
      return;
    }

    const orderPayload = {
      address_id: Number(selectedShippingAddressId),
      order_date: new Date().toISOString().slice(0, 19),
      card_no: Number(String(selectedCard.card_no).replace(/\s/g, "")),
      card_name: selectedCard.name_on_card,
      card_expire_month: Number(selectedCard.expire_month),
      card_expire_year: Number(selectedCard.expire_year),
      card_ccv: Number(cardCcv),
      price: Number(grandTotal.toFixed(2)),
      products: checkedItems.map((item) => ({
        product_id: Number(item.product.id),
        count: Number(item.count),
        detail: item.product.name || "Standart ürün",
      })),
    };

    try {
      setOrderSubmitting(true);

      await dispatch(createOrder(orderPayload));

      setOrderCompleted(true);
      setCardCcv("");

      toast.success("Siparişiniz başarıyla oluşturuldu.");
    } catch (error) {
      toast.error("Sipariş oluşturulamadı. Lütfen bilgileri kontrol edin.");
    } finally {
      setOrderSubmitting(false);
    }
  };

  const handleRightButtonClick = () => {
    if (activeStep === 1) {
      handleContinueToPayment();
      return;
    }

    handlePaymentSubmit();
  };

  if (orderCompleted) {
    return (
      <main className="w-full bg-[#FAFAFA] py-[90px]">
        <div className="max-w-[720px] mx-auto px-4">
          <div className="bg-white border border-[#E6E6E6] rounded-[10px] p-[40px] text-center shadow-sm">
            <div className="w-[74px] h-[74px] rounded-full bg-[#2DC071] mx-auto mb-[24px] flex items-center justify-center">
              <CheckCircle size={44} className="text-white" />
            </div>

            <h1 className="text-[#252B42] text-[32px] leading-[40px] font-bold mb-[14px]">
              Tebrikler, siparişiniz başarıyla oluşturuldu!
            </h1>

            <p className="text-[#737373] text-[16px] leading-[26px] mb-[30px]">
              Sipariş bilgileriniz alınmıştır. Sepetiniz temizlendi.
            </p>

            <div className="flex flex-col sm:flex-row gap-[14px] justify-center">
              <Link
                to="/shop"
                className="h-[48px] px-[24px] bg-[#F47B20] text-white rounded-[5px] text-[14px] font-bold flex items-center justify-center"
              >
                Alışverişe Devam Et
              </Link>

              <Link
                to="/"
                className="h-[48px] px-[24px] border border-[#DDDDDD] bg-white text-[#252B42] rounded-[5px] text-[14px] font-bold flex items-center justify-center"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-[#FAFAFA] py-[36px]">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-[24px] items-start">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 border border-[#DDDDDD] rounded-[6px] overflow-hidden bg-white mb-[22px]">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className={`text-left p-[24px] border-b-[4px] ${
                  activeStep === 1
                    ? "border-[#F47B20]"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-start gap-[14px]">
                  <span className="text-[#F5C400] text-[34px] leading-[40px] font-bold">
                    1
                  </span>

                  <div>
                    <h1
                      className={`text-[20px] leading-[28px] font-bold ${
                        activeStep === 1
                          ? "text-[#F47B20]"
                          : "text-[#737373]"
                      }`}
                    >
                      Adres Bilgileri
                    </h1>

                    <p className="text-[#252B42] text-[14px] leading-[22px]">
                      {selectedShippingAddress
                        ? selectedShippingAddress.title
                        : "Teslimat ve fatura adresini seç."}
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!selectedShippingAddressId) {
                    toast.error("Ödeme adımına geçmek için adres seçiniz.");
                    return;
                  }

                  setActiveStep(2);
                }}
                className={`text-left p-[24px] bg-[#FAFAFA] border-b-[4px] ${
                  activeStep === 2
                    ? "border-[#F47B20]"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-start gap-[14px]">
                  <span className="text-[#F5C400] text-[34px] leading-[40px] font-bold">
                    2
                  </span>

                  <div>
                    <h2
                      className={`text-[20px] leading-[28px] font-bold ${
                        activeStep === 2
                          ? "text-[#F47B20]"
                          : "text-[#737373]"
                      }`}
                    >
                      Ödeme Seçenekleri
                    </h2>

                    <p className="text-[#252B42] text-[13px] leading-[20px]">
                      Banka/Kredi Kartı ile ödemenizi güvenle yapabilirsiniz.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {activeStep === 1 && (
              <>
                <div className="bg-white border border-[#DDDDDD] rounded-[6px] p-[18px] mb-[22px] flex items-start gap-[12px]">
                  <CheckCircle size={22} className="text-[#F47B20] shrink-0" />

                  <p className="text-[#252B42] text-[14px] leading-[22px]">
                    Kurumsal faturalı alışveriş yapmak için faturamı aynı adrese
                    gönder seçimini kaldırıp fatura adresinizi ayrıca
                    seçebilirsiniz.
                  </p>
                </div>

                <section className="bg-white border border-[#DDDDDD] rounded-[6px] p-[24px]">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[16px] mb-[24px]">
                    <h2 className="text-[#252B42] text-[22px] leading-[30px] font-bold">
                      Teslimat Adresi
                    </h2>

                    <label className="flex items-center gap-[10px] text-[#737373] text-[14px] leading-[22px]">
                      <input
                        type="checkbox"
                        checked={sameBillingAddress}
                        onChange={(event) =>
                          setSameBillingAddress(event.target.checked)
                        }
                        className="w-[18px] h-[18px] accent-[#F47B20]"
                      />
                      Faturamı Aynı Adrese Gönder
                    </label>
                  </div>

                  {addressLoading ? (
                    <div className="py-[60px] flex justify-center">
                      <div className="w-[40px] h-[40px] border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                      <button
                        type="button"
                        onClick={openNewAddressForm}
                        className="min-h-[130px] border border-[#DDDDDD] rounded-[6px] bg-[#FAFAFA] flex flex-col items-center justify-center text-[#252B42] hover:border-[#F47B20] transition"
                      >
                        <Plus size={32} className="text-[#F47B20] mb-[6px]" />

                        <span className="text-[14px] leading-[22px] font-bold">
                          Yeni Adres Ekle
                        </span>
                      </button>

                      {addressList.map((address) => {
                        const isSelected =
                          String(selectedShippingAddressId) ===
                          String(address.id);

                        return (
                          <div key={address.id}>
                            <div className="flex items-center justify-between mb-[8px]">
                              <label className="flex items-center gap-[8px] text-[#252B42] text-[14px] leading-[22px] cursor-pointer">
                                <input
                                  type="radio"
                                  name="shippingAddress"
                                  checked={isSelected}
                                  onChange={() =>
                                    setSelectedShippingAddressId(address.id)
                                  }
                                  className="accent-[#F47B20]"
                                />
                                {address.title}
                              </label>

                              <div className="flex items-center gap-[12px]">
                                <button
                                  type="button"
                                  onClick={() => openEditAddressForm(address)}
                                  className="text-[#252B42] text-[13px] underline"
                                >
                                  Düzenle
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteAddress(address.id)
                                  }
                                  className="text-red-500"
                                  aria-label="Adresi sil"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>

                            <div
                              className={`min-h-[130px] rounded-[6px] border p-[16px] ${
                                isSelected
                                  ? "border-[#F47B20] bg-[#FFF7F0]"
                                  : "border-[#DDDDDD] bg-white"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-[10px]">
                                <p className="flex items-center gap-[6px] text-[#252B42] text-[14px] font-bold">
                                  <User size={16} className="text-[#F47B20]" />
                                  {address.name} {address.surname}
                                </p>

                                <p className="flex items-center gap-[6px] text-[#252B42] text-[13px]">
                                  <Phone size={14} />
                                  {address.phone}
                                </p>
                              </div>

                              <p className="text-[#737373] text-[14px] leading-[22px]">
                                {address.neighborhood}
                              </p>

                              <p className="text-[#737373] text-[14px] leading-[22px]">
                                {address.district} / {address.city}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!sameBillingAddress && (
                    <div className="mt-[36px]">
                      <h2 className="text-[#252B42] text-[22px] leading-[30px] font-bold mb-[20px]">
                        Fatura Adresi
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                        {addressList.map((address) => {
                          const isSelected =
                            String(selectedBillingAddressId) ===
                            String(address.id);

                          return (
                            <div key={address.id}>
                              <div className="flex items-center justify-between mb-[8px]">
                                <label className="flex items-center gap-[8px] text-[#252B42] text-[14px] leading-[22px] cursor-pointer">
                                  <input
                                    type="radio"
                                    name="billingAddress"
                                    checked={isSelected}
                                    onChange={() =>
                                      setSelectedBillingAddressId(address.id)
                                    }
                                    className="accent-[#F47B20]"
                                  />
                                  {address.title}
                                </label>

                                <button
                                  type="button"
                                  onClick={() => openEditAddressForm(address)}
                                  className="text-[#252B42] text-[13px] underline"
                                >
                                  Düzenle
                                </button>
                              </div>

                              <div
                                className={`min-h-[130px] rounded-[6px] border p-[16px] ${
                                  isSelected
                                    ? "border-[#F47B20] bg-[#FFF7F0]"
                                    : "border-[#DDDDDD] bg-white"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-[10px]">
                                  <p className="flex items-center gap-[6px] text-[#252B42] text-[14px] font-bold">
                                    <User
                                      size={16}
                                      className="text-[#F47B20]"
                                    />
                                    {address.name} {address.surname}
                                  </p>

                                  <p className="flex items-center gap-[6px] text-[#252B42] text-[13px]">
                                    <Phone size={14} />
                                    {address.phone}
                                  </p>
                                </div>

                                <p className="text-[#737373] text-[14px] leading-[22px]">
                                  {address.neighborhood}
                                </p>

                                <p className="text-[#737373] text-[14px] leading-[22px]">
                                  {address.district} / {address.city}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>

                {isAddressFormOpen && (
                  <section className="bg-white border border-[#DDDDDD] rounded-[6px] p-[24px] mt-[24px]">
                    <h2 className="text-[#252B42] text-[22px] leading-[30px] font-bold mb-[20px]">
                      {editingAddress ? "Adresi Düzenle" : "Yeni Adres Ekle"}
                    </h2>

                    <form
                      onSubmit={handleSubmit(onSubmitAddress)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-[18px]"
                    >
                      <div>
                        <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                          Address Title
                        </label>

                        <input
                          type="text"
                          className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none"
                          {...register("title", {
                            required: "Adres başlığı zorunludur.",
                          })}
                        />

                        {errors.title && (
                          <p className="text-red-500 text-[13px] mt-[5px]">
                            {errors.title.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                          Phone
                        </label>

                        <input
                          type="text"
                          placeholder="05376845834"
                          className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none"
                          {...register("phone", {
                            required: "Telefon zorunludur.",
                            pattern: {
                              value: /^0[2-5]\d{9}$/,
                              message:
                                "Geçerli Türkiye telefon numarası giriniz.",
                            },
                          })}
                        />

                        {errors.phone && (
                          <p className="text-red-500 text-[13px] mt-[5px]">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                          Name
                        </label>

                        <input
                          type="text"
                          className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none"
                          {...register("name", {
                            required: "İsim zorunludur.",
                          })}
                        />

                        {errors.name && (
                          <p className="text-red-500 text-[13px] mt-[5px]">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                          Surname
                        </label>

                        <input
                          type="text"
                          className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none"
                          {...register("surname", {
                            required: "Soyisim zorunludur.",
                          })}
                        />

                        {errors.surname && (
                          <p className="text-red-500 text-[13px] mt-[5px]">
                            {errors.surname.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                          City
                        </label>

                        <select
                          className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none bg-white"
                          {...register("city", {
                            required: "İl seçimi zorunludur.",
                          })}
                        >
                          <option value="">İl Seçiniz</option>

                          {cities.map((city) => (
                            <option key={city} value={city.toLowerCase()}>
                              {city}
                            </option>
                          ))}
                        </select>

                        {errors.city && (
                          <p className="text-red-500 text-[13px] mt-[5px]">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                          District
                        </label>

                        <input
                          type="text"
                          className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none"
                          {...register("district", {
                            required: "İlçe zorunludur.",
                          })}
                        />

                        {errors.district && (
                          <p className="text-red-500 text-[13px] mt-[5px]">
                            {errors.district.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                          Neighborhood / Address Detail
                        </label>

                        <textarea
                          rows={4}
                          className="w-full border border-[#DDDDDD] rounded-[5px] px-[14px] py-[12px] outline-none resize-none"
                          {...register("neighborhood", {
                            required: "Adres detayı zorunludur.",
                          })}
                        />

                        {errors.neighborhood && (
                          <p className="text-red-500 text-[13px] mt-[5px]">
                            {errors.neighborhood.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2 flex flex-col sm:flex-row gap-[12px] justify-end">
                        <button
                          type="button"
                          onClick={closeAddressForm}
                          className="h-[46px] px-[24px] border border-[#DDDDDD] rounded-[5px] text-[#252B42] text-[14px] font-bold"
                        >
                          Vazgeç
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="h-[46px] px-[24px] bg-[#F47B20] rounded-[5px] text-white text-[14px] font-bold disabled:opacity-60 flex items-center justify-center gap-[8px]"
                        >
                          {isSubmitting && (
                            <span className="w-[16px] h-[16px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                          )}

                          {editingAddress ? "Güncelle" : "Kaydet"}
                        </button>
                      </div>
                    </form>
                  </section>
                )}
              </>
            )}

            {activeStep === 2 && (
              <section className="bg-white border border-[#DDDDDD] rounded-[6px] overflow-hidden">
                <div className="p-[24px] border-b border-[#E6E6E6] flex items-start gap-[14px]">
                  <div className="w-[28px] h-[28px] rounded-full border-2 border-[#F47B20] flex items-center justify-center shrink-0">
                    <span className="w-[12px] h-[12px] rounded-full bg-[#F47B20]" />
                  </div>

                  <div>
                    <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold">
                      Kart ile Öde
                    </h2>

                    <p className="text-[#252B42] text-[14px] leading-[22px] font-bold">
                      Kart ile ödemeyi seçtiniz. Banka veya kredi kartı
                      kullanarak ödemenizi güvenle yapabilirsiniz.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-[28px] border-r border-[#E6E6E6]">
                    <div className="flex items-center justify-between gap-[12px] mb-[22px]">
                      <h3 className="text-[#252B42] text-[24px] leading-[32px] font-normal">
                        Kart Bilgileri
                      </h3>

                      <button
                        type="button"
                        onClick={openNewCardForm}
                        className="text-[#252B42] text-[14px] underline"
                      >
                        Başka bir Kart ile Ödeme Yap
                      </button>
                    </div>

                    {cardLoading ? (
                      <div className="py-[50px] flex justify-center">
                        <div className="w-[36px] h-[36px] border-4 border-[#F47B20] border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
                        {creditCards.map((card) => {
                          const isSelected =
                            String(selectedCardId) === String(card.id);

                          return (
                            <div key={card.id}>
                              <div className="flex items-center justify-between mb-[8px]">
                                <label className="flex items-center gap-[8px] text-[#252B42] text-[14px] font-bold cursor-pointer">
                                  <input
                                    type="radio"
                                    name="selectedCard"
                                    checked={isSelected}
                                    onChange={() => setSelectedCardId(card.id)}
                                    className="accent-[#F47B20]"
                                  />
                                  {card.name_on_card}
                                </label>

                                <div className="flex items-center gap-[10px]">
                                  <button
                                    type="button"
                                    onClick={() => openEditCardForm(card)}
                                    className="text-[#252B42] text-[13px] underline"
                                  >
                                    Düzenle
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCard(card.id)}
                                    className="text-red-500 text-[13px]"
                                  >
                                    Sil
                                  </button>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setSelectedCardId(card.id)}
                                className={`w-full min-h-[145px] rounded-[6px] border p-[16px] text-left ${
                                  isSelected
                                    ? "border-[#F47B20] bg-[#FFF7F0]"
                                    : "border-[#DDDDDD] bg-white"
                                }`}
                              >
                                <p className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[34px]">
                                  {card.name_on_card}
                                </p>

                                <p className="text-[#252B42] text-[15px] leading-[22px] font-bold text-right">
                                  {maskCardNumber(card.card_no)}
                                </p>

                                <p className="text-[#252B42] text-[14px] leading-[20px] font-bold text-right">
                                  {card.expire_month}/{card.expire_year}
                                </p>
                              </button>
                            </div>
                          );
                        })}

                        {creditCards.length === 0 && (
                          <button
                            type="button"
                            onClick={openNewCardForm}
                            className="min-h-[145px] border border-[#DDDDDD] rounded-[6px] bg-[#FAFAFA] flex flex-col items-center justify-center"
                          >
                            <span className="text-[#F47B20] text-[34px] leading-[34px]">
                              +
                            </span>

                            <span className="text-[#252B42] text-[14px] leading-[22px] font-bold mt-[8px]">
                              Yeni Kart Ekle
                            </span>
                          </button>
                        )}
                      </div>
                    )}

                    {isCardFormOpen && (
                      <div className="mt-[24px] pt-[24px] border-t border-[#E6E6E6]">
                        <h3 className="text-[#252B42] text-[18px] leading-[26px] font-bold mb-[18px]">
                          {editingCard ? "Kartı Düzenle" : "Yeni Kart Ekle"}
                        </h3>

                        <form
                          onSubmit={handleSubmitCard(onSubmitCard)}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]"
                        >
                          <div>
                            <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                              Kart Üzerindeki İsim
                            </label>

                            <input
                              type="text"
                              className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none"
                              {...registerCard("name_on_card", {
                                required: "Kart üzerindeki isim zorunludur.",
                              })}
                            />

                            {cardErrors.name_on_card && (
                              <p className="text-red-500 text-[13px] mt-[5px]">
                                {cardErrors.name_on_card.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                              Kart Numarası
                            </label>

                            <input
                              type="text"
                              maxLength={19}
                              placeholder="1234123412341234"
                              className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none"
                              {...registerCard("card_no", {
                                required: "Kart numarası zorunludur.",
                                validate: (value) =>
                                  /^\d{16}$/.test(value.replace(/\s/g, "")) ||
                                  "Kart numarası 16 haneli olmalıdır.",
                              })}
                            />

                            {cardErrors.card_no && (
                              <p className="text-red-500 text-[13px] mt-[5px]">
                                {cardErrors.card_no.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                              Son Kullanma Ay
                            </label>

                            <select
                              className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none bg-white"
                              {...registerCard("expire_month", {
                                required: "Ay seçimi zorunludur.",
                              })}
                            >
                              <option value="">Ay</option>

                              {Array.from(
                                { length: 12 },
                                (_, index) => index + 1
                              ).map((month) => (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              ))}
                            </select>

                            {cardErrors.expire_month && (
                              <p className="text-red-500 text-[13px] mt-[5px]">
                                {cardErrors.expire_month.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                              Son Kullanma Yıl
                            </label>

                            <select
                              className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none bg-white"
                              {...registerCard("expire_year", {
                                required: "Yıl seçimi zorunludur.",
                              })}
                            >
                              <option value="">Yıl</option>

                              {Array.from({ length: 12 }, (_, index) => {
                                return new Date().getFullYear() + index;
                              }).map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>

                            {cardErrors.expire_year && (
                              <p className="text-red-500 text-[13px] mt-[5px]">
                                {cardErrors.expire_year.message}
                              </p>
                            )}
                          </div>

                          <div className="sm:col-span-2 flex flex-col sm:flex-row gap-[12px] justify-end">
                            <button
                              type="button"
                              onClick={closeCardForm}
                              className="h-[46px] px-[24px] border border-[#DDDDDD] rounded-[5px] text-[#252B42] text-[14px] font-bold"
                            >
                              Vazgeç
                            </button>

                            <button
                              type="submit"
                              disabled={isCardSubmitting}
                              className="h-[46px] px-[24px] bg-[#F47B20] rounded-[5px] text-white text-[14px] font-bold disabled:opacity-60 flex items-center justify-center gap-[8px]"
                            >
                              {isCardSubmitting && (
                                <span className="w-[16px] h-[16px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                              )}

                              {editingCard ? "Güncelle" : "Kaydet"}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    <div className="mt-[24px] pt-[24px] border-t border-[#E6E6E6]">
                      <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                        Ödemeyi seçtiğiniz/eklediğiniz kart için CVV
                      </label>

                      <input
                        type="text"
                        maxLength={4}
                        value={cardCcv}
                        onChange={(event) => setCardCcv(event.target.value)}
                        placeholder="321"
                        className="w-full h-[48px] border border-[#DDDDDD] rounded-[5px] px-[14px] outline-none"
                      />
                    </div>

                    <label className="flex items-center gap-[10px] mt-[24px] text-[#252B42] text-[15px] leading-[22px] font-bold">
                      <input
                        type="checkbox"
                        checked={use3DSecure}
                        onChange={(event) =>
                          setUse3DSecure(event.target.checked)
                        }
                        className="w-[18px] h-[18px] accent-[#F47B20]"
                      />
                      3D Secure ile ödemek istiyorum.
                    </label>
                  </div>

                  <div className="p-[28px]">
                    <h3 className="text-[#252B42] text-[24px] leading-[32px] font-bold mb-[8px]">
                      Taksit Seçenekleri
                    </h3>

                    <p className="text-[#252B42] text-[14px] leading-[22px] mb-[24px]">
                      Kartınıza uygun taksit seçeneğini seçiniz.
                    </p>

                    <div className="border border-[#DDDDDD] rounded-[6px] overflow-hidden">
                      <div className="grid grid-cols-2 bg-[#FAFAFA]">
                        <div className="p-[16px] border-r border-[#DDDDDD] text-[#252B42] text-[15px] font-bold">
                          Taksit Sayısı
                        </div>

                        <div className="p-[16px] text-[#252B42] text-[15px] font-bold">
                          Aylık Ödeme
                        </div>
                      </div>

                      <div className="grid grid-cols-2">
                        <div className="p-[16px] border-r border-[#DDDDDD] text-[#F47B20] text-[15px] font-bold flex items-center gap-[8px]">
                          <input
                            type="radio"
                            checked
                            readOnly
                            className="accent-[#F47B20]"
                          />
                          Tek Çekim
                        </div>

                        <div className="p-[16px] text-[#F47B20] text-[15px] font-bold">
                          {formatPrice(grandTotal)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </section>
            )}
          </div>

          <aside className="w-full xl:sticky xl:top-[30px]">
            <button
              type="button"
              onClick={handleRightButtonClick}
              disabled={orderSubmitting}
              className="w-full h-[58px] bg-[#F47B20] text-white rounded-[6px] text-[16px] leading-[24px] font-bold mb-[16px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-[8px]"
            >
              {orderSubmitting && activeStep === 2 && (
                <span className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}

              {activeStep === 1 ? "Kaydet ve Devam Et" : "Ödeme Yap"}
            </button>

            <div className="bg-white border border-[#E6E6E6] rounded-[8px] p-[20px] mb-[20px]">
              <label className="flex items-start gap-[10px] text-[#737373] text-[12px] leading-[18px]">
                <input type="checkbox" className="mt-[3px]" />

                <span>
                  Ön Bilgilendirme Koşulları&apos;nı ve Mesafeli Satış
                  Sözleşmesi&apos;ni okudum, onaylıyorum.
                </span>
              </label>
            </div>

            <div className="bg-white border border-[#E6E6E6] rounded-[8px] p-[22px] shadow-sm mb-[20px]">
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

                <p className="text-[#F47B20] text-[20px] leading-[28px] font-bold">
                  {formatPrice(grandTotal)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRightButtonClick}
              disabled={orderSubmitting}
              className="w-full h-[58px] bg-[#F47B20] text-white rounded-[6px] text-[16px] leading-[24px] font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-[8px]"
            >
              {orderSubmitting && activeStep === 2 && (
                <span className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}

              {activeStep === 1 ? "Kaydet ve Devam Et" : "Ödeme Yap"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default CreateOrder;