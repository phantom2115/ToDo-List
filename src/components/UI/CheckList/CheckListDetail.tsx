import Image from "next/image";
import checked from "../../../assets/icons/checkbox-checked.svg";
import unChecked from "../../../assets/icons/checkbox-unchecked.svg";
import { cn } from "@/lib/utils";
import { Typography } from "../Typography";

interface CheckListDetailProps {
  isCompleted: boolean;
  onClick: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
}

const CheckListDetail = ({
  isCompleted,
  onClick,
  value,
  onChange,
  isPending,
}: CheckListDetailProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "py-4 inset-ring-slate-900 inset-ring-2 rounded-2xl",
        isCompleted ? "bg-violet-100" : "bg-white"
      )}
    >
      {isPending ? (
        <div className="flex items-center gap-4">
          <div className="size-8 shrink-0 rounded-full bg-slate-300 animate-[pulse_2s_ease-in-out_infinite]"></div>{" "}
          <div className="w-[217px] h-[31px] bg-slate-300 rounded-lg animate-[pulse_2s_ease-in-out_infinite]"></div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button onClick={onClick} className="size-8 shrink-0 cursor-pointer">
            <Image src={isCompleted ? checked : unChecked} alt="unChecked" />
          </button>

          <Typography
            variant="h1"
            className="w-[217px] pl-2 bg-transparent border-b outline-none focus:outline-none"
          >
            <input
              id="check-list-detail"
              type="text"
              value={value}
              onChange={onChange}
              className="w-full bg-transparent border-none outline-none focus:outline-none"
              autoFocus
            />
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CheckListDetail;
