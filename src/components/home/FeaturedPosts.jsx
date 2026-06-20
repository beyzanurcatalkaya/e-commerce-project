import fp1 from "../../assets/fpimg/fp1.png";
import fp2 from "../../assets/fpimg/fp2.png";

import fvrt from "../../assets/fpimg/fvrt.png";
import shop from "../../assets/fpimg/shop.png";
import eye from "../../assets/fpimg/eye.png";
import star from "../../assets/fpimg/star.png";
import download from "../../assets/fpimg/download.png";
import avrg from "../../assets/fpimg/avrg.png";
import time from "../../assets/fpimg/time.png";
import cnt from "../../assets/fpimg/cnt.png";

const posts = [
  {
    id: 1,
    image: fp1,
    category: "English Department",
    title: "Graphic Design",
    description:
      "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
    sales: "15 Sales",
    oldPrice: "$16.48",
    price: "$6.48",
    date: "22h...",
    lessons: "64 Lessons",
    progress: "Progress",
    rating: "4.9",
  },
  {
    id: 2,
    image: fp2,
    category: "English Department",
    title: "Graphic Design",
    description:
      "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
    sales: "15 Sales",
    oldPrice: "$16.48",
    price: "$6.48",
    date: "22h...",
    lessons: "64 Lessons",
    progress: "Progress",
    rating: "4.9",
  },
];

function FeaturedPosts() {
  return (
    <section className="w-full bg-white py-[80px]">
      <div className="max-w-[1050px] mx-auto px-4">
        {/* Başlık alanı */}
        <div className="text-center mb-[80px]">
          <p className="text-[#23A6F0] text-[14px] leading-[24px] font-bold mb-[10px]">
            Practice Advice
          </p>

          <h2 className="text-[#252B42] text-[40px] leading-[50px] font-bold tracking-[0.2px]">
            Featured Posts
          </h2>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white flex flex-col sm:flex-row shadow-sm"
            >
              {/* Sol görsel alanı */}
              <div className="relative w-full sm:w-[209px] h-[300px] sm:h-[404px] shrink-0 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />

                <span className="absolute top-[20px] left-[20px] bg-[#E74040] text-white text-[14px] leading-[24px] font-bold px-[10px] rounded-[3px]">
                  Sale
                </span>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-[24px] flex items-center gap-[10px]">
                  <button
                    type="button"
                    className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center"
                    aria-label="Add to favorites"
                  >
                    <img
                      src={fvrt}
                      alt=""
                      className="w-[20px] h-[20px] object-contain"
                    />
                  </button>

                  <button
                    type="button"
                    className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center"
                    aria-label="Add to cart"
                  >
                    <img
                      src={shop}
                      alt=""
                      className="w-[20px] h-[20px] object-contain"
                    />
                  </button>

                  <button
                    type="button"
                    className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center"
                    aria-label="View product"
                  >
                    <img
                      src={eye}
                      alt=""
                      className="w-[20px] h-[20px] object-contain"
                    />
                  </button>
                </div>
              </div>

              {/* Sağ içerik alanı */}
              <div className="w-full p-[25px]">
                <div className="flex items-center justify-between mb-[10px]">
                  <p className="text-[#23A6F0] text-[14px] leading-[24px] font-bold">
                    {post.category}
                  </p>

                  <div className="flex items-center gap-[5px] bg-[#252B42] rounded-[20px] px-[6px] py-[3px]">
                    <img
                      src={star}
                      alt=""
                      className="w-[14px] h-[14px] object-contain"
                    />
                    <span className="text-white text-[12px] leading-[16px]">
                      {post.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[10px]">
                  {post.title}
                </h3>

                <p className="text-[#737373] text-[14px] leading-[20px] font-normal mb-[10px] max-w-[240px]">
                  {post.description}
                </p>

                {/* Sales */}
                <div className="flex items-center gap-[10px] mb-[15px]">
                  <img
                    src={download}
                    alt=""
                    className="w-[16px] h-[16px] object-contain"
                  />
                  <span className="text-[#737373] text-[14px] leading-[24px] font-bold">
                    {post.sales}
                  </span>
                </div>

                {/* Fiyat */}
                <div className="flex items-center gap-[5px] mb-[20px]">
                  <span className="text-[#BDBDBD] text-[16px] leading-[24px] font-bold">
                    {post.oldPrice}
                  </span>

                  <span className="text-[#23856D] text-[16px] leading-[24px] font-bold">
                    {post.price}
                  </span>
                </div>

                {/* Renk noktaları */}
                <div className="flex items-center gap-[6px] mb-[25px]">
                  <span className="w-[16px] h-[16px] rounded-full bg-[#23A6F0]" />
                  <span className="w-[16px] h-[16px] rounded-full bg-[#23856D]" />
                  <span className="w-[16px] h-[16px] rounded-full bg-[#E77C40]" />
                  <span className="w-[16px] h-[16px] rounded-full bg-[#252B42]" />
                </div>

                {/* Alt bilgiler */}
                <div className="flex items-center justify-between text-[#737373] text-[12px] leading-[16px] mb-[25px]">
                  <div className="flex items-center gap-[5px]">
                    <img
                      src={time}
                      alt=""
                      className="w-[16px] h-[16px] object-contain"
                    />
                    <span>{post.date}</span>
                  </div>

                  <div className="flex items-center gap-[5px]">
                    <img
                      src={cnt}
                      alt=""
                      className="w-[16px] h-[16px] object-contain"
                    />
                    <span>{post.lessons}</span>
                  </div>

                  <div className="flex items-center gap-[5px]">
                    <img
                      src={avrg}
                      alt=""
                      className="w-[16px] h-[16px] object-contain"
                    />
                    <span>{post.progress}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-[141px] h-[44px] border border-[#23A6F0] rounded-[37px] text-[#23A6F0] text-[14px] leading-[24px] font-bold flex items-center justify-center gap-[10px]"
                >
                  Learn More
                  <span className="text-[18px] leading-none">›</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedPosts;