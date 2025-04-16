"use client";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";
// import { revalidatePath } from "next/cache";

const OrdersPage = () => {
  const url = "/admin/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);

  const { data: orders, isLoading } = useSWR<OrderWithProducts[]>(
    url,
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  if (isLoading) return <p className="text-center">Cargando...</p>;

  if (orders)
    return (
      <>
        <Heading>Administrar Ordenes</Heading>
        {/* <form
        action={async () => {
          "use server";
          revalidatePath("/admin/orders"); 
        }}
      >
        <input
          type="submit"
          value={"Actualizar ordenes"}
          className=" bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        />
      </form> */}
        {orders.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        ) : (
          <p className="text-center"> No hay Ordenes pendientes</p>
        )}
      </>
    );
};

export default OrdersPage;
