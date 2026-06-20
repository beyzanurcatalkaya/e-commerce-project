export const slugify = (text = "") => {
  return String(text)
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getCategoryGenderPath = (category) => {
  const genderText = String(category?.gender || category?.code || "")
    .toLowerCase()
    .trim();

  if (
    genderText.includes("kadin") ||
    genderText.includes("kadın") ||
    genderText.includes("female") ||
    genderText.startsWith("k")
  ) {
    return "kadin";
  }

  if (
    genderText.includes("erkek") ||
    genderText.includes("male") ||
    genderText.startsWith("e")
  ) {
    return "erkek";
  }

  return "genel";
};

export const getCategoryLink = (category) => {
  const gender = getCategoryGenderPath(category);
  const categoryName = slugify(category?.title || category?.name || "category");

  return `/shop/${gender}/${categoryName}/${category.id}`;
};

export const groupCategoriesByGender = (categories = []) => {
  return {
    kadin: categories.filter(
      (category) => getCategoryGenderPath(category) === "kadin"
    ),
    erkek: categories.filter(
      (category) => getCategoryGenderPath(category) === "erkek"
    ),
  };
};

export const findProductCategory = (product, categories = []) => {
  return categories.find(
    (category) => String(category.id) === String(product.category_id)
  );
};

export const getProductDetailLink = (product, categories = []) => {
  const category = findProductCategory(product, categories);

  const gender = category ? getCategoryGenderPath(category) : "genel";

  const categoryName = slugify(
    category?.title ||
      category?.name ||
      product?.category?.title ||
      product?.category?.name ||
      "category"
  );

  const productNameSlug = slugify(product?.name || product?.title || "product");

  const categoryId = product.category_id || category?.id || 0;

  return `/shop/${gender}/${categoryName}/${categoryId}/${productNameSlug}/${product.id}`;
};