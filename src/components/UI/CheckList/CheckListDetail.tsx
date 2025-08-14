import Image from "next/image";
import checked from "../../../assets/icons/checkbox-checked.svg";
import unChecked from "../../../assets/icons/checkbox-unchecked.svg";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface CheckListDetailProps {
  name: string;
  isCompleted: boolean;
  isEdit: boolean;
  onClick: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckListDetail = ({
  name,
  isCompleted,
  isEdit,
  onClick,
  value,
  onChange,
}: CheckListDetailProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "py-4 inset-ring-slate-900 inset-ring-2 rounded-2xl",
        isCompleted ? "bg-violet-100" : "bg-white"
      )}
    >
      <div className="flex items-center gap-4">
        <button onClick={onClick} className="size-8 shrink-0 cursor-pointer">
          <Image src={isCompleted ? checked : unChecked} alt="unChecked" />
        </button>
        {isEdit ? (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full shrink-0 text-slate-900 text-[20px] font-bold bg-transparent border-none outline-none focus:outline-none"
            autoFocus
          />
        ) : (
          <div
            className={cn(
              "text-slate-900 text-[20px] font-bold truncate",
              isCompleted && "underline"
            )}
          >
            {name}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckListDetail;
