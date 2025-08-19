"use client";

import { useCreateTodoMutation } from "@/apis/todo/mutations/useCreateTodoMutation";
import { useTodoListQuery } from "@/apis/todo/queries/todo.query-options";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBar from "@/components/UI/Search/SearchBar";
import Button from "@/components/UI/Button/Button";
import { Plus } from "../../assets/icons/Plus";

const SearchSection = () => {
  const [name, setName] = useState("");
  const { data } = useQuery(useTodoListQuery({ page: 1, pageSize: 100000 }));

  const { mutate: createTodo, isPending } = useCreateTodoMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    createTodo(
      { payload: { name } },
      {
        onSuccess: () => {
          setName("");
        },
      }
    );
  };

  return (
    <section className="pt-4 md:pt-6">
      <form className="flex items-center gap-2 md:gap-4" onSubmit={onSubmit}>
        <div className="w-full relative">
          <SearchBar
            placeholder="할 일을 입력해주세요."
            value={name}
            onChange={onChange}
          />
          {isPending && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="size-5 rounded-full border-2 border-slate-200 border-t-slate-400 animate-spin" />
            </div>
          )}
        </div>
        <Button
          color={data?.length === 0 ? "violet" : "default"}
          textColor={data?.length === 0 ? "white" : "default"}
          icon={<Plus stroke={data?.length === 0 ? "#fff" : "#0f172a"} />}
          disabled={isPending}
        >
          추가하기
        </Button>
      </form>
    </section>
  );
};

export default SearchSection;
