import type { Metadata } from "next";
import localFont from "next/font/local";
import "../style/globals.css";
import TopNavigation from "../components/layout/TopNavigation";
import BackgroundWrapper from "../components/layout/BackgroundWrapper";
import QueryProvider from "../components/providers/QueryProvider";

const font = localFont({
  src: [
    {
      path: "../../public/fonts/NanumSquareB.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/NanumSquareEB.ttf",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "../../public/fonts/NanumSquareR.ttf",
      weight: "400",
      style: "regular",
    },
  ],
  display: "swap",
  variable: "--font-nanum-square",
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "Codeit assignment",
  icons: {
    icon: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={font.className}>
      <body>
        <QueryProvider>
          <TopNavigation />
          <BackgroundWrapper>{children}</BackgroundWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
