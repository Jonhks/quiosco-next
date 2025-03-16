import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";

const getCategories = async () => await prisma.category.findMany();

const OrderSidebar = async () => {
  const categories = await getCategories();
  // console.log(categories);

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <nav className=" mt-10">
        {categories.map((category) => (
          <CategoryIcon
            key={category.id}
            category={category}
          />
        ))}
      </nav>
    </aside>
  );
};

export default OrderSidebar;
