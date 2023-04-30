import schema from "@/schemas/store.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ADD_NEW_CATEGORY } from "@/services/shop.service";

export default function AddNewCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema.category), mode: "all" });
  const router = useRouter();
  // Handle new Category addition
  const HandleAddNewCategory = async (data) => {
    console.log(data);
    // Call addCategory user
    try {
      let apiResponse = await ADD_NEW_CATEGORY(data);
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
    <main className="flex w-full max-w-7xl bg-backgroundColor mx-auto flex-col items-center justify-center">
      <fieldset className="relative w-[calc(100%)] mx-auto flex items-center border-textColor border-2 rounded-md px-4 py-4">
        {/* <fieldset className="flex flex-col gap-y-2 border-textColor border-2 rounded-md px-4 py-4"> */}
        <legend className="text-2xl font-semibold text-right">
          Add New Category
        </legend>
        <form
          onSubmit={handleSubmit(HandleAddNewCategory)}
          className="onboarding-forms"
        >
          <div className="field-wrapper">
            <label htmlFor="name" className="field-label">
              Category Name
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
