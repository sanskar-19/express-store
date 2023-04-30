import schema from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { REGISTER_NEW_USER } from "@/services/auth.service";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema.register), mode: "all" });
  const router = useRouter();
  // Handle new user registeration
  const HandleRegister = async (data) => {
    console.log(data);
    // Call new user registration API
    try {
      let apiResponse = await REGISTER_NEW_USER(data);
      console.log(apiResponse);
      toast.success(apiResponse.data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error?.error);
    }
  };

  return (
    <main className="flex min-h-screen w-full max-w-7xl bg-backgroundColor mx-auto flex-col items-center justify-center">
      <fieldset className="relative w-[calc(100%-1rem)] max-w-[400px] border-textColor border-2 rounded-md px-4 py-4 mx-auto flex justify-center items-center">
        <legend className="text-2xl font-semibold text-right">Register</legend>
        <form
          onSubmit={handleSubmit(HandleRegister)}
          className="onboarding-forms"
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
            <p className="input-error-message">
              {errors?.email?.message ?? " "}
            </p>
          </div>

          <div className="field-wrapper">
            <label htmlFor="password" className="field-label">
              Password
            </label>
            <input
              {...register("password")}
              className="field-input"
              type="password"
              placeholder="example@12345"
            />
            <p className="input-error-message">
              {errors?.password?.message ?? " "}
            </p>
          </div>

          <div className="field-wrapper">
            <button
              className="call-to-actions"
              type="submit"
              disabled={!isValid}
            >
              Register
            </button>
            <Link
              href={"/login"}
              className="text-accentColor underline underline-offset-2 mt-4"
            >
              Already registered? Click here to login
            </Link>
          </div>
        </form>
      </fieldset>
    </main>
  );
}
