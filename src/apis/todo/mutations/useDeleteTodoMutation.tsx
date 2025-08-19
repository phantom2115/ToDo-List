import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../todo.api";
import { useQueryClient } from "@tanstack/react-query";
import QueryKeys from "@/apis/query-keys";
import MutationKeys from "@/apis/mutation-keys";

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MutationKeys.todo.delete],
    mutationFn: ({ tenantId, itemId }: { tenantId: string; itemId: number }) =>
      deleteTodo(tenantId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.todo.all });
    },
  });
};
