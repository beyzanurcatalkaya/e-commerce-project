import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategoriesIfNeeded } from "../../store/actions/productActions";
import { getCategoryLink } from "../../utils/categoryUtils";

function ShopCategoryCards() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.product.categories);
  const fetchState = useSelector((state) => state.product.fetchState);

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  const topCategories = [...categories]
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, 5);

  return (
    <section className="w-full bg-[#FAFAFA] pb-[48px]">
      <div className="max-w-[1050px] mx-auto px-4">
        {fetchState === "FETCHING" && (
          <div className="py-[40px] flex justify-center">
            <div className="w-[36px] h-[36px] border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {fetchState !== "FETCHING" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[15px]">
            {topCategories.map((category) => (
              <Link
                key={category.id}
                to={getCategoryLink(category)}
                className="relative h-[223px] overflow-hidden bg-[#EAEAEA] block"
              >
                <img
                  src={category.img || category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                  <h2 className="text-[16px] leading-[24px] font-bold uppercase">
                    {category.title}
                  </h2>

                  <p className="text-[14px] leading-[24px] font-bold">
                    Rating: {category.rating}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopCategoryCards;