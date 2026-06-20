import icon1 from "../../assets/images/icon1.png";
import icon2 from "../../assets/images/icon2.png";
import icon3 from "../../assets/images/icon3.png";

const features = [
  {
    id: 1,
    icon: icon1,
    title: "Easy Wins",
    description: "Get your best looking smile now!",
  },
  {
    id: 2,
    icon: icon2,
    title: "Concrete",
    description:
      "Defalcate is most focused in helping you discover your most beautiful smile",
  },
  {
    id: 3,
    icon: icon3,
    title: "Hack Growth",
    description: "Overcame any hurdle or any other problem.",
  },
];

function FeaturesSection() {
  return (
    <section className="w-full bg-white py-[80px]">
      <div className="max-w-[1050px] mx-auto px-4">
        {/* Başlık alanı */}
        <div className="text-center mb-[80px]">
          <p className="text-[#737373] text-[20px] leading-[30px] font-normal mb-[10px]">
            Featured Products
          </p>

          <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold tracking-[0.1px] mb-[10px]">
            THE BEST SERVICES
          </h2>

          <p className="text-[#737373] text-[14px] leading-[20px] font-normal">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center px-[35px]"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-[72px] h-[72px] object-contain mb-[20px]"
              />

              <h3 className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[20px]">
                {feature.title}
              </h3>

              <p className="text-[#737373] text-[14px] leading-[20px] font-normal max-w-[230px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;