import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import { useUpdateTodoMutation } from "@/apis/todo/mutations/useUpdateTodoMutation";
import { useRouter } from "next/navigation";
import { Todo } from "@/types/todo";
import CheckList from "../CheckList/CheckList";
import todo from "../../../assets/images/todo.svg";
import done from "../../../assets/images/done.svg";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import MutationKeys from "@/apis/mutation-keys";
import ListSkeleton from "./ListSkeleton";
import QueryKeys from "@/apis/query-keys";
import { useCreateTodoMutation } from "@/apis/todo/mutations/useCreateTodoMutation";

interface ListProps {
  type: typeof todo | typeof done;
  items?: Todo[];
  emptyMessage: string;
  guideMessage: string;
  emptyImageSm: any;
  emptyImageLg: any;
}

const List = ({
  type,
  items,
  emptyMessage,
  guideMessage,
  emptyImageSm,
  emptyImageLg,
}: ListProps) => {
  const { tenantId: id } = useUserStore();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const router = useRouter();

  const isListPending = useIsFetching({
    queryKey: QueryKeys.todo.all,
  });
  return (
    <div className="flex flex-col gap-4">
      <Image src={type} alt="todo" />
      <div className="flex flex-col gap-4 lg:max-h-[600px] max-h-[320px] overflow-y-auto pr-3 ">
        {isListPending > 0 ? (
          <ListSkeleton />
        ) : items && items.length > 0 ? (
          items.map((item) => (
            <CheckList
              key={item.id}
              name={item.name}
              isCompleted={item.isCompleted}
              checkboxClick={() => {
                updateTodo({
                  tenantId: id,
                  itemId: item.id,
                  payload: {
                    isCompleted: !item.isCompleted,
                  },
                });
              }}
              onClick={() => {
                router.push(`/items/${item.id}`);
              }}
            />
          ))
        ) : (
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <div className="size-60 hidden md:flex md:items-center md:justify-center">
              <Image src={emptyImageLg} alt="empty" />
            </div>
            <div className="size-30 flex items-center justify-center md:hidden">
              <Image src={emptyImageSm} alt="empty" />
            </div>
            <span className="text-center font-bold text-[16px] text-slate-400">
              {emptyMessage}
              <br />
              {guideMessage}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
