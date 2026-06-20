import TopBar from "./TopBar";
import NavBar from "./NavBar";

function Header() {
  return (
    <header className="w-full bg-white">
      <TopBar />
      <NavBar />
    </header>
  );
}

export default Header;