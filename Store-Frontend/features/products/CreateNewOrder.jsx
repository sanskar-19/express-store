import schema from "@/schemas/store.schema";
import { CREATE_ORDER } from "@/services/shop.service";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
const CreateNewOrder = ({ setOrder }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema.order), mode: "all" });
  const router = useRouter();
  async function handleCreateOrder(payload) {
    try {
      let apiResponse = await CREATE_ORDER(payload);
      setOrder(apiResponse?.data);
      toast.success(apiResponse?.data?.message);
    } catch (error) {
      if (error.statusCode == 401) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
      console.log(error);
      toast.error(error?.error ?? error?.message);
    }
  }
  const handleSubmitOrder = (data) => {
    console.log(data);
    handleCreateOrder(data);
  };
  return (
    <fieldset className="relative w-[calc(100%-1rem)] max-w-[400px] border-textColor border-2 rounded-md px-4 py-4 ml-auto flex justify-center items-center">
      <legend className="text-2xl font-semibold text-right">New Order</legend>

      <form
        onSubmit={handleSubmit(handleSubmitOrder)}
        className="onboarding-forms "
      >
        <div className="field-wrapper">
          <label htmlFor="email" className="field-label">
            Email
          </label>
          <input
            {...register("email")}
            className="field-input"
            placeholder="user@example.com"
          />
          <p className="input-error-message">{errors?.email?.message ?? " "}</p>
        </div>

        <div className="field-wrapper">
          <label htmlFor="address" className="field-label">
            Address
          </label>
          <input
            {...register("address")}
            className="field-input"
            placeholder="area; city; state;"
          />
          <p className="input-error-message">
            {errors?.address?.message ?? " "}
          </p>
        </div>

        <div className="field-wrapper">
          <button className="call-to-actions" type="submit" disabled={!isValid}>
            Create Order
          </button>
        </div>
      </form>
    </fieldset>
  );
};

export default CreateNewOrder;
