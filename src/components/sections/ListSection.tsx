import Image from "next/image";
import React, { useRef } from "react";
import todo from "../../assets/images/todo.svg";
import done from "../../assets/images/done.svg";
import CheckList from "../ui/CheckList/CheckList";
import emptyDoneSm from "../../assets/images/donesm.svg";
import emptyDoneLg from "../../assets/images/donelg.svg";
import emptyTodoSm from "../../assets/images/todosm.svg";
import emptyTodoLg from "../../assets/images/todolg.svg";
import { useQuery } from "@tanstack/react-query";
import { useTodoListQuery } from "@/apis/todo/querys/todo.query-options";
import { Todo } from "@/types/todo";
import { useUserStore } from "@/store/userStore";
import { useUpdateTodoMutation } from "@/apis/todo/mutations/useUpdateTodoMutation";
import { useRouter } from "next/navigation";

const ListSection = () => {
  const { id } = useUserStore();
  const { data } = useQuery(useTodoListQuery(Number(id), 1, 100000));
  return (
    <section className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-6">
      <List
        type={todo}
        items={data?.filter((item) => !item.isCompleted)}
        emptyMessage="할 일이 없어요."
        guideMessage="TODO를 새롭게 추가해주세요!"
        emptyImageSm={emptyTodoSm}
        emptyImageLg={emptyTodoLg}
      />
      <List
        type={done}
        items={data?.filter((item) => item.isCompleted)}
        emptyMessage="아직 다 한 일이 없어요."
        guideMessage="해야 할 일을 체크해보세요!"
        emptyImageSm={emptyDoneSm}
        emptyImageLg={emptyDoneLg}
      />
    </section>
  );
};

export default ListSection;

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
  const { id } = useUserStore();
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <Image src={type} alt="todo" />
      <div className="flex flex-col gap-4 lg:max-h-[600px] max-h-[320px] overflow-y-auto pr-3">
        {items && items.length > 0 ? (
          items.map((item) => (
            <CheckList
              key={item.id}
              name={item.name}
              isCompleted={item.isCompleted}
              checkboxClick={() => {
                updateTodo({
                  id: Number(id),
                  payload: {
                    id: item.id,
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
