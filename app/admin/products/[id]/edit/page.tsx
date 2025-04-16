import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackBtn from "@/components/ui/GoBackBtn";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

const getproductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product) {
    notFound();
  }
  return product;
};

const EditProductsPage = async ({ params }: { params: { id: string } }) => {
  const product = await getproductById(+params.id);
  return (
    <>
      <Heading>editar Producto: {product.name}</Heading>
      <GoBackBtn />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
};

export default EditProductsPage;
