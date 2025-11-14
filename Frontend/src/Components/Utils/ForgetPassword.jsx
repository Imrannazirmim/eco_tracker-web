import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Mail } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./Loading";

const ForgetPassword = () => {
      const navigate = useNavigate();
      const auth = getAuth();
      const location = useLocation();

      const previousEmail = location.state?.email || "";
      const [email, setEmail] = useState(previousEmail);
      const [isSubmitting, setIsSubmitting] = useState(false);

      const handleResetPassword = async () => {
            if (!email) {
                  return toast("Please enter your email before reset password");
            }
            setIsSubmitting(true);
            try {
                  await sendPasswordResetEmail(auth, email);
                  toast.success("Password Reset Success. check you email");
            } catch (error) {
                  if (error.code === "auth/user-not-found") {
                        toast.error("No user found with that email.");
                  } else if (error.code === "auth/invalid-email") {
                        toast.error("Invalid email address.");
                  } else {
                        toast.error("Failed to send reset email. Try again later.");
                  }
            } finally {
                  setIsSubmitting(false);
            }
            setTimeout(() => {
                  navigate("/sign");
            }, 5000);
      };

      return (
            <>
                  <ToastContainer />
                  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-teal-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                              <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Reset Password</h1>
                              <p className="text-gray-600 mb-6 text-center">
                                    Enter your email address below and we’ll send you a password reset link.
                              </p>

                              <div className="space-y-6">
                                    <div>
                                          <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                          >
                                                Email Address
                                          </label>
                                          <div className="relative">
                                                <Mail
                                                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                      size={20}
                                                />
                                                <input
                                                      type="email"
                                                      id="email"
                                                      placeholder="Enter your email"
                                                      value={email}
                                                      onChange={(e) => setEmail(e.target.value)}
                                                      disabled={isSubmitting}
                                                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                                />
                                          </div>
                                    </div>

                                    <button
                                          onClick={handleResetPassword}
                                          disabled={isSubmitting}
                                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                          {isSubmitting ? (
                                                <>
                                                      <Loading className="animate-spin" size={20} />
                                                      Sending...
                                                </>
                                          ) : (
                                                "Send Reset Link"
                                          )}
                                    </button>

                                    <p className="text-center text-sm text-gray-600 mt-4">
                                          Remember your password?{" "}
                                          <button
                                                onClick={() => navigate("/sign")}
                                                className="text-green-600 cursor-pointer hover:text-green-700 font-medium"
                                          >
                                                Back to Login
                                          </button>
                                    </p>
                              </div>
                        </div>
                  </div>
            </>
      );
};

export default ForgetPassword;
