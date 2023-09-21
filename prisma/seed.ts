import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Rafles",
      email: "Rafles@gmail.com",
      role: "admin",
      password: "08123843847", // Provide a password value
      phone: "623486346",   // Provide a phonets value
    },
  });

  console.log({ user });
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });