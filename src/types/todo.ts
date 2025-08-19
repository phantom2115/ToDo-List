export interface getTodoListPayload {
  page?: number;
  pageSize?: number;
}

export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface createTodoPayload {
  name: string;
}

export interface createTodoResponse {
  id: number;
  tenantId: string;
  name: string;
  memo: null;
  imageUrl: null;
  isCompleted: false;
}

export interface updateTodoPayload {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

export interface updateTodoResponse {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

export interface getTodoDetailResponse {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}

export interface deleteTodoResponse {
  message: string;
}
