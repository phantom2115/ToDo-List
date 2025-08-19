import { create } from "zustand";

interface UserState {
  tenantId: string;
  setTenantId: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  tenantId: "phantom2115",
  setTenantId: (id: string) => set({ tenantId: id }),
}));
