import Image from "next/image";
import logoLg from "../../assets/images/logolg.svg";
import logoSm from "../../assets/images/logosm.svg";

const TopNavigation = () => {
  return (
    <div className="w-full h-[60px] flex items-center lg:px-[360px] md:px-6 px-4 border-b border-slate-200">
      <a href="/" className="hidden md:block">
        <Image src={logoLg} alt="logo" />
      </a>
      <a href="/" className="block md:hidden">
        <Image src={logoSm} alt="logo" />
      </a>
    </div>
  );
};

export default TopNavigation;
