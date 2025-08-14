import { Base_URL } from "@/constant/api";
import {
  createTodoPayload,
  getTodoListPayload,
  Todo,
  updateTodoPayload,
} from "@/types/todo";
import axios from "axios";

export const getTodoList = async (
  id: number,
  payload: getTodoListPayload
): Promise<Todo[]> => {
  const response = await axios.get(`${Base_URL}/${id}/items`, {
    params: payload,
  });
  return response.data;
};

export const createTodo = async (id: number, payload: createTodoPayload) => {
  const response = await axios.post(`${Base_URL}/${id}/items`, payload);
  return response.data;
};

export const updateTodo = async (id: number, payload: updateTodoPayload) => {
  const response = await axios.patch(`${Base_URL}/${id}/items/${payload.id}`, {
    name: payload.name,
    memo: payload.memo,
    imageUrl: payload.imageUrl,
    isCompleted: payload.isCompleted,
  });
  return response.data;
};

export const getTodoDetail = async (id: number, itemId: number) => {
  const response = await axios.get(`${Base_URL}/${id}/items/${itemId}`);
  return response.data;
};
