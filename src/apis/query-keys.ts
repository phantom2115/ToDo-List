const QueryKeys = {
  todo: {
    all: ["todos"] as const,
    lists: () => [...QueryKeys.todo.all, "list"] as const,
    list: (id: string, page: number, pageSize: number) =>
      [...QueryKeys.todo.lists(), id, page, pageSize] as const,
    detail: (id: string, itemId: number) =>
      [...QueryKeys.todo.all, "detail", id, itemId] as const,
  },
};

export default QueryKeys;
