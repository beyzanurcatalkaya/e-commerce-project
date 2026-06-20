import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import api from "../services/api";
import { fetchRolesIfNeeded } from "../store/actions/clientActions";

function Signup() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.client.roles);

  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    shouldUnregister: true,
  });

  const selectedRoleId = watch("role_id");
  const password = watch("password");

  useEffect(() => {
    async function loadRoles() {
      try {
        setRolesLoading(true);
        setRolesError("");

        await dispatch(fetchRolesIfNeeded());
      } catch (error) {
        setRolesError("Roller alınamadı. Lütfen daha sonra tekrar deneyin.");
      } finally {
        setRolesLoading(false);
      }
    }

    loadRoles();
  }, [dispatch]);

  useEffect(() => {
    if (roles.length > 0 && !selectedRoleId) {
      const customerRole =
        roles.find((role) =>
          String(role.name || role.code || role.role || "")
            .toLowerCase()
            .includes("customer")
        ) || roles[0];

      setValue("role_id", String(customerRole.id));
    }
  }, [roles, selectedRoleId, setValue]);

  const selectedRole = useMemo(() => {
    return roles.find((role) => String(role.id) === String(selectedRoleId));
  }, [roles, selectedRoleId]);

  const isStoreRole = useMemo(() => {
    const roleText = String(
      selectedRole?.name || selectedRole?.code || selectedRole?.role || ""
    ).toLowerCase();

    return roleText.includes("store");
  }, [selectedRole]);

  const getErrorMessage = (error) => {
    const backendMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.response?.data;

    if (typeof backendMessage === "string") {
      return backendMessage;
    }

    return "Kayıt işlemi başarısız oldu. Bilgileri kontrol edip tekrar deneyin.";
  };

  const onSubmit = async (formData) => {
    setSubmitError("");

    const basePayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: Number(formData.role_id),
    };

    let payload = basePayload;

    if (isStoreRole) {
      payload = {
        ...basePayload,
        store: {
          name: formData.store.name,
          phone: formData.store.phone.replace(/\s|-/g, ""),
          tax_no: formData.store.tax_no,
          bank_account: formData.store.bank_account
            .replace(/\s/g, "")
            .toUpperCase(),
        },
      };
    }

    try {
      await api.post("/signup", payload);

      toast.warn("You need to click link in email to activate your account!");

      const previousPath = location.state?.from?.pathname || "/";
      history.push(previousPath);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    }
  };

  return (
    <main className="w-full bg-white">
      <section className="w-full py-[70px]">
        <div className="max-w-[720px] mx-auto px-4">
          <div className="text-center mb-[40px]">
            <h1 className="text-[#252B42] text-[40px] leading-[50px] font-bold mb-[10px]">
              Create Account
            </h1>

            <p className="text-[#737373] text-[14px] leading-[20px]">
              Sign up to continue shopping with Bandage.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-[#E6E6E6] rounded-[10px] p-[30px] shadow-sm"
          >
            {rolesError && (
              <div className="mb-[20px] rounded-[5px] bg-red-50 p-[12px] text-red-600 text-[14px]">
                {rolesError}
              </div>
            )}

            {submitError && (
              <div className="mb-[20px] rounded-[5px] bg-red-50 p-[12px] text-red-600 text-[14px]">
                {submitError}
              </div>
            )}

            <div className="grid grid-cols-1 gap-[20px]">
              <div>
                <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                  Name
                </label>

                <input
                  type="text"
                  className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42]"
                  {...register("name", {
                    required: "Name alanı zorunludur.",
                    minLength: {
                      value: 3,
                      message: "Name en az 3 karakter olmalıdır.",
                    },
                  })}
                />

                {errors.name && (
                  <p className="mt-[6px] text-red-500 text-[13px]">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                  Email
                </label>

                <input
                  type="email"
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
                  className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42]"
                  {...register("password", {
                    required: "Password alanı zorunludur.",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                      message:
                        "Password en az 8 karakter; büyük harf, küçük harf, rakam ve özel karakter içermelidir.",
                    },
                  })}
                />

                {errors.password && (
                  <p className="mt-[6px] text-red-500 text-[13px]">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                  Password Validation
                </label>

                <input
                  type="password"
                  className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42]"
                  {...register("passwordValidation", {
                    required: "Password validation alanı zorunludur.",
                    validate: (value) =>
                      value === password || "Şifreler eşleşmelidir.",
                  })}
                />

                {errors.passwordValidation && (
                  <p className="mt-[6px] text-red-500 text-[13px]">
                    {errors.passwordValidation.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                  Role
                </label>

                <select
                  disabled={rolesLoading}
                  className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42] bg-white"
                  {...register("role_id", {
                    required: "Role seçimi zorunludur.",
                  })}
                >
                  {rolesLoading && <option>Loading roles...</option>}

                  {!rolesLoading &&
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name || role.code || role.role}
                      </option>
                    ))}
                </select>

                {errors.role_id && (
                  <p className="mt-[6px] text-red-500 text-[13px]">
                    {errors.role_id.message}
                  </p>
                )}
              </div>

              {isStoreRole && (
                <div className="mt-[10px] border border-[#E6E6E6] rounded-[8px] p-[20px]">
                  <h2 className="text-[#252B42] text-[20px] leading-[30px] font-bold mb-[20px]">
                    Store Information
                  </h2>

                  <div className="grid grid-cols-1 gap-[20px]">
                    <div>
                      <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                        Store Name
                      </label>

                      <input
                        type="text"
                        className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42]"
                        {...register("store.name", {
                          required: "Store Name zorunludur.",
                          minLength: {
                            value: 3,
                            message:
                              "Store Name en az 3 karakter olmalıdır.",
                          },
                        })}
                      />

                      {errors.store?.name && (
                        <p className="mt-[6px] text-red-500 text-[13px]">
                          {errors.store.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                        Store Phone
                      </label>

                      <input
                        type="text"
                        placeholder="05XXXXXXXXX or +905XXXXXXXXX"
                        className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42]"
                        {...register("store.phone", {
                          required: "Store Phone zorunludur.",
                          validate: (value) => {
                            const normalized = value.replace(/\s|-/g, "");

                            return (
                              /^(?:\+90|0)?[2-5]\d{9}$/.test(normalized) ||
                              "Geçerli bir Türkiye telefon numarası giriniz."
                            );
                          },
                        })}
                      />

                      {errors.store?.phone && (
                        <p className="mt-[6px] text-red-500 text-[13px]">
                          {errors.store.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                        Store Tax ID
                      </label>

                      <input
                        type="text"
                        placeholder="TXXXXVXXXXXX"
                        className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42]"
                        {...register("store.tax_no", {
                          required: "Store Tax ID zorunludur.",
                          pattern: {
                            value: /^T\d{4}V\d{6}$/,
                            message:
                              "Tax ID formatı TXXXXVXXXXXX olmalıdır.",
                          },
                        })}
                      />

                      {errors.store?.tax_no && (
                        <p className="mt-[6px] text-red-500 text-[13px]">
                          {errors.store.tax_no.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[#252B42] text-[14px] font-bold mb-[8px]">
                        Store Bank Account
                      </label>

                      <input
                        type="text"
                        placeholder="TR..."
                        className="w-full h-[50px] border border-[#DDDDDD] rounded-[5px] px-[16px] outline-none text-[#252B42]"
                        {...register("store.bank_account", {
                          required: "Store Bank Account zorunludur.",
                          validate: (value) => {
                            const normalized = value
                              .replace(/\s/g, "")
                              .toUpperCase();

                            return (
                              /^TR\d{24}$/.test(normalized) ||
                              "Geçerli bir Türkiye IBAN adresi giriniz."
                            );
                          },
                        })}
                      />

                      {errors.store?.bank_account && (
                        <p className="mt-[6px] text-red-500 text-[13px]">
                          {errors.store.bank_account.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || rolesLoading}
                className="w-full h-[52px] bg-[#23A6F0] text-white rounded-[5px] text-[14px] leading-[22px] font-bold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-[10px]"
              >
                {isSubmitting && (
                  <span className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}

                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Signup;