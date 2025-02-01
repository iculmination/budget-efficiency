"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { transformUserData } from "../utils";

export const getCurrentUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  return user;
};

export const getUserData = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      percentageGoal: true,
      dreamGoals: true,
      recurringExpenses: true,
      transactions: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const createUserData = async (data: FullUser) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { user, percentageGoal, dreamGoal } = transformUserData(data);

  try {
    await prisma.user.create({
      data: { id: userId, ...user },
    });

    await prisma.percentageGoal.create({
      data: { userId, ...percentageGoal },
    });

    await prisma.dreamGoal.create({
      data: { userId, ...dreamGoal },
    });

    return { success: true, message: "User data updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update user data" };
  }
};

export const updateUserData = async (data: FullUser) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await prisma.user.findUnique({ where: { id: userId } });

  if (!existingUser) {
    return createUserData(data);
  }

  const { user, percentageGoal, dreamGoal } = transformUserData(data);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: user,
    });

    const existingPercentageGoal = await prisma.percentageGoal.findUnique({
      where: { userId },
    });

    if (existingPercentageGoal) {
      await prisma.percentageGoal.update({
        where: { userId },
        data: percentageGoal,
      });
    } else {
      await prisma.percentageGoal.create({
        data: { userId, ...percentageGoal },
      });
    }

    const existingDreamGoal = await prisma.dreamGoal.findFirst({
      where: { userId },
    });

    if (existingDreamGoal) {
      await prisma.dreamGoal.update({
        where: { id: existingDreamGoal.id },
        data: dreamGoal,
      });
    } else {
      await prisma.dreamGoal.create({
        data: { userId, ...dreamGoal },
      });
    }

    return { success: true, message: "User data updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update user data" };
  }
};

// export const testData = async () => {
//   const user = await prisma.user.create({
//     data: {
//       username: "john_doe",
//       email: "john@example.com",
//       age: 30,
//       currency: "USD",
//       income: 5000,
//       savings: 2000,
//     },
//   });

//   console.log("User created:", user);

//   const transaction = await prisma.transaction.create({
//     data: {
//       userId: user.id,
//       type: "expense",
//       category: "food",
//       source: "cash",
//       amount: 50,
//       date: new Date(),
//       description: "Lunch at restaurant",
//     },
//   });

//   console.log("Transaction created:", transaction);

//   const dreamGoal = await prisma.dreamGoal.create({
//     data: {
//       userId: user.id,
//       name: "New Laptop",
//       sum: 2000,
//       progress: 500,
//       date: new Date(),
//     },
//   });

//   console.log("Dream Goal created:", dreamGoal);
// };
