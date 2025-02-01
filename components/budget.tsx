"use client";

import { useUserStore } from "@/zustand/store";

const Budget = () => {
  const user = useUserStore((state) => state.user);

  return <div>{JSON.stringify(user)}</div>;
};

export default Budget;
