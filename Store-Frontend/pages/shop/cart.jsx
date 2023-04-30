import CreateNewOrder from "@/features/products/CreateNewOrder";
import FetchCartItems from "@/features/products/FetchCartItems";
import { useRouter } from "next/router";

export default function Categories() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full max-w-7xl bg-backgroundColor mx-auto flex-col items-start py-8">
      <h2 className="relative text-6xl font-bold text-center w-full mb-8">
        CART
      </h2>
      <section className="relative w-[calc(100%-1rem)] mx-auto flex flex-wrap gap-x-8  h-max">
        <div className="w-full max-w-full flex flex-col gap-y-8">
          <FetchCartItems />
        </div>
        <CreateNewOrder />
      </section>
    </main>
  );
}
