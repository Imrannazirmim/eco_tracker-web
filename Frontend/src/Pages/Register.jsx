import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/RootContext";
import InputField from "../Components/Auth/InputField";
import PasswordInput from "../Components/Auth/PasswordInput";
import GoogleSignInButton from "../Components/Auth/GoogleSignInButton";
import { useNavigate } from "react-router";

const Register = () => {
      const { createUserAccount, googleSignUser } = useContext(AuthContext);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const [formData, setFormData] = useState({
            name: "",
            email: "",
            photoUrl: "",
            password: "",
      });
      const [error, setError] = useState({});

      const validateForm = () => {
            const newErrors = {};
            if (!formData.name) {
                  newErrors.name = "Name is required";
            }
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

      const handleFormSubmit = (e) => {
            e.preventDefault();
            if (!validateForm()) return;
            setLoading(true);
            createUserAccount(formData.email, formData.password, formData.name, formData.photoUrl)
                  .then(() => {
                        setFormData({ name: "", email: "", photoUrl: "", password: "" });
                        setLoading(false);
                        navigate("/challenges");
                  })
                  .catch((error) => {
                        setError({ general: error.message || "Registration failed. Try again." });
                        setLoading(false);
                  });
      };

      const handleGoogleSign = () => {
            setLoading(true);
            googleSignUser()
                  .then(() => {
                        setLoading(false);
                        navigate("/challenges");
                  })
                  .catch((error) => {
                        setError({ general: error.message || "Login Failed" });
                        setLoading(false);
                  });
      };

      return (
            <main className="w-full h-screen flex items-center justify-center bg-green-50">
                  <section className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                        <div className="text-center mb-6">
                              <h2 className="text-2xl font-semibold text-green-700">Register to EcoTrack</h2>
                              <p className="text-gray-600 mt-1">Join the community making a difference</p>
                        </div>

                        <div className="flex flex-col gap-5">
                              <InputField
                                    label="Full Name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    error={error.name}
                                    required
                              />

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

                              <InputField
                                    label="Profile Photo URL"
                                    type="url"
                                    name="photoUrl"
                                    value={formData.photoUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/photo.jpg"
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
                              />

                              {error.general && <p className="text-red-500 text-sm">{error.general}</p>}

                              <button
                                    onClick={handleFormSubmit}
                                    disabled={loading}
                                    className="w-full bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                    {loading ? "Creating..." : "Register"}
                              </button>
                        </div>

                        <div className="mt-6 flex flex-col items-center gap-3">
                              <GoogleSignInButton onClick={handleGoogleSign} disabled={loading} loading={loading} />

                              <p className="text-sm text-gray-700">
                                    Already have an account?{" "}
                                    <button
                                          onClick={()=>navigate('/sign')}
                                          className="text-green-600 cursor-pointer font-semibold underline hover:text-green-700"
                                    >
                                          Login
                                    </button>
                              </p>
                        </div>
                  </section>
            </main>
      );
};
export default Register;
