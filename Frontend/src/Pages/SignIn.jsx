import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/RootContext";
import { useNavigate } from "react-router";
import InputField from "../Components/Auth/InputField";
import PasswordInput from "../Components/Auth/PasswordInput";
import GoogleSignInButton from "../Components/Auth/GoogleSignInButton";
import { toast, ToastContainer } from "react-toastify";
import { getAuth } from "firebase/auth";

const SignIn = () => {
      const { signInUser, googleSignUser } = useContext(AuthContext);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user);

      const [formData, setFormData] = useState({
            email: "",
            password: "",
      });
      const [error, setError] = useState({});

      const validateForm = () => {
            const newErrors = {};
            if (!formData.email) {
                  newErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                  newErrors.email = "Email is invalid";
            }
            if (!formData.password) {
                  newErrors.password = "Password is required";
            } else if (formData.password.length < 6) {
                  newErrors.password = "Password must be at least 6 characters";
            }
            setError(newErrors);
            return Object.keys(newErrors).length === 0;
      };

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevState) => ({
                  ...prevState,
                  [name]: value,
            }));
            if (error[name]) {
                  setError((prev) => ({ ...prev, [name]: "" }));
            }
      };

      const handleFormSubmit = async (e) => {
            e.preventDefault();
            if (!validateForm()) return;

            setLoading(true);
            try {
                  await signInUser(formData.email, formData.password);
                  toast.success("Login Successful!");
                  navigate("/challenges");
            } catch (error) {
                  let message = "Login failed. Please try again.";
                  if (error.code) {
                        switch (error.code) {
                              case "auth/invalid-email":
                                    message = "Invalid email address.";
                                    break;
                              case "auth/user-not-found":
                                    message = "No account found with this email.";
                                    break;
                              case "auth/wrong-password":
                                    message = "Incorrect password. Please try again.";
                                    break;
                              case "auth/too-many-requests":
                                    message = "Too many attempts. Please wait and try again.";
                                    break;
                        }
                  }
                  toast.error(message);
                  setError({ general: message });
            } finally {
                  setLoading(false);
            }
      };

      const handleGoogleSign = () => {
            setLoading(true);
            googleSignUser()
                  .then(() => {
                        toast.success("Login Successfull");
                        setLoading(false);

                        navigate("/challenges");
                  })
                  .catch((error) => {
                        setError({ general: error.message || "Login Failed" });
                        toast.error(error.message);

                        setLoading(false);
                  });
      };

      return (
            <>
                  <ToastContainer autoClose={500} />
                  <main className="w-full h-screen flex items-center justify-center bg-green-50">
                        <section className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                              <div className="text-center mb-6">
                                    <h2 className="text-2xl font-semibold text-green-700">Login to EcoTrack</h2>
                                    <p className="text-gray-600 mt-1">Join the community making a difference</p>
                              </div>

                              <div className="flex flex-col gap-5">
                                    <InputField
                                          label="Email"
                                          type="email"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                          placeholder="Enter your email"
                                          error={error.email}
                                          required
                                    />

                                    <PasswordInput
                                          label="Password"
                                          name="password"
                                          value={formData.password}
                                          onChange={handleChange}
                                          placeholder="Enter your password"
                                          error={error.password}
                                          required
                                          showForgot={true}
                                          onForgotClick={() =>
                                                navigate("/forget-password", { state: { email: formData.email } })
                                          }
                                    />

                                    {error.general && <p className="text-red-500 text-sm">{error.general}</p>}

                                    <button
                                          onClick={handleFormSubmit}
                                          disabled={loading}
                                          className="w-full bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                          {loading ? "Logging in..." : "Login"}
                                    </button>
                              </div>

                              <div className="mt-6 flex flex-col items-center gap-3">
                                    <GoogleSignInButton
                                          onClick={handleGoogleSign}
                                          disabled={loading}
                                          loading={loading}
                                    />

                                    <p className="text-sm text-gray-700">
                                          Don't have an account?{" "}
                                          <button
                                                onClick={() => navigate("/register")}
                                                className="text-green-600 cursor-pointer font-semibold underline hover:text-green-700"
                                          >
                                                Register
                                          </button>
                                    </p>
                              </div>
                        </section>
                  </main>
            </>
      );
};
export default SignIn;
