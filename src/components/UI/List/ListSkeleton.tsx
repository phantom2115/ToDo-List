const ListSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4 md:gap-6 items-center justify-center">
      <div className="flex items-center justify-center md:size-[240px] size-[120px]">
        <div className="size-16 border-4 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
      </div>
      <span className="text-center font-bold text-[16px] text-slate-400">
        할 일 불러오는중
      </span>
    </div>
  );
};

export default ListSkeleton;
