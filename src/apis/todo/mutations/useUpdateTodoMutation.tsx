import { useMutation } from "@tanstack/react-query";
import { updateTodo } from "../todo.api";
import { updateTodoPayload } from "@/types/todo";
import { useQueryClient } from "@tanstack/react-query";
import QueryKeys from "@/apis/query-keys";

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: updateTodoPayload }) =>
      updateTodo(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.todo.all });
    },
  });
};
