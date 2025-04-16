import { prisma } from "@/src/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";

const getProducts = async (category: string) => {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
};

const OrderPage = async ({ params }: { params: { category: string } }) => {
  const { category } = await params;
  const products = await getProducts(category);

  return (
    <>
      <Heading>Elige y personaliza tu pedido</Heading>
      <div className=" grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default OrderPage;
