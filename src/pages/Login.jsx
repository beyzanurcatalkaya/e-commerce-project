import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../store/actions/clientActions";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const getErrorMessage = (error) => {
    const backendMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.response?.data;

    if (typeof backendMessage === "string") {
      return backendMessage;
    }

    return "Login failed. Please check your email and password.";
  };

  const onSubmit = async (formData) => {
    try {
      await dispatch(
        loginUser(
          {
            email: formData.email,
            password: formData.password,
          },
          formData.rememberMe
        )
      );

      const previousPath = location.state?.from?.pathname || "/";

      toast.success("Login successful!");

      history.push(previousPath);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <main className="w-full bg-white">
      <section className="w-full py-[70px]">
        <div className="max-w-[520px] mx-auto px-4">
          <div className="text-center mb-[40px]">
            <h1 className="text-[#252B42] text-[40px] leading-[50px] font-bold mb-[10px]">
              Login
            </h1>

            <p className="text-[#737373] text-[14px] leading-[20px]">
              Login to continue shopping with Bandage.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-[#E6E6E6] rounded-[10px] p-[30px] shadow-sm"
          >
            <div className="grid grid-cols-1 gap-[20px]">
              <div>
                <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="customer@commerce.com"
                  className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42]"
                  {...register("email", {
                    required: "Email alanı zorunludur.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Geçerli bir email adresi giriniz.",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-[6px] text-red-500 text-[13px]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="123456"
                  className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42]"
                  {...register("password", {
                    required: "Password alanı zorunludur.",
                  })}
                />

                {errors.password && (
                  <p className="mt-[6px] text-red-500 text-[13px]">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-[10px] text-[#737373] text-[14px] leading-[24px] font-bold">
                <input
                  type="checkbox"
                  className="w-[16px] h-[16px]"
                  {...register("rememberMe")}
                />
                Remember me
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[52px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[22px] font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-[10px]"
              >
                {isSubmitting && (
                  <span className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}

                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-[#737373] text-[14px] leading-[24px]">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-[#23A6F0] font-bold">
                  Sign up
                </Link>
              </p>

         
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;