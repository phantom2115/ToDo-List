import Image from "next/image";
import checked from "../../../assets/icons/checkbox-checked.svg";
import unChecked from "../../../assets/icons/checkbox-unchecked.svg";
import { cn } from "../../../lib/utils";
import { Typography } from "../Typography";

interface CheckListProps {
  name: string;
  isCompleted: boolean;
  checkboxClick: () => void;
  onClick: () => void;
}

// 체크리스트
const CheckList = ({
  name,
  isCompleted,
  checkboxClick,
  onClick,
}: CheckListProps) => {
  return (
    <div
      className={cn(
        "px-3 py-[9px] inset-ring-slate-900 inset-ring-2 rounded-4xl cursor-pointer",
        isCompleted ? "bg-violet-100" : "bg-white"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            checkboxClick();
          }}
          className="size-8 shrink-0 cursor-pointer"
        >
          <Image src={isCompleted ? checked : unChecked} alt="unChecked" />
        </button>
        <Typography
          variant="body2"
          className={cn(
            "truncate text-slate-900",
            isCompleted && "line-through"
          )}
        >
          {name}
        </Typography>
      </div>
    </div>
  );
};

export default CheckList;
