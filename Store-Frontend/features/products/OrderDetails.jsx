import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
const OrderDetails = ({ order }) => {
  return (
    <main className="flex min-h-screen w-full max-w-7xl bg-backgroundColor mx-auto flex-col items-start py-8">
      <h2 className="relative text-3xl  sm:text-6xl items-center justify-center font-bold text-center text-approvedColor w-full mb-8 flex">
        <FaCheckCircle />{" "}
        <span className="ml-2 text-textColor">ORDER DETAILS</span>
      </h2>
      <section className="relative w-[calc(100%-1rem)] mx-auto flex flex-wrap gap-x-8 flex-col gap-y-5 p-4 rounded-md border-2 border-textColor h-max">
        <div className="flex w-full justify-center flex-col">
          <h3 className="text-xl font-semibold uppercase w-max">Order Id : </h3>
          <p className="font-medium"> #{order?.order_id}</p>
        </div>
        <div className="flex w-full justify-center flex-col">
          <h3 className="text-xl font-semibold uppercase w-max">Email Id : </h3>
          <p className="font-medium"> {order?.email}</p>
        </div>
        <div className="flex w-full justify-center flex-col">
          <h3 className="text-xl font-semibold uppercase w-max">Address : </h3>
          <p className="font-medium"> {order?.address}</p>
        </div>
      </section>
      <section className="relative flex flex-col gap-y-2 w-full mt-8 rounded-md">
        <div className="relative w-full flex gap-x-4 flex-grow bg-accentColor text-white px-4 py-2 rounded-md">
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
        {order?.details?.map((orderItem, index) => {
          return (
            <div
              className="relative w-full flex gap-x-4 flex-grow bg-accentColor text-white  px-4 py-2 rounded-md"
              key={orderItem?.id}
            >
              <div className="relative w-1/12  text-ellipsis whitespace-nowrap overflow-hidden">
                {index + 1}
              </div>
              <div
                className="relative w-1/3  text-ellipsis whitespace-nowrap overflow-hidden flex-grow"
                onClick={async (e) => {
                  await navigator.clipboard.writeText(orderItem?.id);
                  toast.success("Copied to board");
                }}
                role="button"
              >
                {orderItem?.id}
              </div>
              <div className="relative w-1/5  text-ellipsis whitespace-nowrap overflow-hidden flex-grow">
                {orderItem?.name}
              </div>
              <div className="relative w-1/5 text-center text-ellipsis whitespace-nowrap overflow-hidden">
                {orderItem?.price}
              </div>
            </div>
          );
        })}
        <Link href={"/shop"}>
          <button className="call-to-actions">Back to shop</button>
        </Link>
      </section>
    </main>
  );
};

export default OrderDetails;
