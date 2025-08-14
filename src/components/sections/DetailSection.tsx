import { useRef, useEffect, useState, useCallback } from "react";
import CheckListDetail from "../ui/CheckList/CheckListDetail";
import Image from "next/image";
import memo from "../../assets/images/memo.svg";
import emptyImage from "../../assets/images/img.svg";
import Button from "../ui/Button/Button";
import ImageButton from "../ui/Button/ImageButton";
import icons from "../../assets/icons";
import { useQuery } from "@tanstack/react-query";
import { useTodoDetailQuery } from "../../apis/todo/querys/todo.query-options";
import { useParams } from "next/navigation";
import { useUpdateTodoMutation } from "../../apis/todo/mutations/useUpdateTodoMutation";
import { useUploadImageMutation } from "../../apis/image/mutations/useUploadImageMutation";
import { useRouter } from "next/navigation";
import { useDeleteTodoMutation } from "../../apis/todo/mutations/useDeleteTodoMutation";

const IMAGE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_WIDTH: 384,
  MAX_HEIGHT: 311,
} as const;

const FILE_NAME_REGEX = /^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif|webp)$/i;

const DetailSection = () => {
  const router = useRouter();
  const { itemId } = useParams<{ itemId: string }>();

  const [id, setId] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState<string>("");
  const [editMemo, setEditMemo] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: todoDetail } = useQuery(
    useTodoDetailQuery(Number(id), Number(itemId))
  );
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: uploadImage } = useUploadImageMutation(Number(id));
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setId(Number(storedId));
    }
  }, []);

  useEffect(() => {
    if (todoDetail) {
      setEditName(todoDetail.name || "");
      setEditMemo(todoDetail.memo || "");
    }
  }, [todoDetail]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditName(e.target.value);
    },
    []
  );

  const handleMemoChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditMemo(e.target.value);
    },
    []
  );

  const handleToggleComplete = useCallback(() => {
    if (!id || !itemId) return;

    updateTodo({
      id: Number(id),
      payload: {
        id: Number(itemId),
        isCompleted: !todoDetail?.isCompleted,
      },
    });
  }, [id, itemId, todoDetail?.isCompleted, updateTodo]);

  const handleImageUpload = useCallback(
    (file: File) => {
      // 파일 이름 검증
      if (!FILE_NAME_REGEX.test(file.name)) {
        alert("파일 이름은 영어, 숫자, 특수문자(._-)만 사용 가능합니다.");
        return;
      }

      // 파일 크기 검증
      if (file.size > IMAGE_CONSTRAINTS.MAX_SIZE) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 이미지 크기 검증
      const img = document.createElement("img");
      img.onload = () => {
        if (
          img.naturalWidth > IMAGE_CONSTRAINTS.MAX_WIDTH ||
          img.naturalHeight > IMAGE_CONSTRAINTS.MAX_HEIGHT
        ) {
          alert(
            `이미지 크기는 ${IMAGE_CONSTRAINTS.MAX_WIDTH}x${IMAGE_CONSTRAINTS.MAX_HEIGHT} 이하여야 합니다.`
          );
          return;
        }

        // 이미지 검증 통과 시 업로드 실행
        uploadImage(file, {
          onSuccess: (data) => {
            setSelectedImage(data.url);
            console.log("이미지 업로드 성공:", data.url);
          },
          onError: (error: any) => {
            console.error("이미지 업로드 실패:", error);

            const errorMessage = getErrorMessage(error);
            alert(errorMessage);
          },
        });
      };
      img.src = URL.createObjectURL(file);
    },
    [uploadImage]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file);
      }
    },
    [handleImageUpload]
  );

  const handleEditClick = useCallback(() => {
    if (!editName.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (isEdit) {
      // 수정 완료
      if (!id || !itemId) return;

      updateTodo(
        {
          id: Number(id),
          payload: {
            id: Number(itemId),
            imageUrl: selectedImage || undefined,
            name: editName,
            memo: editMemo || "",
          },
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (error) => {
            console.error("Todo 수정 실패:", error);
          },
        }
      );
      setSelectedImage(null);
    }

    setIsEdit(!isEdit);
  }, [
    isEdit,
    editName,
    editMemo,
    selectedImage,
    id,
    itemId,
    updateTodo,
    router,
  ]);

  const handleImageButtonClick = useCallback(() => {
    setIsEdit(true);
    fileInputRef.current?.click();
  }, []);

  const getErrorMessage = (error: any): string => {
    if (error.response?.status === 500) {
      return "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    } else if (error.response?.status === 413) {
      return "파일이 너무 큽니다.";
    } else if (error.response?.status === 400) {
      return "잘못된 요청입니다.";
    }
    return "이미지 업로드에 실패했습니다.";
  };

  const renderImage = () => {
    if (selectedImage) {
      return (
        <Image
          src={selectedImage}
          alt="selected image preview"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 384px"
        />
      );
    }

    if (todoDetail?.imageUrl) {
      return (
        <Image
          src={todoDetail.imageUrl}
          alt="todo image"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 384px"
          onError={(e) => {
            console.error("이미지 로드 실패:", todoDetail.imageUrl);
            e.currentTarget.style.display = "none";
          }}
        />
      );
    }

    return (
      <Image
        src={emptyImage}
        alt="emptyImage"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );
  };

  const renderMemoSection = () => (
    <div className="relative">
      <div className="lg:w-[588px] w-full h-[311px] overflow-hidden rounded-2xl relative">
        <span className="absolute top-6 left-1/2 -translate-x-1/2 font-extrabold text-amber-800">
          Memo
        </span>
        <Image src={memo} alt="memo" className="w-full h-full object-cover" />
      </div>
      <div className="lg:w-[588px] w-full h-[311px] overflow-hidden rounded-2xl flex items-center justify-center absolute top-0 left-0 pt-[58px]">
        {isEdit ? (
          <textarea
            ref={textareaRef}
            value={editMemo || ""}
            onChange={handleMemoChange}
            className="h-full z-10 text-center px-4 resize-none w-full focus:outline-none"
            placeholder="메모를 입력하세요..."
          />
        ) : (
          <div className="h-full text-center px-4 w-full break-words">
            {editMemo}
          </div>
        )}
      </div>
    </div>
  );

  const handleDeleteClick = useCallback(() => {
    if (!id || !itemId) return;
    deleteTodo(
      { id: Number(id), itemId: Number(itemId) },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  }, [id, itemId, deleteTodo]);

  return (
    <section className="flex flex-col gap-6">
      <CheckListDetail
        name={editName}
        isCompleted={todoDetail?.isCompleted}
        isEdit={isEdit}
        value={editName}
        onChange={handleNameChange}
        onClick={handleToggleComplete}
      />

      <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-6">
        <div
          className="lg:w-[384px] w-full h-[311px] rounded-2xl bg-slate-50 relative overflow-hidden"
          style={
            selectedImage || todoDetail?.imageUrl
              ? {
                  borderColor: "#CBD5E1",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }
              : {
                  borderColor: "#CBD5E1",
                  borderStyle: "dashed",
                  borderWidth: "2px",
                  borderSpacing: "15px",
                }
          }
        >
          {renderImage()}

          <input
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
          />

          <ImageButton
            variant={todoDetail?.imageUrl ? "edit" : "attach"}
            icon={
              todoDetail?.imageUrl ? (
                <icons.Edit />
              ) : (
                <icons.Plus stroke="#64748B" width="24px" height="24px" />
              )
            }
            className="absolute bottom-4 right-4"
            onClick={handleImageButtonClick}
          />
        </div>
        {renderMemoSection()}
      </div>
      <div className="flex justify-end md:gap-4 gap-[7px]">
        <Button
          color={isEdit ? "lime" : "default"}
          icon={<icons.Check />}
          className="!w-[162px] !h-14"
          textClassName="!block"
          onClick={handleEditClick}
        >
          수정 {isEdit ? "완료" : "하기"}
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
