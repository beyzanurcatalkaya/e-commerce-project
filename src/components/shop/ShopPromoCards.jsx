import shopcard1 from "../../assets/shopcard/shopcard1.png";
import shopcard2 from "../../assets/shopcard/shopcard2.png";

const promoCards = [
  {
    id: 1,
    image: shopcard1,
    title: "Elements Style",
    subtitle: "Ends Today",
  },
  {
    id: 2,
    image: shopcard2,
    title: "Unique Life",
    subtitle: "Your Space",
  },
];

function ShopPromoCards() {
  return (
    <section className="w-full bg-white py-[70px]">
      <div className="max-w-[1050px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px]">
          {promoCards.map((card) => (
            <div
              key={card.id}
              className="relative h-[340px] overflow-hidden bg-[#FAFAFA]"
            >
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="relative z-10 h-full flex flex-col justify-center pl-[45px] max-w-[260px]">
                <h2 className="text-[#252B42] text-[40px] leading-[50px] font-bold tracking-[0.2px] mb-[10px]">
                  {card.title}
                </h2>

                <p className="text-[#E77C40] text-[14px] leading-[24px] font-bold mb-[18px]">
                  {card.subtitle}
                </p>

                <button
                  type="button"
                  className="text-[#252B42] text-[14px] leading-[24px] font-bold underline text-left"
                >
                  Explore Items
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShopPromoCards;