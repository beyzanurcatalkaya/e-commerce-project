import { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

import {
  fetchProductById,
  fetchCategoriesIfNeeded,
} from "../store/actions/productActions";
import { findProductCategory, getCategoryLink } from "../utils/categoryUtils";
import { addToCart } from "../store/actions/shoppingCartActions";
import { toast } from "react-toastify";

function ProductDetail() {
  const dispatch = useDispatch();
 
  const history = useHistory();
  const { productId } = useParams();

  const product = useSelector((state) => state.product.product);
   const handleAddToCart = () => {
  dispatch(addToCart(product));
  toast.success("Ürün sepete eklendi.");
};
  const categories = useSelector((state) => state.product.categories);
  const fetchState = useSelector((state) => state.product.fetchState);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      const sortedImages = [...product.images].sort(
        (a, b) => Number(a.index) - Number(b.index)
      );

      setSelectedImage(sortedImages[0].url);
    }
  }, [product]);

  const category = useMemo(() => {
    return findProductCategory(product, categories);
  }, [product, categories]);

  const sortedImages = useMemo(() => {
    if (!product?.images) {
      return [];
    }

    return [...product.images].sort(
      (a, b) => Number(a.index) - Number(b.index)
    );
  }, [product]);

  const productName = product?.name || "Product";
  const productDescription = product?.description || "";
  const productPrice =
    product?.price !== undefined ? `$${Number(product.price).toFixed(2)}` : "";
  const productStock = product?.stock ?? 0;
  const productRating = product?.rating ?? 0;
  const productSellCount = product?.sell_count ?? 0;

  if (fetchState === "FETCHING") {
    return (
      <main className="w-full bg-[#FAFAFA] py-[120px]">
        <div className="max-w-[1050px] mx-auto px-4 flex justify-center">
          <div className="w-[48px] h-[48px] border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (fetchState === "FAILED") {
    return (
      <main className="w-full bg-white py-[100px]">
        <div className="max-w-[1050px] mx-auto px-4 text-center">
          <h1 className="text-[#252B42] text-[32px] font-bold mb-4">
            Product not found
          </h1>

          <button
            type="button"
            onClick={() => history.goBack()}
            className="text-[#23A6F0] text-[14px] font-bold"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-white">
      <section className="w-full bg-[#FAFAFA] py-[24px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="flex items-center gap-[15px] flex-wrap">
            <Link
              to="/"
              className="text-[#252B42] text-[14px] leading-[24px] font-bold"
            >
              Home
            </Link>

            <ChevronRight size={16} className="text-[#BDBDBD]" />

            <Link
              to="/shop"
              className="text-[#252B42] text-[14px] leading-[24px] font-bold"
            >
              Shop
            </Link>

            {category && (
              <>
                <ChevronRight size={16} className="text-[#BDBDBD]" />

                <Link
                  to={getCategoryLink(category)}
                  className="text-[#252B42] text-[14px] leading-[24px] font-bold"
                >
                  {category.title}
                </Link>
              </>
            )}

            <ChevronRight size={16} className="text-[#BDBDBD]" />

            <span className="text-[#737373] text-[14px] leading-[24px] font-bold">
              {productName}
            </span>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA] py-[40px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <button
            type="button"
            onClick={() => history.goBack()}
            className="mb-[30px] flex items-center gap-[8px] text-[#23A6F0] text-[14px] leading-[24px] font-bold"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
            <div>
              <div className="w-full h-[450px] bg-white overflow-hidden mb-[20px]">
                <img
                  src={selectedImage || sortedImages[0]?.url}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>

              {sortedImages.length > 0 && (
                <div className="grid grid-cols-4 gap-[15px]">
                  {sortedImages.map((image) => (
                    <button
                      key={image.url}
                      type="button"
                      onClick={() => setSelectedImage(image.url)}
                      className={`h-[90px] bg-white overflow-hidden border ${
                        selectedImage === image.url
                          ? "border-[#23A6F0]"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={productName}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-[#252B42] text-[24px] leading-[32px] font-bold mb-[12px]">
                {productName}
              </h1>

              <div className="flex items-center gap-[10px] mb-[20px]">
                <div className="flex items-center gap-[3px] text-[#F3CD03]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      fill={star <= Math.round(productRating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>

                <span className="text-[#737373] text-[14px] leading-[24px] font-bold">
                  {productRating} Rating
                </span>
              </div>

              <p className="text-[#252B42] text-[24px] leading-[32px] font-bold mb-[8px]">
                {productPrice}
              </p>

              <p className="text-[#737373] text-[14px] leading-[24px] font-bold mb-[10px]">
                Availability :{" "}
                <span
                  className={
                    productStock > 0 ? "text-[#23A6F0]" : "text-red-500"
                  }
                >
                  {productStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <p className="text-[#737373] text-[14px] leading-[24px] font-bold mb-[30px]">
                Sell Count :{" "}
                <span className="text-[#252B42]">{productSellCount}</span>
              </p>

              <p className="text-[#858585] text-[14px] leading-[20px] font-normal max-w-[460px] mb-[30px]">
                {productDescription}
              </p>

              <hr className="border-[#BDBDBD] mb-[30px]" />

              <div className="flex items-center gap-[10px] mb-[30px]">
                <span className="w-[30px] h-[30px] rounded-full bg-[#23A6F0]" />
                <span className="w-[30px] h-[30px] rounded-full bg-[#2DC071]" />
                <span className="w-[30px] h-[30px] rounded-full bg-[#E77C40]" />
                <span className="w-[30px] h-[30px] rounded-full bg-[#252B42]" />
              </div>

              <div className="flex flex-wrap items-center gap-[10px]">
                <button
  type="button"
  onClick={handleAddToCart}
  className="h-[44px] px-[20px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[24px] font-bold"
>
  Sepete Ekle
</button>

                <button
                  type="button"
                  aria-label="Add to favorites"
                  className="w-[44px] h-[44px] rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#252B42]"
                >
                  <Heart size={20} />
                </button>

                <button
  type="button"
  onClick={handleAddToCart}
  aria-label="Add to cart"
  className="w-[44px] h-[44px] rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#252B42]"
>
  <ShoppingCart size={20} />
</button>

                <button
                  type="button"
                  aria-label="View product"
                  className="w-[44px] h-[44px] rounded-full bg-white border border-[#E8E8E8] flex items-center justify-center text-[#252B42]"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-[40px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="flex items-center justify-center gap-[40px] border-b border-[#ECECEC] pb-[20px] mb-[35px] flex-wrap">
            <button className="text-[#737373] text-[14px] leading-[24px] font-bold">
              Description
            </button>

            <button className="text-[#737373] text-[14px] leading-[24px] font-bold">
              Additional Information
            </button>

            <button className="text-[#737373] text-[14px] leading-[24px] font-bold">
              Reviews <span className="text-[#23856D]">({productRating})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            <div>
              <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold mb-[20px]">
                Product Description
              </h2>

              <p className="text-[#737373] text-[14px] leading-[20px] mb-[20px]">
                {productDescription}
              </p>
            </div>

            <div>
              <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold mb-[20px]">
                Product Details
              </h2>

              <ul className="space-y-[10px]">
                <li className="text-[#737373] text-[14px] leading-[24px] font-bold">
                  Product ID: {product.id}
                </li>
                <li className="text-[#737373] text-[14px] leading-[24px] font-bold">
                  Category ID: {product.category_id}
                </li>
                <li className="text-[#737373] text-[14px] leading-[24px] font-bold">
                  Store ID: {product.store_id}
                </li>
                <li className="text-[#737373] text-[14px] leading-[24px] font-bold">
                  Stock: {productStock}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold mb-[20px]">
                Sales Information
              </h2>

              <ul className="space-y-[10px]">
                <li className="text-[#737373] text-[14px] leading-[24px] font-bold">
                  Rating: {productRating}
                </li>
                <li className="text-[#737373] text-[14px] leading-[24px] font-bold">
                  Sell Count: {productSellCount}
                </li>
                <li className="text-[#737373] text-[14px] leading-[24px] font-bold">
                  Price: {productPrice}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;