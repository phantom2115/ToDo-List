"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({
  children,
}: BackgroundWrapperProps) {
  const pathname = usePathname();
  const isDetailPage = pathname.includes("/items/");

  return (
    <div
      className={cn(
        "lg:px-[360px] md:px-6 px-4 pb-10",
        isDetailPage && "lg:bg-[#F9FAFB]"
      )}
    >
      {children}
    </div>
  );
}
