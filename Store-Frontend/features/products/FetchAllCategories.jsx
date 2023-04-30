import { formatDate } from "@/globals";
import { FETCH_ALL_CATEGORIES } from "@/services/shop.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FetchAllCategories = () => {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [valid, setValid] = useState(false);
  const [dataItems, setDataItems] = useState(null);
  const fetchData = async () => {
    try {
      await FETCH_ALL_CATEGORIES(setDataItems);
      setValid(true);
    } catch (error) {
      if (error.statusCode == 401) {
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
    <main className="relative w-full flex flex-col gap-y-2  overflow-x-scroll scrollbar">
      <button
        className="call-to-actions"
        onClick={() => setRefresh(!refresh)}
        disabled={!valid}
      >
        Refresh
      </button>
      <fieldset className="flex flex-col gap-y-2  rounded-md">
        {/* <legend className="text-2xl font-semibold text-left">Categories</legend> */}
        <div className="relative w-full flex gap-x-4 flex-grow bg-focusColor px-4 py-2 rounded-md">
          <div className="relative w-1/3  flex-wrap text-ellipsis font-medium flex-grow">
            Category Id
          </div>
          <div className="relative w-1/3  flex-wrap text-ellipsis font-medium flex-grow">
            Name
          </div>
          <div className="relative w-1/6  flex-wrap text-ellipsis font-medium">
            Created On
          </div>
        </div>
        {dataItems && dataItems?.length ? (
          dataItems.map((categoryItem) => {
            return (
              <div
                className="relative w-full flex gap-x-4 flex-grow bg-focusColor  px-4 py-2 rounded-md"
                key={categoryItem?.category_id}
              >
                <div
                  className="relative w-1/3 whitespace-nowrap overflow-hidden text-ellipsis flex-grow"
                  onClick={async (e) => {
                    await navigator.clipboard.writeText(
                      categoryItem?.category_id
                    );
                    toast.success("Copied to board");
                  }}
                  role="button"
                >
                  {categoryItem?.category_id}
                </div>
                <div className="relative w-1/3 overflow-hidden text-ellipsis flex-grow">
                  {categoryItem?.name}
                </div>
                <div className="relative w-1/6 text-ellipsis">
                  {formatDate(Date(categoryItem?.created_at))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="relative w-full flex gap-x-4 flex-grow bg-focusColor  px-4 py-2 rounded-md ">
            No categories available yet
          </div>
        )}
      </fieldset>
    </main>
  );
};

export default FetchAllCategories;
