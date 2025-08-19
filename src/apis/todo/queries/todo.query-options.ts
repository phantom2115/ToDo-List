import { getTodoDetail, getTodoList } from "../todo.api";
import QueryKeys from "@/apis/query-keys";
import { getTodoListPayload } from "@/types/todo";

export const useTodoListQuery = (payload: getTodoListPayload) => ({
  queryKey: QueryKeys.todo.all,
  queryFn: () => getTodoList(payload),
});

export const useTodoDetailQuery = (itemId: number) => ({
  queryKey: QueryKeys.todo.detail(itemId),
  queryFn: () => getTodoDetail(itemId),
});
