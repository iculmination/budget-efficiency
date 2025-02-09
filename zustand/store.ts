import { FullUser } from "@/types";
import { create } from "zustand";

interface UserState {
  user: FullUser | null;
  setUser: (userData: FullUser) => void;
  removeTransaction: (transactionId: string) => void;
  removeRecurringExpense: (transactionId: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null, 
  setUser: (userData) => set({ user: userData }),
  removeTransaction: (transactionId: string) =>
    set((state) => {
      if (!state.user || !state.user?.transactions) {
        return state;
      }
      return {
        user: {
          ...state.user,
          transactions: state.user.transactions.filter(
            (t) => t.id !== transactionId
          ),
          ...state.user.recurringExpenses,
        },
      };
    }),
  removeRecurringExpense: (recurringExpenseId: string) =>
    set((state) => {
      if (!state.user || !state.user?.recurringExpenses) {
        return state;
      }
      return {
        user: {
          ...state.user,
          recurringExpenses: state.user.recurringExpenses.filter(
            (re) => re.id !== recurringExpenseId
          ),
          ...state.user.transactions,
        },
      };
    }),
}));
