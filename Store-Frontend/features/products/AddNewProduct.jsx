import schema from "@/schemas/store.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ADD_NEW_PRODUCT } from "@/services/shop.service";

export default function AddNewProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema.product), mode: "all" });
  const router = useRouter();
  // Handle new product addition
  const HandleAddNewProduct = async (data) => {
    console.log(data);
    // Call addproduct user
    try {
      let apiResponse = await ADD_NEW_PRODUCT(data);
      toast.success(apiResponse.data.message);
    } catch (error) {
      if (error.statusCode == 401) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
      toast.error(error?.error);
    }
  };

  return (
    <main className="flex w-full h-full max-w-7xl bg-backgroundColor mx-auto flex-col items-center justify-center">
      <fieldset className="relative w-[calc(100%)] h-full mx-auto flex items-center border-textColor border-2 rounded-md px-4 py-4">
        {/* <fieldset className="flex flex-col gap-y-2 border-textColor border-2 rounded-md px-4 py-4"> */}
        <legend className="text-2xl font-semibold text-right">
          Add New Product
        </legend>
        <form
          onSubmit={handleSubmit(HandleAddNewProduct)}
          className="onboarding-forms"
        >
          <div className="field-wrapper">
            <label htmlFor="name" className="field-label">
              Name
            </label>
            <input
              {...register("name")}
              className="field-input"
              placeholder="XYZ"
            />
            <p className="input-error-message">
              {errors?.name?.message ?? " "}
            </p>
          </div>

          <div className="field-wrapper">
            <label htmlFor="price" className="field-label">
              Price
            </label>
            <input
              {...register("price")}
              className="field-input"
              placeholder="20"
            />
            <p className="input-error-message">
              {errors?.price?.message ?? " "}
            </p>
          </div>
          <div className="field-wrapper">
            <label htmlFor="category" className="field-label">
              Category
            </label>
            <input
              {...register("category")}
              className="field-input"
              placeholder="xxxxxxxx-xxxxxxxx-xxxxxx"
            />
            <p className="input-error-message">
              {errors?.category?.message ?? " "}
            </p>
          </div>

          <div className="field-wrapper">
            <button
              className="call-to-actions"
              type="submit"
              disabled={!isValid}
            >
              Create
            </button>
          </div>
        </form>
      </fieldset>
    </main>
  );
}
