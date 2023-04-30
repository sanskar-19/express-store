import AddNewCategory from "@/features/products/AddNewCategory";
import FetchAllCategories from "@/features/products/FetchAllCategories";

export default function Categories() {
  return (
    <main className="flex min-h-screen w-full max-w-7xl bg-backgroundColor mx-auto flex-col items-start py-8">
      <h2 className="relative  text-3xl  sm:text-6xl font-bold text-center w-full mb-8">
        CATEGORIES
      </h2>
      <section className="relative w-[calc(100%-1rem)] mx-auto flex flex-wrap gap-x-8 gap-y-8 h-max justify-center">
        <div className="w-full max-w-full flex flex-col gap-y-8">
          <FetchAllCategories />
          <AddNewCategory />
        </div>
      </section>
    </main>
  );
}
