import { Typography } from "@/components/UI/Typography";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-4xl animate-bounce">😭</div>
      <Typography variant="h1">없는 페이지입니다.</Typography>
      <Link href="/" className="cursor-pointer">
        홈 화면으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
