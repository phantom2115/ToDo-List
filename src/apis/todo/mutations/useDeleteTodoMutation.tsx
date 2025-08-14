import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../todo.api";
import { useQueryClient } from "@tanstack/react-query";
import QueryKeys from "@/apis/query-keys";

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, itemId }: { id: number; itemId: number }) =>
      deleteTodo(id, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.todo.all });
    },
  });
};
