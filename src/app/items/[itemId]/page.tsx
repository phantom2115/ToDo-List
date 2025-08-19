"use client";
import DetailSection from "../../../components/sections/DetailSection";
import React from "react";

const page = () => {
  return (
    <main className="lg:px-[360px] flex-1 bg-gray-50 flex flex-col">
      <div className="bg-white lg:px-[102px] md:px-6 sm:px-4 pt-4 md:pt-6 flex-1">
        <DetailSection />
      </div>
    </main>
  );
};

export default page;
