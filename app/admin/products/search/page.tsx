import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

const searchProducts = async (searchTerm: string) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { search: string };
}) => {
  console.log(searchParams.search);
  const products = await searchProducts(searchParams.search);

  return (
    <>
      <Heading>Resultados de busqueda: {searchParams.search}</Heading>
      <div className="flex flex-col lg:flex-row justify-end gap-5">
        <ProductSearchForm />
      </div>
      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg m-4 ">No hay resultados</p>
      )}
    </>
  );
};

export default SearchPage;
