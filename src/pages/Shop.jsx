import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import BrandLogos from "../components/home/BrandLogos";
import ShopPageHeader from "../components/shop/ShopPageHeader";
import ShopCategoryCards from "../components/shop/ShopCategoryCards";
import ShopPromoCards from "../components/shop/ShopPromoCards";
import ShopFilterRow from "../components/shop/ShopFilterRow";
import ShopProductGrid from "../components/shop/ShopProductGrid";
import ShopPagination from "../components/shop/ShopPagination";

import {
  fetchProducts,
  fetchCategoriesIfNeeded,
  setFilter as setFilterAction,
  setOffset,
  setLimit,
} from "../store/actions/productActions";

function Shop() {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const productList = useSelector((state) => state.product.productList);
  const categories = useSelector((state) => state.product.categories);
  const total = useSelector((state) => state.product.total);
  const fetchState = useSelector((state) => state.product.fetchState);
  const limit = useSelector((state) => state.product.limit);
  const offset = useSelector((state) => state.product.offset);

  const [filter, setFilter] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setOffset(0));
  }, [dispatch, categoryId, filter, sort]);

  useEffect(() => {
    dispatch(setFilterAction(filter));

    dispatch(
      fetchProducts({
        category: categoryId,
        filter,
        sort,
        limit,
        offset,
      })
    );
  }, [dispatch, categoryId, filter, sort, limit, offset]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleFilterClick = () => {
    setSort(selectedSort);
  };

  const handleLimitChange = (event) => {
    dispatch(setLimit(Number(event.target.value)));
    dispatch(setOffset(0));
  };

  const handlePageChange = (newOffset) => {
    dispatch(setOffset(newOffset));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="w-full bg-white">
      <ShopPageHeader />
      <ShopCategoryCards />
      <ShopPromoCards />

      <ShopFilterRow
        totalProducts={total}
        filter={filter}
        onFilterChange={handleFilterChange}
        sortValue={selectedSort}
        onSortChange={handleSortChange}
        onApplyFilter={handleFilterClick}
        limit={limit}
        onLimitChange={handleLimitChange}
      />

      <ShopProductGrid
        products={productList}
        categories={categories}
        isLoading={fetchState === "FETCHING"}
        isFailed={fetchState === "FAILED"}
      />

      <ShopPagination
        total={total}
        limit={limit}
        offset={offset}
        onPageChange={handlePageChange}
      />

      <BrandLogos />
    </main>
  );
}

export default Shop;