import BrandLogos from "../components/home/BrandLogos";

import grow from "../assets/team/grow.png";
import videoimg from "../assets/team/videoimg.png";
import aboutus from "../assets/team/aboutus.png";

import user1 from "../assets/team/user1.png";
import user2 from "../assets/team/user2.png";
import user3 from "../assets/team/user3.png";

import fbook from "../assets/team/fbook.png";
import insta from "../assets/team/insta.png";
import twitter from "../assets/team/twitter.png";

const stats = [
  {
    id: 1,
    number: "15K",
    label: "Happy Customers",
  },
  {
    id: 2,
    number: "150K",
    label: "Monthly Visitors",
  },
  {
    id: 3,
    number: "15",
    label: "Countries Worldwide",
  },
  {
    id: 4,
    number: "100+",
    label: "Top Partners",
  },
];

const teamMembers = [
  {
    id: 1,
    image: user1,
    name: "Username",
    job: "Profession",
  },
  {
    id: 2,
    image: user2,
    name: "Username",
    job: "Profession",
  },
  {
    id: 3,
    image: user3,
    name: "Username",
    job: "Profession",
  },
];

function About() {
  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white py-[60px] md:py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[50px]">
            <div className="text-center lg:text-left">
              <p className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[35px]">
                ABOUT COMPANY
              </p>

              <h1 className="text-[#252B42] text-[40px] md:text-[58px] leading-[50px] md:leading-[80px] font-bold tracking-[0.2px] mb-[35px]">
                ABOUT US
              </h1>

              <p className="text-[#737373] text-[20px] leading-[30px] font-normal max-w-[390px] mx-auto lg:mx-0 mb-[35px]">
                We know how large objects will act, but things on a small scale
              </p>

              <button
                type="button"
                className="w-[195px] h-[52px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[22px] font-bold"
              >
                Get Quote Now
              </button>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full bg-[#FFE9EA] top-1/2 -translate-y-1/2 right-[20px]" />

              <img
  src={aboutus}
  alt="About us"
  className="relative z-10 max-h-[520px] object-contain"
/>

              <span className="absolute top-[30px] left-[80px] w-[20px] h-[20px] rounded-full bg-[#FFE9EA]" />
              <span className="absolute top-[130px] right-[10px] w-[12px] h-[12px] rounded-full bg-[#977DF4]" />
              <span className="absolute bottom-[120px] left-[40px] w-[12px] h-[12px] rounded-full bg-[#977DF4]" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full bg-white py-[24px] md:py-[40px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[60px] items-start">
            <div>
              <p className="text-[#E74040] text-[14px] leading-[20px] font-normal mb-[24px]">
                Problems trying
              </p>

              <h2 className="text-[#252B42] text-[24px] leading-[32px] font-bold tracking-[0.1px]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent.
              </h2>
            </div>

            <p className="text-[#737373] text-[14px] leading-[20px] font-normal">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-white py-[60px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] text-center">
            {stats.map((item) => (
              <div key={item.id}>
                <h2 className="text-[#252B42] text-[58px] leading-[80px] font-bold tracking-[0.2px]">
                  {item.number}
                </h2>

                <p className="text-[#737373] text-[16px] leading-[24px] font-bold">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full bg-white py-[40px] md:py-[70px]">
        <div className="max-w-[989px] mx-auto px-4">
          <div className="relative rounded-[20px] overflow-hidden h-[300px] md:h-[540px]">
            <img
              src={videoimg}
              alt="Video"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <button
                type="button"
                aria-label="Play video"
                className="w-[92px] h-[92px] rounded-full bg-[#23A6F0] flex items-center justify-center"
              >
                <span className="ml-[6px] w-0 h-0 border-y-[14px] border-y-transparent border-l-[22px] border-l-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-white py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="text-center mb-[80px]">
            <h2 className="text-[#252B42] text-[40px] leading-[50px] font-bold tracking-[0.2px] mb-[10px]">
              Meet Our Team
            </h2>

            <p className="text-[#737373] text-[14px] leading-[20px] font-normal max-w-[470px] mx-auto">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center bg-white">
                <div className="w-full h-[231px] overflow-hidden mb-[30px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[10px]">
                  {member.name}
                </h3>

                <p className="text-[#737373] text-[14px] leading-[24px] font-bold mb-[10px]">
                  {member.job}
                </p>

                <div className="flex items-center justify-center gap-[20px]">
                  <a href="#" aria-label="Facebook">
                    <img
                      src={fbook}
                      alt="Facebook"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </a>

                  <a href="#" aria-label="Instagram">
                    <img
                      src={insta}
                      alt="Instagram"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </a>

                  <a href="#" aria-label="Twitter">
                    <img
                      src={twitter}
                      alt="Twitter"
                      className="w-[24px] h-[24px] object-contain"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="w-full bg-[#FAFAFA] py-[80px]">
        <div className="max-w-[1050px] mx-auto px-4">
          <div className="text-center mb-[30px]">
            <h2 className="text-[#252B42] text-[40px] leading-[50px] font-bold tracking-[0.2px] mb-[30px]">
              Big Companies Are Here
            </h2>

            <p className="text-[#737373] text-[14px] leading-[20px] font-normal max-w-[550px] mx-auto">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>

        <BrandLogos />
      </section>

      {/* CTA Section */}
      <section className="w-full bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#2A7CC7] flex items-center justify-center py-[80px] px-4">
            <div className="max-w-[440px] text-center lg:text-left">
              <p className="text-white text-[16px] leading-[24px] font-bold mb-[24px]">
                WORK WITH US
              </p>

              <h2 className="text-white text-[40px] leading-[50px] font-bold tracking-[0.2px] mb-[24px]">
                Now Let’s grow Yours
              </h2>

              <p className="text-white text-[14px] leading-[20px] font-normal mb-[24px]">
                The gradual accumulation of information about atomic and
                small-scale behavior during the first quarter of the 20th
              </p>

              <button
                type="button"
                className="w-[132px] h-[52px] border border-white rounded-[5px] text-white text-[14px] leading-[22px] font-bold"
              >
                Button
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-center bg-white overflow-hidden">
            <img
              src={grow}
              alt="Grow yours"
              className="h-[520px] object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;