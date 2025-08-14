"use client";
import React from "react";
import SearchBar from "../ui/Search/SearchBar";
import Button from "../ui/Button/Button";
import icons from "@/assets/icons";

interface SearchSectionProps {
  isEmpty: boolean;
}

const SearchSection = ({ isEmpty = true }: SearchSectionProps) => {
  return (
    <section className="flex items-center gap-2 md:gap-4 pt-4 md:pt-6">
      <SearchBar placeholder="할 일을 입력해주세요." />
      <Button
        color={isEmpty ? "violet" : "default"}
        textColor={isEmpty ? "white" : "default"}
        icon={<icons.Plus stroke={isEmpty ? "#fff" : "#0f172a"} />}
      >
        추가하기
      </Button>
    </section>
  );
};

export default SearchSection;
