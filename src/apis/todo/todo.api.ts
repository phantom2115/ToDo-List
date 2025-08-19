import { Base_URL } from "@/constant/api";
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
import axios from "axios";

export const getTodoList = async (
  tenantId: string,
  payload: getTodoListPayload
) => {
  const response = await axios.get<Todo[]>(`${Base_URL}/${tenantId}/items`, {
    params: payload,
  });
  return response.data;
};

export const createTodo = async (
  tenantId: string,
  payload: createTodoPayload
) => {
  const response = await axios.post<createTodoResponse>(
    `${Base_URL}/${tenantId}/items`,
    payload
  );
  return response.data;
};

export const updateTodo = async (
  tenantId: string,
  itemId: number,
  payload: updateTodoPayload
) => {
  const response = await axios.patch<updateTodoResponse>(
    `${Base_URL}/${tenantId}/items/${itemId}`,
    payload
  );
  return response.data;
};

export const getTodoDetail = async (tenantId: string, itemId: number) => {
  const response = await axios.get<getTodoDetailResponse>(
    `${Base_URL}/${tenantId}/items/${itemId}`
  );
  return response.data;
};

export const deleteTodo = async (tenantId: string, itemId: number) => {
  const response = await axios.delete<deleteTodoResponse>(
    `${Base_URL}/${tenantId}/items/${itemId}`
  );
  return response.data;
};
