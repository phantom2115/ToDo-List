import React, { useRef, useEffect } from "react";
import CheckListDetail from "../ui/CheckList/CheckListDetail";
import Image from "next/image";
import memo from "../../assets/images/memo.svg";
import emptyImage from "../../assets/images/img.svg";
import Button from "../ui/Button/Button";
import ImageButton from "../ui/Button/ImageButton";
import icons from "@/assets/icons";

const DetailSection = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "18px";
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(Math.max(18, scrollHeight), 229);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <section className="flex flex-col gap-6">
      <CheckListDetail name="씻기" isCompleted={false} onClick={() => {}} />
      <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-6">
        <div
          className="lg:w-[384px] w-full h-[311px] rounded-2xl bg-slate-50 relative"
          style={{
            borderColor: "#CBD5E1",
            borderStyle: "dashed",
            borderWidth: "2px",
            borderSpacing: "15px",
          }}
        >
          <Image
            src={emptyImage}
            alt="emptyImage"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <ImageButton
            variant={true ? "edit" : "attach"}
            icon={
              true ? (
                <icons.Edit />
              ) : (
                <icons.Plus stroke={"#64748B"} width="24px" height="24px" />
              )
            }
            className="absolute bottom-4 right-4"
          />
        </div>
        <div className="relative">
          <div className="lg:w-[588px] w-full h-[311px] overflow-hidden rounded-2xl relative">
            <span className="absolute top-6 left-1/2 -translate-x-1/2 font-extrabold text-amber-800">
              Memo
            </span>
            <Image
              src={memo}
              alt="memo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:w-[588px] w-full h-[311px] overflow-hidden rounded-2xl flex items-center justify-center absolute top-0 left-0 pt-[38px]">
            <textarea
              ref={textareaRef}
              className="z-10 text-center px-4 resize-none w-full focus:outline-none"
              placeholder="메모를 입력하세요..."
              onInput={adjustHeight}
              style={{ height: "18px" }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end md:gap-4 gap-[7px]">
        <Button
          color={"default"}
          icon={<icons.Check />}
          className="!w-[162px] !h-14"
          textClassName="!block"
        >
          수정 완료
        </Button>
        <Button
          color={"rose"}
          textColor={"white"}
          icon={<icons.X />}
          className="!w-[162px] !h-14"
          textClassName="!block"
        >
          삭제하기
        </Button>
      </div>
    </section>
  );
};

export default DetailSection;
