import Hero from "../components/home/Hero";
import BrandLogos from "../components/home/BrandLogos";
import ShopCards from "../components/home/ShopCards";
import ProductCards from "../components/home/ProductCards";
import AboutSection from "../components/home/AboutSection";
import FeaturesSection from "../components/home/FeaturesSection";
import FeaturedPosts from "../components/home/FeaturedPosts";

function Home() {
  return (
    <>
      <Hero />
      <BrandLogos />
      <ShopCards />
      <ProductCards />
      <AboutSection />
      <FeaturesSection />
      <FeaturedPosts />
    </>
  );
}

export default Home;