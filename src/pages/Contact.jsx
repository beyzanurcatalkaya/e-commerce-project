import xlogo from "../assets/logos/xlogo.png";
import facelogo from "../assets/logos/facelogo.png";
import instalogo from "../assets/logos/instalogo.png";
import linkedinlogo from "../assets/logos/linkedinlogo.png";

function Contact() {
  return (
    <main className="w-full bg-white">
      <section className="w-full bg-white py-[110px] md:py-[120px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-[#252B42] text-[40px] md:text-[40px] leading-[50px] font-bold tracking-[0.2px] max-w-[430px] mb-[24px]">
              Get answers to all your questions.
            </h1>

            <p className="text-[#737373] text-[14px] leading-[20px] font-normal max-w-[470px] mb-[24px]">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics:
            </p>

            <button
              type="button"
              className="w-[186px] h-[52px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[22px] font-bold mb-[34px]"
            >
              CONTACT OUR COMPANY
            </button>

            <div className="flex items-center justify-center gap-[25px]">
              <a href="#" aria-label="Twitter">
                <img
                  src={xlogo}
                  alt="Twitter"
                  className="w-[24px] h-[24px] object-contain opacity-60"
                />
              </a>

              <a href="#" aria-label="Facebook">
                <img
                  src={facelogo}
                  alt="Facebook"
                  className="w-[24px] h-[24px] object-contain opacity-60"
                />
              </a>

              <a href="#" aria-label="Instagram">
                <img
                  src={instalogo}
                  alt="Instagram"
                  className="w-[24px] h-[24px] object-contain opacity-60"
                />
              </a>

              <a href="#" aria-label="LinkedIn">
                <img
                  src={linkedinlogo}
                  alt="LinkedIn"
                  className="w-[24px] h-[24px] object-contain opacity-60"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;