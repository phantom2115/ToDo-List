import { InputHTMLAttributes } from "react";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = ({ ...props }: SearchBarProps) => {
  return (
    <input
      type="text"
      className="w-full px-6 pt-[17px] pb-[12px] inset-ring-slate-900 inset-ring-2 border-slate-900 border-b-3 border-r-3 rounded-4xl font-regular text-[16px] focus:outline-none bg-slate-100"
      {...props}
    />
  );
};

export default SearchBar;
