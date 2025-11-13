import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import googleImg from "../assets/google.png";
import { AuthContext } from "../Contexts/RootContext";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../Components/Utils/Loading";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
      const {  signInUser, googleSignUser } = useContext(AuthContext);
      const navigate = useNavigate();
      const [loading, setLoading] = useState(false);
      const [showPassword, setShowPassword] = useState(false);

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
                  toast.success("Login Successful");
                  setTimeout(() => {
                        navigate("/challenges");
                  }, 2000);
            } catch (error) {
                  toast.error(error.message || "Login Failed. Try again");
                  setError(error.message || "Login Failed. Try again");
            } finally {
                  setLoading(false);
            }
      };

      // Google sign in
      const handleGoogleSign = async () => {
            setLoading(true);
            try {
                  await googleSignUser();
                  toast.success("Login Successful");
                  setTimeout(() => {
                        navigate("/challenges");
                  }, 2000);
            } catch (error) {
                  toast.error(error.message || "Login Failed");
                  setError(error.message || "Login Failed");
            } finally {
                  setLoading(false);
            }
      };

      if (loading) return <Loading />;

      return (
            <>
                  <ToastContainer />
                  <main className="w-full h-screen flex items-center justify-center bg-green-50">
                        <section className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                              <div className="text-center mb-6">
                                    <h2 className="text-2xl font-semibold text-green-700">Login to EcoTrack</h2>
                                    <p className="text-gray-600 mt-1">Join the community making a difference</p>
                              </div>

                              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                                    <div>
                                          <label className="text-green-700 font-medium mb-1 block" htmlFor="email">
                                                Email
                                          </label>
                                          <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your email"
                                                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                          />
                                    </div>

                                    <div className="relative">
                                          <label className="text-green-700 font-medium flex justify-between mb-1">
                                                <span>Password</span>
                                                <Link
                                                      to="/forget-password"
                                                      className="text-sm text-green-600 underline hover:text-green-700"
                                                >
                                                      Forgot Password?
                                                </Link>
                                          </label>
                                          <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                required
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                                          />
                                          <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-12 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                          >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                          </button>
                                    </div>

                                    <button
                                          type="submit"
                                          disabled={loading}
                                          className="w-full bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                          {loading ? "Logging in..." : "Login"}
                                    </button>
                              </form>

                              <div className="mt-6 flex flex-col items-center gap-3">
                                    <button
                                          onClick={handleGoogleSign}
                                          disabled={loading}
                                          className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 transition py-2 px-4 rounded-xl w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                          <img src={googleImg} alt="Google" className="w-6" />
                                          Continue with Google
                                    </button>

                                    <p className="text-sm text-gray-700">
                                          Don't have an account?{" "}
                                          <Link
                                                to="/register"
                                                className="text-green-600 font-semibold underline hover:text-green-700"
                                          >
                                                Register
                                          </Link>
                                    </p>
                              </div>
                        </section>
                  </main>
            </>
      );
};

export default SignIn;
