import { BASE_URL } from "@/constant/api";
import {
  createTodoPayload,
  createTodoResponse,
  deleteTodoResponse,
  getTodoListPayload,
  Todo,
  getTodoDetailResponse,
  updateTodoPayload,
  updateTodoResponse,
} from "@/types/todo";
import instance from "../api";

export const getTodoList = async (payload: getTodoListPayload) => {
  const response = await instance.get<Todo[]>(`/items`, {
    params: payload,
  });
  return response.data;
};

export const createTodo = async (payload: createTodoPayload) => {
  const response = await instance.post<createTodoResponse>(`/items`, payload);
  return response.data;
};

export const updateTodo = async (
  itemId: number,
  payload: updateTodoPayload
) => {
  const response = await instance.patch<updateTodoResponse>(
    `/items/${itemId}`,
    payload
  );
  return response.data;
};

export const getTodoDetail = async (itemId: number) => {
  const response = await instance.get<getTodoDetailResponse>(
    `/items/${itemId}`
  );
  return response.data;
};

export const deleteTodo = async (itemId: number) => {
  const response = await instance.delete<deleteTodoResponse>(
    `/items/${itemId}`
  );
  return response.data;
};
