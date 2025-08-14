import React from "react";

const SearchBar = () => {
  return (
    <input
      type="text"
      placeholder="할 일을 입력해주세요"
      className="w-full px-6 pt-[17px] pb-[12px] inset-ring-slate-900 inset-ring-2 border-slate-900 border-b-3 border-r-3 rounded-4xl font-regular text-[16px] focus:outline-none bg-slate-100"
    />
  );
};

export default SearchBar;
