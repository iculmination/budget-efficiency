"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { transformUserData } from "../utils";
import { FullUser } from "@/types";

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
      dreamGoal: true,
      recurringExpenses: true,
      transactions: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};

export const createUserData = async (values: FullUser) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { user, dreamGoal } = transformUserData(values);

  try {
    await prisma.user.create({
      data: { id: userId, ...user },
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

export const updateUserData = async (values: FullUser) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await prisma.user.findUnique({ where: { id: userId } });

  if (!existingUser) {
    return createUserData(values);
  }

  const { user, dreamGoal } = transformUserData(values);

  try {
    await prisma.user.update({
      where: { id: userId },
      data: user,
    });

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

export const deleteTransaction = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.transaction.delete({ where: { userId, id } });

    return { success: true, message: "Deleted successfully/" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete." };
  }
};

export const deleteRecurringExpense = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.recurringExpense.delete({ where: { userId, id } });

    return { success: true, message: "Deleted successfully/" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to delete." };
  }
};

export const createTransaction = async (data: {
  type: string;
  category: string;
  amount: number;
  description?: string;
  source?: string;
}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  console.log(data);
  try {
    await prisma.transaction.create({
      data: {
        ...data,
        userId,
        date: new Date(),
        category: data.category.toLowerCase(),
        source: data.source?.toLowerCase() || null,
      },
    });

    return { success: true, message: "Created successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create." };
  }
};

export const createRecurringExpense = async (data: {
  name: string;
  amount: number;
  nextPaymentDate: Date;
}) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.recurringExpense.create({
      data: {
        ...data,
        userId,
      },
    });

    return {
      success: true,
      message: "Recurring expense created successfully.",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create recurring expense." };
  }
};

export const deleteAccount = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.user.delete({ where: { id: userId } });

    return { success: true, message: "Created successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create." };
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

// export const testData = async () => {
//   const user = await prisma.user.findUnique({
//     where: { email: "ovsiichuk.bohdan@gmail.com" },
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const userId = user.id;

//   const transactions = Array.from({ length: 10 }, (_, i) => ({
//     userId,
//     type: i % 2 === 0 ? "income" : "expense",
//     category: i % 2 === 0 ? "Salary" : "Food",
//     source: i % 2 === 0 ? "Work" : "Binance",
//     amount: Math.random() * 500 + 50,
//     date: new Date(),
//     description: i % 2 === 0 ? "Monthly income" : "Lunch expense",
//   }));

//   await prisma.transaction.createMany({ data: transactions });

//   const recurringExpenses = Array.from({ length: 10 }, (_, i) => ({
//     userId,
//     name: `Subscription ${i + 1}`,
//     amount: Math.random() * 100 + 10,
//     nextPaymentDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
//   }));

//   await prisma.recurringExpense.createMany({ data: recurringExpenses });
// };

export const seedTestData = async () => {
  try {
    const email = "myxajlo.matjushhenko@kitu.nau.edu.ua";

    // Перевіряємо, чи є такий користувач
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Якщо користувач не існує, створюємо нового
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: "user_2srNGQxn67mfy3E4ImbJeoWyYb3",
          username: "Mykhajlo Matjushhenko",
          email,
          age: 25,
          currency: "USD",
          income: 5000,
          savings: 1000,
          percentageGoal: 10,
        },
      });
    }

    const userId = user.id;

    // Додаємо тестову мрію (DreamGoal)
    await prisma.dreamGoal.create({
      data: {
        userId,
        name: "Buy a Tesla",
        sum: 50000,
        progress: 5000,
        date: new Date("2026-01-01"),
      },
    });

    // Додаємо повторювані витрати (RecurringExpense)
    await prisma.recurringExpense.createMany({
      data: [
        {
          userId,
          name: "Netflix Subscription",
          amount: 10.99,
          nextPaymentDate: new Date("2025-03-01"),
        },
        {
          userId,
          name: "Gym Membership",
          amount: 30.0,
          nextPaymentDate: new Date("2025-02-15"),
        },
      ],
    });

    // Додаємо тестові транзакції (Transaction)
    await prisma.transaction.createMany({
      data: [
        {
          userId,
          type: "income",
          category: "Salary",
          source: "Company XYZ",
          amount: 5000,
          date: new Date(),
          description: "Monthly salary payment",
        },
        {
          userId,
          type: "expense",
          category: "Food",
          source: null,
          amount: 50.25,
          date: new Date(),
          description: "Grocery shopping",
        },
        {
          userId,
          type: "expense",
          category: "Entertainment",
          source: null,
          amount: 15.99,
          date: new Date(),
          description: "Cinema ticket",
        },
      ],
    });

    console.log("Test data added successfully!");
  } catch (error) {
    console.error("Error adding test data:", error);
  } finally {
    await prisma.$disconnect();
  }
};
