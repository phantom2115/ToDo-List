import { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import icons from "@/assets/icons";
import CheckListDetail from "../UI/CheckList/CheckListDetail";
import { notFound, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTodoDetailQuery } from "@/apis/todo/queries/todo.query-options";
import { useUpdateTodoMutation } from "@/apis/todo/mutations/useUpdateTodoMutation";
import { useDeleteTodoMutation } from "@/apis/todo/mutations/useDeleteTodoMutation";
import Image from "next/image";
import memoImage from "../../assets/images/memo.svg";
import AddImageButton from "../UI/Button/AddImageButton";
import { useUploadImageMutation } from "@/apis/image/mutations/useUploadImageMutation";
import emptyImage from "../../assets/images/img.svg";
import { TENANT_ID } from "@/constant/api";
import { Typography } from "../UI/Typography";
import { cn } from "@/lib/utils";
import { isAxiosError } from "axios";
import Loading from "../UI/Loading/Loading";

const DetailSection = () => {
  const router = useRouter();

  const { itemId } = useParams<{ itemId: string }>();

  // 데이터 불러오기
  const {
    data: todoDetail,
    isPending,
    error,
    isError,
  } = useQuery(useTodoDetailQuery(Number(itemId)));

  // 데이터 불러오기 실패 시 처리
  if (isError) {
    if (isAxiosError(error)) {
      switch (error.status) {
        case 404:
          notFound();
          break;
      }
    }

    throw new Error("데이터를 불러오는데 실패했습니다.");
  }

  // 데이터 수정
  const { mutate: updateTodo, isPending: isUpdatePending } =
    useUpdateTodoMutation();

  // 데이터 삭제
  const { mutate: deleteTodo, isPending: isDeletePending } =
    useDeleteTodoMutation();

  // 이미지 업로드
  const { mutate: uploadImage, isPending: isUploadPending } =
    useUploadImageMutation();

  // 상태 관리
  const [isCompleted, setIsCompleted] = useState(false);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState<string | string>("");

  // 데이터 불러오기 성공 시 상태 관리
  useEffect(() => {
    if (todoDetail) {
      setMemo(todoDetail?.memo || "");
      setIsCompleted(todoDetail?.isCompleted);
      setName(todoDetail?.name);
      setImageUrl(todoDetail?.imageUrl || "");
    }
  }, [todoDetail]);

  // 완료 상태 토글
  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  // 할 일 이름 변경
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 수정 버튼 클릭
  const handleEditClick = () => {
    if (name.length > 100) {
      alert("100자 이내로 입력해주세요.");
      return;
    }
    if (!name.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }
    if (memo.length > 1000) {
      alert("1000자 이내로 입력해주세요.");
      return;
    }
    updateTodo(
      {
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

  // 삭제 버튼 클릭
  const handleDeleteClick = () => {
    deleteTodo(
      { itemId: Number(itemId) },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  // 이미지 변경
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    uploadImage(
      { tenantId: TENANT_ID, file },
      {
        onSuccess: (url) => {
          setImageUrl(url.url);
        },
      }
    );
  };

  // 이미지 유효성 검사
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

  // 수정 버튼 활성화 여부
  const isActive = todoDetail
    ? isCompleted !== todoDetail.isCompleted ||
      name !== todoDetail.name ||
      (memo || "") !== (todoDetail.memo || "") ||
      (imageUrl || "") !== (todoDetail.imageUrl || "")
    : false;

  return (
    <section className="flex flex-col gap-6">
      {(isUpdatePending || isDeletePending || isPending) && (
        <Loading isFullScreen />
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
          className={cn(
            "lg:w-[384px] w-full h-[311px] rounded-2xl border-2 border-slate-300 bg-slate-50 relative overflow-hidden flex items-center justify-center",
            imageUrl ? "border-solid" : "border-dashed border-spacing-[15px]"
          )}
        >
          {isUploadPending && (
            <div className="w-full h-[311px] bg-slate-50/30 absolute z-10 flex items-center justify-center">
              <Loading />
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
            handleFileChange={handleFileChange}
          />
        </div>
        <div className="relative">
          <div className="lg:w-[588px] w-full h-[311px] overflow-hidden rounded-2xl relative">
            <Typography
              variant="h3"
              className="absolute top-6 left-1/2 -translate-x-1/2 text-amber-800"
            >
              Memo
            </Typography>
            <Image
              src={memoImage}
              alt="memo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:w-[588px] w-full h-[311px] overflow-hidden rounded-2xl flex items-center justify-center absolute top-0 left-0 pt-[58px]">
            <Typography variant="body2" className="h-full z-10 px-4 w-full">
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="h-full w-full bg-transparent border-none outline-none focus:outline-none resize-none text-center"
                placeholder={isPending ? "" : "메모를 입력하세요..."}
              />
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex justify-end md:gap-4 gap-[7px] pb-6">
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
