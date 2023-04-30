import { formatDate } from "@/globals";
import { FETCH_ALL_USERS } from "@/services/auth.service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FetchAllUsers = () => {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [valid, setValid] = useState(false);
  const [dataItems, setDataItems] = useState(null);
  const fetchData = async () => {
    try {
      await FETCH_ALL_USERS(setDataItems);
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
      <fieldset className="flex flex-col gap-y-2 border-textColor ">
        {/* <legend className="text-2xl font-semibold text-left">Categories</legend> */}
        <div className="relative w-full flex gap-x-4 flex-grow bg-focusColor px-4 py-2 rounded-md">
          <div className="relative w-1/3  flex-wrap text-ellipsis font-medium flex-grow">
            User Id
          </div>
          <div className="relative w-1/3  flex-wrap text-ellipsis font-medium flex-grow">
            Email
          </div>
          <div className="relative w-1/5  flex-wrap text-ellipsis font-medium">
            Created On
          </div>
          <div className="relative w-1/5 flex-wrap text-ellipsis font-medium">
            Updated On
          </div>
        </div>
        {dataItems && dataItems?.length ? (
          dataItems.map((userItem) => {
            return (
              <div
                className="relative w-full flex gap-x-4 flex-grow bg-focusColor  px-4 py-2 rounded-md"
                key={userItem?.user_id}
              >
                <div
                  className="relative w-1/3 whitespace-nowrap overflow-hidden text-ellipsis flex-grow"
                  onClick={async (e) => {
                    await navigator.clipboard.writeText(userItem?.user_id);
                    toast.success("Copied to board");
                  }}
                  role="button"
                >
                  {userItem?.user_id}
                </div>
                <div className="relative w-1/3 overflow-hidden text-ellipsis flex-grow">
                  {userItem?.email}
                </div>
                <div className="relative w-1/5 text-ellipsis">
                  {formatDate(Date(userItem?.created_at))}
                </div>
                <div className="relative w-1/5 text-ellipsis">
                  {formatDate(Date(userItem?.updated_at))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="relative w-full flex gap-x-4 flex-grow bg-focusColor  px-4 py-2 rounded-md ">
            No users found
          </div>
        )}
      </fieldset>
    </main>
  );
};

export default FetchAllUsers;
