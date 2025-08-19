import { InputHTMLAttributes } from "react";
import { Typography } from "../Typography";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = ({ ...props }: SearchBarProps) => {
  return (
    <Typography
      variant="body2"
      className="w-full px-6 pt-[17px] pb-[12px] inset-ring-slate-900 inset-ring-2 border-slate-900 border-b-3 border-r-3 rounded-4xl bg-slate-100"
    >
      <input
        id="search-bar"
        type="text"
        className="w-full bg-transparent border-none outline-none focus:outline-none"
        {...props}
      />
    </Typography>
  );
};

export default SearchBar;
