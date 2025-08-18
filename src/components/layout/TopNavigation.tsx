import Image from "next/image";
import logolg from "../../assets/images/logolg.svg";
import logosm from "../../assets/images/logosm.svg";
import Link from "next/link";
const TopNavigation = () => {
  return (
    <div className="w-full h-[60px] flex items-center lg:px-[360px] md:px-6 px-4 border-b border-slate-200">
      <a href="/" className="hidden md:block">
        <Image src={logolg} alt="logo" />
      </a>
      <a href="/" className="block md:hidden">
        <Image src={logosm} alt="logo" />
      </a>
    </div>
  );
};

export default TopNavigation;
