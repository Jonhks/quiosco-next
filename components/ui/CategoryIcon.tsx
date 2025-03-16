"use client";
import { Category } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};

const CategoryIcon = ({ category }: CategoryIconProps) => {
  const params = useParams<{ category: string }>();

  return (
    <Link
      href={`/order/${category.slug}`}
      className=" text-xl font-bold hover:cursor-pointer"
    >
      <div
        className={` hover:bg-amber-50 ${
          category.slug === params.category && "bg-amber-400 hover:bg-amber-400"
        } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
      >
        <div className=" w-16 h-16 relative">
          <Image
            src={`/icon_${category.slug}.svg`}
            alt={category.slug}
            fill
          />
        </div>
        {category.name}
      </div>
    </Link>
  );
};

export default CategoryIcon;
