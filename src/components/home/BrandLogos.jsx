import brands1 from "../../assets/images/brands1.png";
import brands2 from "../../assets/images/brands2.png";
import brands3 from "../../assets/images/brands3.png";
import brands4 from "../../assets/images/brands4.png";
import brands5 from "../../assets/images/brands5.png";
import brands6 from "../../assets/images/brands6.png";

const brandLogos = [
  { id: 1, image: brands1, alt: "Brand 1" },
  { id: 2, image: brands2, alt: "Brand 2" },
  { id: 3, image: brands3, alt: "Brand 3" },
  { id: 4, image: brands4, alt: "Brand 4" },
  { id: 5, image: brands5, alt: "Brand 5" },
  { id: 6, image: brands6, alt: "Brand 6" },
];

function BrandLogos() {
  return (
    <section className="w-full bg-white py-[50px]">
      <div className="max-w-[1050px] mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center justify-items-center gap-y-10">
          {brandLogos.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center h-[75px]"
            >
              <img
                src={brand.image}
                alt={brand.alt}
                className="max-h-[72px] max-w-[105px] object-contain grayscale opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandLogos;