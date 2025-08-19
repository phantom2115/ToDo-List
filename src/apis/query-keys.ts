const QueryKeys = {
  todo: {
    all: ["todos"] as const,
    lists: () => [...QueryKeys.todo.all, "list"] as const,
    list: (page: number, pageSize: number) =>
      [...QueryKeys.todo.lists(), page, pageSize] as const,
    detail: (itemId: number) =>
      [...QueryKeys.todo.all, "detail", itemId] as const,
  },
};

export default QueryKeys;
