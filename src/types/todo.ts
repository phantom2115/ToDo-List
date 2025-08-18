export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface TodoDetail {
  isCompleted: true;
  imageUrl: string;
  memo: string;
  name: string;
  tenantId: string;
  id: number;
}

export interface getTodoListPayload {
  page?: number;
  pageSize?: number;
}

export interface createTodoPayload {
  name: string;
}

export interface updateTodoPayload {
  id?: number;
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}
