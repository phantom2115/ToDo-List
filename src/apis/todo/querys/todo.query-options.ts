import { getTodoDetail, getTodoList } from "../todo.api";
import QueryKeys from "@/apis/query-keys";
import { getTodoListPayload } from "@/types/todo";

export const useTodoListQuery = (
  tenantId: string,
  payload: getTodoListPayload
) => ({
  queryKey: QueryKeys.todo.all,
  queryFn: () => getTodoList(tenantId, payload),
});

export const useTodoDetailQuery = (tenantId: string, itemId: number) => ({
  queryKey: QueryKeys.todo.detail(tenantId, itemId),
  queryFn: () => getTodoDetail(tenantId, itemId),
});
