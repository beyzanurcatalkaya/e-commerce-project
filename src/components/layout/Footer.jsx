import facebook from "../../assets/footer/facebook.png";
import instagram from "../../assets/footer/instagram.png";
import x from "../../assets/footer/x.png";

const footerColumns = [
  {
    id: 1,
    title: "Company Info",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    id: 2,
    title: "Legal",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    id: 3,
    title: "Features",
    links: ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"],
  },
  {
    id: 4,
    title: "Resources",
    links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
  },
];

function Footer() {
  return (
    <footer className="w-full bg-white">
      {/* Üst logo ve sosyal medya alanı */}
      <div className="bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-4 py-[40px]">
          <div className="flex items-center justify-between">
            <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold tracking-[0.1px]">
              Bandage
            </h2>

            <div className="flex items-center gap-[20px]">
              <a href="#" aria-label="Facebook">
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-[24px] h-[24px] object-contain"
                />
              </a>

              <a href="#" aria-label="Instagram">
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-[24px] h-[24px] object-contain"
                />
              </a>

              <a href="#" aria-label="Twitter">
                <img
                  src={x}
                  alt="Twitter"
                  className="w-[24px] h-[24px] object-contain"
                />
              </a>
            </div>
          </div>

          <hr className="mt-[40px] border-[#E6E6E6]" />
        </div>
      </div>

      {/* Linkler ve subscribe alanı */}
      <div className="bg-white">
        <div className="max-w-[1050px] mx-auto px-4 py-[50px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1.8fr] gap-[30px]">
            {footerColumns.map((column) => (
              <div key={column.id}>
                <h3 className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[20px]">
                  {column.title}
                </h3>

                <ul className="space-y-[10px]">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[#737373] text-[14px] leading-[24px] font-bold hover:text-[#23A6F0] transition"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Get In Touch */}
            <div>
              <h3 className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[20px]">
                Get In Touch
              </h3>

              <form className="flex h-[58px] mb-[10px]">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-[#E6E6E6] bg-[#F9F9F9] rounded-l-[5px] px-[20px] text-[#737373] text-[14px] leading-[28px] outline-none"
                />

                <button
                  type="submit"
                  className="w-[117px] bg-[#23A6F0] text-white text-[14px] leading-[28px] font-normal rounded-r-[5px]"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-[#737373] text-[12px] leading-[28px]">
                Lore imp sum dolor Amit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alt copyright */}
      <div className="bg-[#FAFAFA]">
        <div className="max-w-[1050px] mx-auto px-4 py-[25px]">
          <p className="text-[#737373] text-[14px] leading-[24px] font-bold">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;