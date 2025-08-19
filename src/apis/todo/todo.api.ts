import { Base_URL } from "@/constant/api";
import {
  createTodoPayload,
  getTodoListPayload,
  Todo,
  TodoDetail,
  updateTodoPayload,
} from "@/types/todo";
import axios from "axios";

export const getTodoList = async (
  id: string,
  payload: getTodoListPayload
): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${Base_URL}/${id}/items`, {
    params: payload,
  });
  return response.data;
};

export const createTodo = async (id: string, payload: createTodoPayload) => {
  const response = await axios.post(`${Base_URL}/${id}/items`, payload);
  return response.data;
};

export const updateTodo = async (id: string, payload: updateTodoPayload) => {
  const response = await axios.patch(`${Base_URL}/${id}/items/${payload.id}`, {
    name: payload.name,
    memo: payload.memo,
    imageUrl: payload.imageUrl,
    isCompleted: payload.isCompleted,
  });
  return response.data;
};

export const getTodoDetail = async (id: string, itemId: number) => {
  const response = await axios.get<TodoDetail>(
    `${Base_URL}/${id}/items/${itemId}`
  );
  return response.data;
};

export const deleteTodo = async (id: string, itemId: number) => {
  const response = await axios.delete(`${Base_URL}/${id}/items/${itemId}`);
  return response.data;
};
