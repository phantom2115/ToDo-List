"use client";
import React, { useState } from "react";
import SearchBar from "../ui/Search/SearchBar";
import Button from "../ui/Button/Button";
import icons from "@/assets/icons";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useTodoListQuery } from "@/apis/todo/querys/todo.query-options";
import { useCreateTodoMutation } from "@/apis/todo/mutations/useCreateTodoMutation";

const SearchSection = () => {
  const { id } = useUserStore();
  const { data } = useQuery(useTodoListQuery(Number(id), 1, 100000));
  const [value, setValue] = useState("");
  const { mutate: createTodo } = useCreateTodoMutation();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!value.trim()) return;
    e.preventDefault();
    createTodo({ id: Number(id), payload: { name: value } });
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
          icon={<icons.Plus stroke={data?.length === 0 ? "#fff" : "#0f172a"} />}
        >
          추가하기
        </Button>
      </form>
    </section>
  );
};

export default SearchSection;
