"use client";
import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import React from "react";
import useSWR from "swr";

const OrderPage = () => {
  const url = "/orders/api";
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
        <h1 className="text-center mt-20 text-6xl font-black">
          Ordenes listas
        </h1>
        <Logo />
        {orders.length ? (
          <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
            {orders.map((order) => (
              <LatestOrderItem
                key={order.id}
                order={order}
              />
            ))}
          </div>
        ) : (
          <p className=" text-center my-10">No hay Ordenes listas</p>
        )}
      </>
    );
};

export default OrderPage;
