import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../todo.api";
import { useQueryClient } from "@tanstack/react-query";
import QueryKeys from "@/apis/query-keys";
import MutationKeys from "@/apis/mutation-keys";

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MutationKeys.todo.delete],
    mutationFn: ({ id, itemId }: { id: string; itemId: number }) =>
      deleteTodo(id, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.todo.all });
    },
  });
};
