import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });
  console.log(createUser);

  const getUser = await prisma.user.findMany({ where: { id: 1 } });
  console.log({ getUser });

  const createUserWithPost = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@prisma.io",
      posts: {
        create: [
          {
            title: "Hello World",
            published: true,
          },
          {
            title: "My second post",
            content: "This is still a draft",
          },
        ],
      },
    },
  });
  console.log({ createUserWithPost });

  const getUserWithPost = await prisma.user.findFirst({
    where: {
      id: 2,
    },
    select: { name: true, posts: true },
  });
  console.log({ getUserWithPost });

  const getUserWithPostFieldSelection = await prisma.user.findFirst({
    where: {
      id: 2,
    },
    select: { name: true, posts: { select: { title: true } } },
  });
  console.log({ getUserWithPostFieldSelection });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
