import { getTodoDetail, getTodoList } from "../todo.api";
import QueryKeys from "@/apis/query-keys";

export const useTodoListQuery = (
  id: string,
  page: number,
  pageSize: number
) => ({
  queryKey: QueryKeys.todo.list(id, page, pageSize),
  queryFn: () => getTodoList(id, { page, pageSize }),
});

export const useTodoDetailQuery = (id: string, itemId: number) => ({
  queryKey: QueryKeys.todo.detail(id, itemId),
  queryFn: () => getTodoDetail(id, itemId),
});
