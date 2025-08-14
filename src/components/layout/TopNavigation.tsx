import Image from "next/image";
import logolg from "../../assets/images/logolg.svg";
import logosm from "../../assets/images/logosm.svg";
import Link from "next/link";
const TopNavigation = () => {
  return (
    <div className="w-full h-[60px] flex items-center lg:px-[360px] md:px-6 px-4 border-b border-slate-200">
      <Link href="/">
        <Image src={logolg} alt="logo" className="hidden md:block" />
      </Link>
      <Link href="/">
        <Image src={logosm} alt="logo" className="block md:hidden" />
      </Link>
    </div>
  );
};

export default TopNavigation;
