import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../todo.api";
import { createTodoPayload } from "@/types/todo";
import QueryKeys from "@/apis/query-keys";
import { useQueryClient } from "@tanstack/react-query";
import MutationKeys from "@/apis/mutation-keys";

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MutationKeys.todo.create],
    mutationFn: ({ payload }: { payload: createTodoPayload }) =>
      createTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.todo.all });
    },
  });
};
