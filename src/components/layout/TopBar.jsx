import { Phone, Mail } from "lucide-react";

import headerfb from "../../assets/images/headerfb.png";
import headerinsta from "../../assets/images/headerinsta.png";
import headerx from "../../assets/images/headerx.png";
import headeryt from "../../assets/images/headeryt.png";

function TopBar() {
  return (
    <div className="w-full bg-[#252B42] text-white">
      <div className="max-w-[1292px] mx-auto px-8 h-[58px] flex items-center justify-between">
        {/* Sol iletişim alanı */}
        <div className="flex items-center gap-8 text-[14px] font-bold">
          <div className="flex items-center gap-2">
            <Phone size={16} strokeWidth={2.4} />
            <span>(225) 555-0118</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={17} strokeWidth={2.4} />
            <span>michelle.rivera@example.com</span>
          </div>
        </div>

        {/* Orta metin */}
        <p className="hidden lg:block text-[14px] font-bold tracking-[0.2px]">
          Follow Us and get a chance to win 80% off
        </p>

        {/* Sağ sosyal medya alanı */}
        <div className="flex items-center gap-3 text-[14px] font-bold">
          <span>Follow Us :</span>

          <a href="#" aria-label="Instagram">
            <img
              src={headerinsta}
              alt="Instagram"
              className="w-4 h-4 object-contain"
            />
          </a>

          <a href="#" aria-label="YouTube">
            <img
              src={headeryt}
              alt="YouTube"
              className="w-4 h-4 object-contain"
            />
          </a>

          <a href="#" aria-label="Facebook">
            <img
              src={headerfb}
              alt="Facebook"
              className="w-4 h-4 object-contain"
            />
          </a>

          <a href="#" aria-label="Twitter">
            <img
              src={headerx}
              alt="Twitter"
              className="w-4 h-4 object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;