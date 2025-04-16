import { prisma } from "@/src/lib/prisma";

export const GET = async () => {
  const orders = await prisma.order.findMany({
    take: 5,
    where: {
      orderreadyAt: {
        not: null,
      },
    },
    orderBy: {
      orderreadyAt: "desc",
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return Response.json(orders);
};
