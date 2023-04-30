import { formatDate } from "@/globals";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa";
import { FETCH_CART_ITEMS } from "@/services/shop.service";
const FetchCartItems = () => {
  const [dataItems, setDataItems] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [valid, setValid] = useState(false);
  const router = useRouter();
  const fetchData = async () => {
    try {
      await FETCH_CART_ITEMS(setDataItems);
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
          <div className="relative w-1/12 text-ellipsis whitespace-nowrap overflow-hidden font-medium">
            Sno
          </div>
          <div className="relative w-1/3 text-ellipsis whitespace-nowrap overflow-hidden font-medium flex-grow">
            Product Id
          </div>
          <div className="relative w-1/5 text-ellipsis whitespace-nowrap overflow-hidden font-medium flex-grow">
            Name
          </div>
          <div className="relative w-1/5 text-center text-ellipsis whitespace-nowrap overflow-hidden font-medium">
            Price
          </div>
        </div>
        {dataItems && dataItems?.length ? (
          dataItems.map((cartItem, index) => {
            return (
              <div
                className="relative w-full flex gap-x-4 flex-grow bg-focusColor  px-4 py-2 rounded-md"
                key={cartItem?.id}
              >
                <div className="relative w-1/12  text-ellipsis whitespace-nowrap overflow-hidden">
                  {index + 1}
                </div>
                <div
                  className="relative w-1/3  text-ellipsis whitespace-nowrap overflow-hidden flex-grow"
                  onClick={async (e) => {
                    await navigator.clipboard.writeText(cartItem?.id);
                    toast.success("Copied to board");
                  }}
                  role="button"
                >
                  {cartItem?.id}
                </div>
                <div className="relative w-1/5  text-ellipsis whitespace-nowrap overflow-hidden flex-grow">
                  {cartItem?.name}
                </div>
                <div className="relative w-1/5 text-center text-ellipsis whitespace-nowrap overflow-hidden">
                  {cartItem?.price}
                </div>
              </div>
            );
          })
        ) : (
          <div className="relative w-full flex gap-x-4 flex-grow bg-focusColor  px-4 py-2 rounded-md">
            Nothing in cart to show
          </div>
        )}
      </fieldset>
    </main>
  );
};

export default FetchCartItems;
