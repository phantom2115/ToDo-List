import Image from "next/image";
import { useUpdateTodoMutation } from "@/apis/todo/mutations/useUpdateTodoMutation";
import { useRouter } from "next/navigation";
import { Todo } from "@/types/todo";
import CheckList from "../CheckList/CheckList";
import todo from "../../../assets/images/todo.svg";
import done from "../../../assets/images/done.svg";
import { useIsFetching } from "@tanstack/react-query";
import ListSkeleton from "./ListSkeleton";
import QueryKeys from "@/apis/query-keys";
import { Typography } from "../Typography";

interface ListProps {
  type: typeof todo | typeof done;
  items?: Todo[];
  emptyMessage: string;
  guideMessage: string;
  emptyImageSm: any;
  emptyImageLg: any;
}

// 할 일 목록
const List = ({
  type,
  items,
  emptyMessage,
  guideMessage,
  emptyImageSm,
  emptyImageLg,
}: ListProps) => {
  const { mutate: updateTodo } = useUpdateTodoMutation();

  const router = useRouter();

  const isListPending = useIsFetching({
    queryKey: QueryKeys.todo.all,
  });

  return (
    <div className="flex flex-col gap-4">
      <Image src={type} alt="todo" />
      <div className="flex flex-col gap-4 lg:max-h-[600px] max-h-[320px] overflow-y-auto pr-3">
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
            <Typography variant="body1" className="text-center text-slate-400">
              {emptyMessage}
              <br />
              {guideMessage}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
