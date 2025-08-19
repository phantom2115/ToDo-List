"use client";
import ListSection from "../components/sections/ListSection";
import SearchSection from "../components/sections/SearchSection";

const page = () => {
  return (
    <main className="flex flex-col gap-6 md:gap-10 lg:px-[360px] md:px-6 px-4 bg-gray-50 flex-1">
      <SearchSection />
      <ListSection />
    </main>
  );
};

export default page;
