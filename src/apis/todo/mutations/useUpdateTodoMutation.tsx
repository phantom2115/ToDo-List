import { useMutation } from "@tanstack/react-query";
import { updateTodo } from "../todo.api";
import { updateTodoPayload } from "@/types/todo";
import { useQueryClient } from "@tanstack/react-query";
import QueryKeys from "@/apis/query-keys";
import MutationKeys from "@/apis/mutation-keys";

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MutationKeys.todo.update],
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: number;
      payload: updateTodoPayload;
    }) => updateTodo(itemId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.todo.all });
    },
  });
};
