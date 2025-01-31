"use server";

import { auth, clerkClient, User } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export const getCurrentUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  return user;
};

export const createUser = async (user: User) => {
  return prisma.user.create(user);
};

export const updateUser = async (user: any) => {
  return prisma.user.update({ where: { id: user.id }, data: user });
};

export const testData = async () => {
  const user = await prisma.user.create({
    data: {
      username: "john_doe",
      email: "john@example.com",
      age: 30,
      currency: "USD",
      income: 5000,
      savings: 2000,
    },
  });

  console.log("User created:", user);

  // 2️⃣ Додаємо транзакцію
  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      type: "expense",
      category: "food",
      source: "cash",
      amount: 50,
      date: new Date(),
      description: "Lunch at restaurant",
    },
  });

  console.log("Transaction created:", transaction);

  // 3️⃣ Додаємо мрію (DreamGoal)
  const dreamGoal = await prisma.dreamGoal.create({
    data: {
      userId: user.id,
      name: "New Laptop",
      sum: 2000,
      progress: 500,
      date: new Date(),
    },
  });

  console.log("Dream Goal created:", dreamGoal);

}