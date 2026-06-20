import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, LogOut, PackageCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import md5 from "blueimp-md5";

import { logoutUser } from "../../store/actions/clientActions";

function UserDropdown() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);

  const [isOpen, setIsOpen] = useState(false);

  const userEmail = user?.email || "";
  const userName = user?.name || user?.email || "User";

  const gravatarUrl = userEmail
    ? `https://www.gravatar.com/avatar/${md5(
        userEmail.trim().toLowerCase()
      )}?d=identicon`
    : "";

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-[8px] text-[#252B42] hover:text-[#23A6F0] transition"
      >
        {gravatarUrl && (
          <img
            src={gravatarUrl}
            alt={userName}
            className="w-[28px] h-[28px] rounded-full"
          />
        )}

        <span className="max-w-[140px] truncate text-[14px] font-bold">
          {userName}
        </span>

        <ChevronDown size={15} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 w-[220px] bg-white border border-[#E6E6E6] rounded-[6px] shadow-xl overflow-hidden">
          <Link
            to="/orders"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-[10px] px-[16px] py-[13px] text-[#252B42] text-[14px] font-bold hover:bg-[#FAFAFA]"
          >
            <PackageCheck size={18} className="text-[#F47B20]" />
            Siparişlerim
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-[10px] px-[16px] py-[13px] text-left text-[#252B42] text-[14px] font-bold hover:bg-[#FAFAFA]"
          >
            <LogOut size={18} className="text-red-500" />
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;