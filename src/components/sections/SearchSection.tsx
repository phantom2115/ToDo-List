"use client";

import { useCreateTodoMutation } from "@/apis/todo/mutations/useCreateTodoMutation";
import { useTodoListQuery } from "@/apis/todo/querys/todo.query-options";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SearchBar from "@/components/UI/Search/SearchBar";
import Button from "@/components/UI/Button/Button";
import { Plus } from "../../assets/icons/Plus";

const SearchSection = () => {
  const { id } = useUserStore();
  const { data } = useQuery(useTodoListQuery(id, 1, 100000));
  const [value, setValue] = useState("");
  const { mutate: createTodo } = useCreateTodoMutation();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!value.trim()) return;
    e.preventDefault();
    createTodo({ id, payload: { name: value } });
    setValue("");
  };

  return (
    <section className="pt-4 md:pt-6">
      <form className="flex items-center gap-2 md:gap-4" onSubmit={onSubmit}>
        <SearchBar
          placeholder="할 일을 입력해주세요."
          value={value}
          onChange={onChange}
        />
        <Button
          color={data?.length === 0 ? "violet" : "default"}
          textColor={data?.length === 0 ? "white" : "default"}
          icon={<Plus stroke={data?.length === 0 ? "#fff" : "#0f172a"} />}
        >
          추가하기
        </Button>
      </form>
    </section>
  );
};

export default SearchSection;
