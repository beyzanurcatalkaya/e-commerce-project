import teamuser1 from "../assets/team/teamuser1.png";
import teamuser2 from "../assets/team/teamuser2.png";
import teamuser3 from "../assets/team/teamuser3.png";
import teamuser4 from "../assets/team/teamuser4.png";

const teamMembers = [
  {
    id: 1,
    image: teamuser1,
    job: "Project Manager",
    name: "Gökhan Özdemir",
    description: "the quick fox jumps over the lazy dog",
  },
  {
    id: 2,
    image: teamuser2,
    job: "Full Stack Developer",
    name: "Beyzanur Çatalkaya",
    description: "the quick fox jumps over the lazy dog",
  },
  {
    id: 3,
    image: teamuser3,
    job: "Founder",
    name: "Eleanor Pena",
    description: "the quick fox jumps over the lazy dog",
  },
  {
    id: 4,
    image: teamuser4,
    job: "Founder",
    name: "Jane Cooper",
    description: "the quick fox jumps over the lazy dog",
  },
];

function Team() {
  return (
    <main className="w-full bg-[#FAFAFA]">
      <section className="w-full py-[80px] md:py-[112px]">
        <div className="max-w-[1050px] mx-auto px-4">
          {/* Başlık alanı */}
          <div className="text-center mb-[80px]">
            <h1 className="text-[#252B42] text-[40px] leading-[50px] font-bold tracking-[0.2px] mb-[10px]">
              Meet Our Team
            </h1>

            <p className="text-[#737373] text-[14px] leading-[20px] font-normal max-w-[470px] mx-auto">
              Problems trying to resolve the conflict between <br className="hidden md:block" />
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          {/* Takım kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white w-full min-h-[231px] flex flex-col items-center text-center px-[35px] py-[30px]"
              >
                <div className="w-[128px] h-[128px] rounded-full overflow-hidden mb-[15px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-[#23A6F0] text-[14px] leading-[24px] font-bold mb-[5px]">
                  {member.job}
                </p>

                <h3 className="text-[#252B42] text-[16px] leading-[24px] font-bold mb-[10px]">
                  {member.name}
                </h3>

                <p className="text-[#737373] text-[14px] leading-[20px] font-normal">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Team;