"use client";
import ListSection from "../components/sections/ListSection";
import SearchSection from "../components/sections/SearchSection";
import { useEffect } from "react";
import { useUserStore } from "../store/userStore";

const page = () => {
  const { setId } = useUserStore();

  useEffect(() => {
    const existingId = localStorage.getItem("id");

    if (existingId) {
      setId(Number(existingId));
    } else {
      const getRandomId = Math.floor(Math.random() * 1000000);
      const newId = getRandomId.toString();
      localStorage.setItem("id", newId);
      setId(Number(newId));
    }
  }, [setId]);

  return (
    <main className="flex flex-col gap-6 md:gap-10">
      <SearchSection />
      <ListSection />
    </main>
  );
};

export default page;
