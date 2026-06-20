import ct1 from "../../assets/images/ct1.png";
import ct2 from "../../assets/images/ct2.png";

function AboutSection() {
  return (
    <section className="w-full bg-white py-[90px]">
      <div className="max-w-[1050px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[90px]">
          {/* Sol görseller */}
          <div className="flex justify-center lg:justify-start gap-[16px]">
            <img
              src={ct1}
              alt="Featured product"
              className="w-[217px] h-[498px] object-cover"
            />

            <img
              src={ct2}
              alt="Featured product"
              className="w-[280px] h-[498px] object-cover"
            />
          </div>

          {/* Sağ metin */}
          <div className="max-w-[450px]">
            <p className="text-[#23A6F0] text-[16px] leading-[24px] font-bold mb-[16px]">
              Featured Products
            </p>

            <h2 className="text-[#252B42] text-[40px] leading-[50px] font-bold tracking-[0.2px] mb-[16px]">
              We love what we do
            </h2>

            <p className="text-[#737373] text-[14px] leading-[20px] font-normal mb-[24px]">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics.
            </p>

            <p className="text-[#737373] text-[14px] leading-[20px] font-normal">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;