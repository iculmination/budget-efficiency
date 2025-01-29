import { auth, clerkClient } from "@clerk/nextjs/server";

export const getCurrentUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  return user;
};
