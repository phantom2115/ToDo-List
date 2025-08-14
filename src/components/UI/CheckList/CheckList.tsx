import Image from "next/image";
import React from "react";
import checked from "../../../assets/icons/checkbox-checked.svg";
import unChecked from "../../../assets/icons/checkbox-unchecked.svg";
import { cn } from "@/lib/utils";

interface CheckListProps {
  name: string;
  isCompleted: boolean;
  onClick: () => void;
}

const CheckList = ({ name, isCompleted, onClick }: CheckListProps) => {
  return (
    <div
      className={cn(
        "px-3 py-[9px] inset-ring-slate-900 inset-ring-2 rounded-4xl",
        isCompleted ? "bg-violet-100" : "bg-white"
      )}
    >
      <div className="flex items-center gap-4">
        <button onClick={onClick} className="size-8 shrink-0">
          <Image src={isCompleted ? checked : unChecked} alt="unChecked" />
        </button>
        <div
          className={cn(
            "text-slate-900 text-[16px] font-regular truncate",
            isCompleted && "line-through"
          )}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default CheckList;
