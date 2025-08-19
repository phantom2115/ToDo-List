import React, { useEffect, useRef, useState } from "react";
import Button from "../UI/Button/Button";
import icons from "@/assets/icons";
import CheckListDetail from "../UI/CheckList/CheckListDetail";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTodoDetailQuery } from "@/apis/todo/querys/todo.query-options";
import { useUserStore } from "@/store/userStore";
import { useUpdateTodoMutation } from "@/apis/todo/mutations/useUpdateTodoMutation";
import { useDeleteTodoMutation } from "@/apis/todo/mutations/useDeleteTodoMutation";
import Image from "next/image";
import memoImage from "../../assets/images/memo.svg";
import AddImageButton from "../UI/Button/AddImageButton";
import { useUploadImageMutation } from "@/apis/image/mutations/useUploadImageMutation";
import emptyImage from "../../assets/images/img.svg";
const DetailSection = () => {
  const router = useRouter();
  const { tenantId } = useUserStore();

  const { itemId } = useParams<{ itemId: string }>();

  const { data: todoDetail, isPending } = useQuery(
    useTodoDetailQuery(tenantId, Number(itemId))
  );
  const { mutate: updateTodo, isPending: isUpdatePending } =
    useUpdateTodoMutation();

  const { mutate: deleteTodo, isPending: isDeletePending } =
    useDeleteTodoMutation();

  const { mutate: uploadImage, isPending: isUploadPending } =
    useUploadImageMutation();

  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState<string | string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEditClick = () => {
    updateTodo(
      {
        tenantId,
        itemId: Number(itemId),
        payload: {
          name,
          isCompleted,
          memo,
          imageUrl,
        },
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  const handleDeleteClick = () => {
    deleteTodo(
      { tenantId, itemId: Number(itemId) },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  useEffect(() => {
    if (todoDetail) {
      setMemo(todoDetail?.memo || "");
      setIsCompleted(todoDetail?.isCompleted);
      setName(todoDetail?.name);
      setImageUrl(todoDetail?.imageUrl || "");
      setIsActive(false);
    }
  }, [todoDetail]);

  useEffect(() => {
    if (todoDetail) {
      if (
        isCompleted !== todoDetail.isCompleted ||
        name !== todoDetail.name ||
        (memo || "") !== (todoDetail.memo || "") ||
        imageUrl !== todoDetail.imageUrl
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [
    isCompleted,
    todoDetail?.isCompleted,
    name,
    todoDetail?.name,
    memo,
    todoDetail?.memo,
    imageUrl,
    todoDetail?.imageUrl,
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!validateFile(file)) {
        return;
      }
      uploadImage(
        { tenantId, file },
        {
          onSuccess: (url) => {
            setImageUrl(url.url);
          },
        }
      );
    }
  };

  const validateFile = (file: File) => {
    const regex = /^[a-zA-Z0-9._-]+$/;
    if (!regex.test(file.name)) {
      alert("파일 이름은 영어, 숫자만 사용 가능합니다.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return false;
    }
    return true;
  };

  return (
    <section className="flex flex-col gap-6">
      {(isUpdatePending || isDeletePending) && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 z-10 flex items-center justify-center">
          <div className="size-10 rounded-full border-2 border-slate-200 border-t-slate-400 animate-spin" />
        </div>
      )}
      <CheckListDetail
        isCompleted={isCompleted}
        onClick={handleToggleComplete}
        value={name}
        onChange={handleNameChange}
        isPending={isPending}
      />

      <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-6">
        <div
          className="lg:w-[384px] w-full h-[311px] rounded-2xl bg-slate-50 relative overflow-hidden flex items-center justify-center"
          style={
            imageUrl
              ? {
                  borderColor: "#CBD5E1",
                  borderStyle: "solid",
                  borderWidth: "2px",
                }
              : {
                  borderColor: "#CBD5E1",
                  borderStyle: "dashed",
                  borderWidth: "2px",
                  borderSpacing: "15px",
                }
          }
        >
          {(isPending || isUploadPending) && (
            <div className="w-full h-[311px] bg-slate-50/30 absolute z-10 flex items-center justify-center">
              <div className="size-10 rounded-full border-2 border-slate-200 border-t-slate-400 animate-spin" />
            </div>
          )}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="image"
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Image src={emptyImage} alt="empty" />
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <AddImageButton
            variant={imageUrl ? "edit" : "attach"}
            icon={
              imageUrl ? (
                <icons.Edit />
              ) : (
                <icons.Plus stroke="#64748B" width="24px" height="24px" />
              )
            }
            className="absolute bottom-4 right-4"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          />
        </div>
        <div className="relative">
          <div className="lg:w-[588px] w-full h-[311px] overflow-hidden rounded-2xl relative">
            <span className="absolute top-6 left-1/2 -translate-x-1/2 font-extrabold text-amber-800">
              Memo
            </span>
            <Image
              src={memoImage}
              alt="memo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:w-[588px] w-full h-[311px] overflow-hidden rounded-2xl flex items-center justify-center absolute top-0 left-0 pt-[58px]">
            {isPending && (
              <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                <div className="size-10 rounded-full border-2 border-slate-200 border-t-slate-300 animate-spin" />
              </div>
            )}
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="h-full z-10 text-center px-4 resize-none w-full focus:outline-none"
              placeholder={isPending ? "" : "메모를 입력하세요..."}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end md:gap-4 gap-[7px]">
        <Button
          color={isActive ? "lime" : "default"}
          icon={<icons.Check />}
          className="!w-[162px] !h-14"
          textClassName="!block"
          onClick={handleEditClick}
          disabled={!isActive}
        >
          수정 완료
        </Button>
        <Button
          color="rose"
          textColor="white"
          icon={<icons.X />}
          className="!w-[162px] !h-14"
          textClassName="!block"
          onClick={handleDeleteClick}
        >
          삭제하기
        </Button>
      </div>
    </section>
  );
};

export default DetailSection;
