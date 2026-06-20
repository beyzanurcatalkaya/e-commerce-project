import { Link } from "react-router-dom";
import heroCover from "../../assets/images/hero-cover.png";

function Hero() {
  return (
    <section className="w-full bg-white pt-6 md:pt-12 pb-8 md:pb-12 overflow-hidden">
      <div className="max-w-[1225px] mx-auto px-4 md:px-0">
        <div className="relative min-h-[650px] md:h-[590px] rounded-2xl bg-[#96E9FB] overflow-hidden">
          <div className="relative z-20 flex flex-col items-center md:items-start text-center md:text-left px-6 md:pl-[115px] pt-[55px] md:pt-0 md:h-full md:justify-center max-w-full md:max-w-[610px]">
            <p className="text-[#2A7CC7] text-base font-bold mb-5 md:mb-8">
              SUMMER 2020
            </p>

            <h1 className="text-[#252B42] text-[38px] leading-[48px] md:text-[58px] md:leading-[70px] font-bold mb-5 md:mb-7 tracking-[0.2px]">
              NEW COLLECTION
            </h1>

            <p className="text-[#737373] text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] font-medium max-w-[335px] md:max-w-[395px] mb-7 md:mb-8">
              We know how large objects will act, but things on a small scale.
            </p>

            <Link
              to="/shop"
              className="bg-[#23A6F0] text-white text-[20px] md:text-[24px] leading-[30px] md:leading-[32px] font-bold px-[34px] md:px-[38px] py-[13px] md:py-[14px] rounded-[5px]"
            >
              SHOP NOW
            </Link>
          </div>

          <div className="hidden md:block absolute top-0 right-[-35px] w-[520px] h-[520px] rounded-full bg-white z-0" />
          <div className="hidden md:block absolute top-[38px] right-[450px] w-[75px] h-[75px] rounded-full bg-white z-10" />
          <div className="hidden md:block absolute top-[115px] right-[-60px] w-[15px] h-[15px] rounded-full bg-[#977DF4] z-20" />
          <div className="hidden md:block absolute top-[230px] right-[-48px] w-[30px] h-[30px] rounded-full bg-white z-20" />
          <div className="hidden md:block absolute bottom-[185px] right-[490px] w-[15px] h-[15px] rounded-full bg-[#977DF4] z-20" />

          <img
            src={heroCover}
            alt="New collection"
            className="absolute bottom-0 left-1/2 md:left-auto md:right-[-85px] -translate-x-1/2 md:translate-x-0 z-10 h-auto max-h-[305px] sm:max-h-[350px] md:max-h-[555px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;