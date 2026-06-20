import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Search, Heart, ChevronDown, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategoriesIfNeeded } from "../../store/actions/productActions";
import {
  getCategoryLink,
  groupCategoriesByGender,
} from "../../utils/categoryUtils";

import CartDropdown from "./CartDropdown";
import UserDropdown from "./UserDropdown";

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);

  const isLoggedIn = user && Object.keys(user).length > 0;

  const groupedCategories = groupCategoriesByGender(categories || []);

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(false);
  };

  return (
    <nav className="w-full bg-white border-b border-[#E6E6E6] relative z-50">
      <div className="max-w-[1292px] mx-auto px-4 md:px-8 h-[76px] lg:h-[112px] flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-[#252B42] text-[24px] leading-[32px] font-bold tracking-[0.1px]"
        >
          Bandage
        </Link>

        {/* Desktop Menü */}
        <ul className="hidden lg:flex items-center gap-[21px] text-[#737373] text-[14px] leading-[24px] font-bold tracking-[0.2px]">
          <li>
            <Link to="/" className="hover:text-[#252B42] transition">
              Home
            </Link>
          </li>

          <li className="relative group py-[20px]">
            <Link
              to="/shop"
              className="flex items-center gap-1 hover:text-[#252B42] transition"
            >
              Shop
              <ChevronDown size={14} strokeWidth={2.5} />
            </Link>

            <div className="absolute top-full left-0 z-50 hidden group-hover:grid grid-cols-2 gap-[40px] w-[360px] bg-white px-[30px] py-[25px] shadow-lg border border-[#E6E6E6]">
              <div>
                <h3 className="text-[#252B42] text-[14px] leading-[24px] font-bold mb-[18px]">
                  Kadın
                </h3>

                <ul className="space-y-[12px]">
                  {groupedCategories.kadin.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={getCategoryLink(category)}
                        className="text-[#737373] text-[14px] leading-[24px] font-bold hover:text-[#23A6F0]"
                      >
                        {category.title || category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[#252B42] text-[14px] leading-[24px] font-bold mb-[18px]">
                  Erkek
                </h3>

                <ul className="space-y-[12px]">
                  {groupedCategories.erkek.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={getCategoryLink(category)}
                        className="text-[#737373] text-[14px] leading-[24px] font-bold hover:text-[#23A6F0]"
                      >
                        {category.title || category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          <li>
            <Link to="/about" className="hover:text-[#252B42] transition">
              About
            </Link>
          </li>

          <li>
            <Link to="/blog" className="hover:text-[#252B42] transition">
              Blog
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-[#252B42] transition">
              Contact
            </Link>
          </li>

          <li>
            <Link to="/team" className="hover:text-[#252B42] transition">
              Pages
            </Link>
          </li>
        </ul>

        {/* Desktop Sağ Alan */}
        <div className="hidden md:flex items-center gap-[22px] text-[#23A6F0] text-[14px] leading-[24px] font-bold">
          {isLoggedIn ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center gap-[8px]">
              <Link
                to={{
                  pathname: "/login",
                  state: {
                    from:
                      location.pathname === "/login"
                        ? { pathname: "/" }
                        : location,
                  },
                }}
                className="flex items-center gap-1 hover:text-[#1687c7] transition"
              >
                <User size={16} strokeWidth={2.2} />
                <span>Login</span>
              </Link>

              <span>/</span>

              <Link to="/signup" className="hover:text-[#1687c7] transition">
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            aria-label="Search"
            className="hover:text-[#1687c7] transition"
          >
            <Search size={20} strokeWidth={2.2} />
          </button>

          <div className="flex items-center gap-1 hover:text-[#1687c7] transition">
            <CartDropdown />
          </div>

          <button
            type="button"
            aria-label="Favorites"
            className="flex items-center gap-1 hover:text-[#1687c7] transition"
          >
            <Heart size={20} strokeWidth={2.2} />
            <span>1</span>
          </button>
        </div>

        {/* Mobil Menü Butonu */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="lg:hidden text-[#252B42]"
        >
          {isMobileMenuOpen ? (
            <X size={30} strokeWidth={2.3} />
          ) : (
            <Menu size={30} strokeWidth={2.3} />
          )}
        </button>
      </div>

      {/* Mobil Menü */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-t border-[#E6E6E6] shadow-md">
          <div className="px-4 py-[28px] flex flex-col items-center gap-[20px]">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="text-[#737373] text-[22px] leading-[30px] font-normal hover:text-[#23A6F0] transition"
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={closeMobileMenu}
              className="text-[#737373] text-[22px] leading-[30px] font-normal hover:text-[#23A6F0] transition"
            >
              Shop
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileCategoriesOpen((prev) => !prev)}
              className="flex items-center gap-[6px] text-[#737373] text-[18px] leading-[26px] font-bold hover:text-[#23A6F0] transition"
            >
              Categories
              <ChevronDown
                size={16}
                className={`transition ${
                  isMobileCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMobileCategoriesOpen && (
              <div className="w-full max-w-[340px] grid grid-cols-2 gap-[24px] text-left">
                <div>
                  <h3 className="text-[#252B42] text-[14px] font-bold mb-[8px]">
                    Kadın
                  </h3>

                  <ul className="space-y-[8px]">
                    {groupedCategories.kadin.slice(0, 6).map((category) => (
                      <li key={category.id}>
                        <Link
                          to={getCategoryLink(category)}
                          onClick={closeMobileMenu}
                          className="text-[#737373] text-[13px] leading-[20px] font-bold"
                        >
                          {category.title || category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#252B42] text-[14px] font-bold mb-[8px]">
                    Erkek
                  </h3>

                  <ul className="space-y-[8px]">
                    {groupedCategories.erkek.slice(0, 6).map((category) => (
                      <li key={category.id}>
                        <Link
                          to={getCategoryLink(category)}
                          onClick={closeMobileMenu}
                          className="text-[#737373] text-[13px] leading-[20px] font-bold"
                        >
                          {category.title || category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="text-[#737373] text-[22px] leading-[30px] font-normal hover:text-[#23A6F0] transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="text-[#737373] text-[22px] leading-[30px] font-normal hover:text-[#23A6F0] transition"
            >
              Contact
            </Link>

            <Link
              to="/team"
              onClick={closeMobileMenu}
              className="text-[#737373] text-[22px] leading-[30px] font-normal hover:text-[#23A6F0] transition"
            >
              Pages
            </Link>

            <div className="w-full max-w-[340px] pt-[20px] border-t border-[#E6E6E6] flex flex-col items-center gap-[16px] text-[#23A6F0] text-[15px] font-bold">
              {isLoggedIn ? (
                <UserDropdown />
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2"
                  >
                    <User size={16} />
                    Login
                  </Link>

                  <Link to="/signup" onClick={closeMobileMenu}>
                    Register
                  </Link>
                </>
              )}

              <CartDropdown />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;