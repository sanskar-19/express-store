import AddNewCategory from "@/features/products/AddNewCategory";
import AddNewProduct from "@/features/products/AddNewProduct";
import FetchAllCategories from "@/features/products/FetchAllCategories";
import FetchAllProducts from "@/features/products/FetchAllProducts";

export default function Products() {
  return (
    <main className="flex min-h-screen w-full max-w-7xl bg-backgroundColor mx-auto flex-col items-start py-8">
      <h2 className="relative  text-3xl  sm:text-6xl  font-bold text-center w-full mb-8">
        PRODUCTS
      </h2>
      <section className="relative w-[calc(100%-1rem)] mx-auto flex flex-wrap gap-x-8 gap-y-8 h-max justify-center">
        <div className="w-full max-w-full flex flex-col gap-y-8">
          <FetchAllProducts />
          <AddNewProduct />
        </div>
      </section>
    </main>
  );
}
