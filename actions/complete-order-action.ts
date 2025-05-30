"use server";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export const completeOrder = async (formData: FormData) => {
  // const orderId = formData.get("orderId")!;

  const data = {
    orderId: formData.get("orderId")!,
  };
  const result = OrderIdSchema.safeParse(data);

  if (result.success) {
    try {
      await prisma.order.update({
        where: {
          id: result.data.orderId,
        },
        data: {
          status: true,
          orderreadyAt: new Date(Date.now()),
        },
      });
      revalidatePath("/admin/orders");
    } catch (error) {
      console.log(error);
    }
  }
};
