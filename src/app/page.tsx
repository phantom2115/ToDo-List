"use client";
import ListSection from "@/components/sections/ListSection";
import SearchSection from "@/components/sections/SearchSection";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col gap-6 md:gap-10">
      <SearchSection isEmpty={true} />
      <ListSection />
    </main>
  );
};

export default page;
