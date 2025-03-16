"use client";

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
  product: Product;
};

const AddProduct = ({ product }: AddProductButtonProps) => {
  const addToOrder = useStore((state) => state.addToOrder);
  return (
    <button
      type="button"
      onClick={() => addToOrder(product)}
      className="bg-indigo-600 hover:gb-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
    >
      Agregar
    </button>
  );
};

export default AddProduct;
