import { cn } from "@/lib/utils";

interface LoadingProps {
  isFullScreen?: boolean;
}

const Loading = ({ isFullScreen = false }: LoadingProps) => {
  return (
    <div
      className={cn(
        isFullScreen &&
          "w-full h-full bg-slate-100/30 fixed top-0 left-0 flex flex-col items-center justify-center z-10"
      )}
    >
      <div className="flex items-center justify-center size-[120px]">
        <div className="size-10 border-4 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
