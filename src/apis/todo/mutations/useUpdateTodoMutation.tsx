import { useMutation } from "@tanstack/react-query";
import { updateTodo } from "../todo.api";
import { updateTodoPayload } from "@/types/todo";
import { useQueryClient } from "@tanstack/react-query";
import QueryKeys from "@/apis/query-keys";
import MutationKeys from "@/apis/mutation-keys";
import { useRouter } from "next/navigation";

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MutationKeys.todo.update],
    mutationFn: ({
      tenantId,
      itemId,
      payload,
    }: {
      tenantId: string;
      itemId: number;
      payload: updateTodoPayload;
    }) => updateTodo(tenantId, itemId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.todo.all });
    },
  });
};
