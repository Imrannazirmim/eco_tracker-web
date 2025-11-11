import { use, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Contexts/RootContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

const Register = () => {
      const [showPassword, setShowPassword] = useState(false);
      const [loading, setLoading] = useState(false);
      const [formData, setFormData] = useState({
            name: "",
            email: "",
            photoUrl: "",
            password: "",
      });
      const { createUserAccount, googleSignUser } = use(AuthContext);
      const navigate = useNavigate();

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prevState) => ({
                  ...prevState,
                  [name]: value,
            }));
      };

      const handleCreateUser = async (e) => {
            e.preventDefault();

            if (!formData.name || !formData.email || !formData.password) {
                  toast.error("Please fill in all required fields.");
                  return;
            }

            setLoading(true);

            try {
                  await createUserAccount(formData.email, formData.password, formData.name, formData.photoUrl);

                  toast.success("Account created successfully! 🎉", { autoClose: 1000 });

                  setFormData({ name: "", email: "", photoUrl: "", password: "" });


            } catch (error) {
                  toast.error(`Registration failed: ${error.message}`, { autoClose: 2000 });
            } finally {
                setTimeout(() => {
                    navigate("/challenges");
                }, 1000);
                  setLoading(false);
            }
      };
      return (
            <>
                  <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">
                              {/* Left Image */}
                              <div className="hidden md:block">
                                    <img
                                          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
                                          alt="Forest path"
                                          className="w-full h-full object-cover"
                                    />
                              </div>

                              {/* Right Form */}
                              <div className="p-8 md:p-10 flex flex-col justify-center">
                                    {/* Logo + Title */}
                                    <div className="mb-6">
                                          <div className="flex items-center gap-2 mb-2">
                                                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                                                <h2 className="text-xl font-semibold text-green-800">EcoTrack</h2>
                                          </div>
                                          <h1 className="text-2xl font-bold text-gray-800">Join EcoTrack</h1>
                                          <p className="text-gray-500 text-sm">
                                                Start your journey to a more sustainable lifestyle.
                                          </p>
                                    </div>

                                    {/* Form */}
                                    <form className="space-y-4" onSubmit={handleCreateUser}>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                      Full Name
                                                </label>
                                                <input
                                                      type="text"
                                                      name="name"
                                                      value={formData.name}
                                                      onChange={handleChange}
                                                      placeholder="Enter your full name"
                                                      className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                      Email Address
                                                </label>
                                                <input
                                                      type="email"
                                                      name="email"
                                                      value={formData.email}
                                                      onChange={handleChange}
                                                      placeholder="Enter your email address"
                                                      className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                      Profile Photo URL (Optional)
                                                </label>
                                                <input
                                                      type="url"
                                                      name="photoUrl"
                                                      value={formData.photoUrl}
                                                      onChange={handleChange}
                                                      placeholder="https://example.com/photo.jpg"
                                                      className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                />
                                          </div>

                                          <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                      Password
                                                </label>
                                                <div className="relative mt-1">
                                                      <input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Enter your password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                      />
                                                      <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                                      >
                                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                                      </button>
                                                </div>
                                                <ul className="text-xs text-gray-500 mt-1 grid grid-cols-2 gap-y-1">
                                                      <li>• Minimum 6 characters</li>
                                                      <li className="text-green-600">• At least 1 uppercase letter</li>
                                                      <li className="text-green-600">• At least 1 lowercase letter</li>
                                                      <li>• At least 1 special character</li>
                                                </ul>
                                          </div>

                                        <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Loading..." : "Register"}
                                        </button>

                                          <div className="flex items-center justify-center">
                                                <button
                                                      type="button"
                                                      onClick={googleSignUser}
                                                      className="flex items-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition text-gray-700 w-full justify-center"
                                                >
                                                      <FaGoogle className="text-red-500" /> Register with Google
                                                </button>
                                          </div>
                                    </form>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                          By registering, you agree to our{" "}
                                          <a href="#" className="text-green-600 hover:underline">
                                                Terms of Service
                                          </a>{" "}
                                          and{" "}
                                          <a href="#" className="text-green-600 hover:underline">
                                                Privacy Policy
                                          </a>
                                          .
                                    </p>

                                    <p className="text-sm text-center mt-3 text-gray-600">
                                          Already have an account?{" "}
                                          <a href="/login" className="text-green-700 font-semibold hover:underline">
                                                Login
                                          </a>
                                    </p>
                              </div>
                        </div>
                  </div>
                  <ToastContainer />
            </>
      );
};

export default Register;
