import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../todo.api";
import { createTodoPayload } from "@/types/todo";
import QueryKeys from "@/apis/query-keys";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: createTodoPayload }) =>
      createTodo(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.todo.all });
    },
  });
};
