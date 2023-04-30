import { formatDate } from "@/globals";
import {
  ADD_TO_CART,
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_PRODUCTS,
} from "@/services/shop.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";
const FetchAllProducts = () => {
  const [dataItems, setDataItems] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [valid, setValid] = useState(false);
  const router = useRouter();
  const fetchData = async () => {
    try {
      await FETCH_ALL_PRODUCTS(setDataItems);
      setValid(true);
    } catch (error) {
      if (error.statusCode == 401) {
        console.log(error);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
      toast.error(error?.error);
    }
  };
  useEffect(() => {
    setValid(false);
    fetchData();
  }, [refresh]);

  async function handleAddToCart(id) {
    try {
      let apiResponse = await ADD_TO_CART(id);
      toast.success(apiResponse.data.message);
    } catch (error) {
      if (error.statusCode == 401) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
      toast.error(error?.error);
    }
  }
  return (
    <main className="relative w-full flex flex-col gap-y-2 h-full overflow-x-scroll scrollbar max-h-1/2">
      <button
        className="call-to-actions"
        onClick={() => setRefresh(!refresh)}
        disabled={!valid}
      >
        Refresh
      </button>
      <fieldset className="flex flex-col gap-y-2 border-textColor">
        {/* <legend className="text-2xl font-semibold text-left">Products</legend> */}
        <div className="relative w-full flex gap-x-4 flex-grow bg-focusColor px-4 py-2 rounded-md">
          <div className="relative w-1/6  text-ellipsis whitespace-nowrap overflow-hidden font-medium">
            Product Id
          </div>
          <div className="relative w-1/6 text-ellipsis whitespace-nowrap overflow-hidden font-medium">
            Name
          </div>

          <div className="relative w-1/6  text-ellipsis whitespace-nowrap overflow-hidden font-medium">
            Category
          </div>
          <div className="relative w-1/6 text-center text-ellipsis whitespace-nowrap overflow-hidden font-medium">
            Price
          </div>
          <div className="relative w-1/6  text-ellipsis whitespace-nowrap overflow-hidden font-medium">
            Created at
          </div>
        </div>
        {dataItems && dataItems?.length ? (
          dataItems.map((productItem) => {
            return (
              <div
                className="relative w-full flex gap-x-4 flex-grow bg-focusColor items-center  px-4 py-2 rounded-md"
                key={productItem?.id}
              >
                <div
                  className="relative w-1/6  text-ellipsis whitespace-nowrap overflow-hidden"
                  onClick={async (e) => {
                    await navigator.clipboard.writeText(productItem?.id);
                    toast.success("Copied to board");
                  }}
                  role="button"
                >
                  {productItem?.id}
                </div>
                <div className="relative w-1/6  text-ellipsis whitespace-nowrap overflow-hidden">
                  {productItem?.name}
                </div>

                <div
                  className="relative w-1/6  text-ellipsis whitespace-nowrap overflow-hidden"
                  onClick={async (e) => {
                    await navigator.clipboard.writeText(
                      productItem?.category_id
                    );
                    toast.success("Copied to board");
                  }}
                  role="button"
                >
                  {productItem?.category_id}
                </div>
                <div className="relative w-1/6 text-center text-ellipsis whitespace-nowrap overflow-hidden">
                  {productItem?.price}
                </div>
                <div className="relative w-1/6  text-ellipsis whitespace-nowrap overflow-hidden">
                  {formatDate(Date(productItem?.created_at))}
                </div>
                <div className="relative text-ellipsis whitespace-nowrap overflow-hidden">
                  <button
                    className="bg-accentColor p-2 rounded-md text-white flex justify-center items-center"
                    onClick={() => {
                      handleAddToCart(productItem?.id);
                    }}
                  >
                    <FaCartPlus />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="relative w-full flex gap-x-4 flex-grow bg-focusColor  px-4 py-2 rounded-md">
            No products available yet
          </div>
        )}
      </fieldset>
    </main>
  );
};

export default FetchAllProducts;
