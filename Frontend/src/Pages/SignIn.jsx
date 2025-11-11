import React, { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../Contexts/RootContext.jsx";
import Loading from "../Components/Utils/Loading.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { toast, ToastContainer } from "react-toastify";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { signInUser, googleSignUser, error, loading } = useContext(AuthContext);

    if (loading) return <Loading />;
    if (error) return <ErrorPage />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsSubmitting(true);

        try {
            await signInUser(email, password);
            toast.success("Login Successfully");
        } catch (err) {
            toast.error(err.message || "Login failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsSubmitting(true);
        try {
            await googleSignUser();
        } catch (err) {
            toast.error(err.message || "Google sign-in failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
            <>
                <main className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
                    <section className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-5xl w-full flex">
                        {/* Left side - Plant Image */}
                        <div className="hidden md:block md:w-1/2 overflow-hidden">
                            <img
                                    src="https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=80"
                                    alt="Green plant leaves"
                                    className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Right side - Login Form */}
                        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-emerald-50">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">Login to EcoTrack</h1>
                                <p className="text-gray-600">Join the community making a difference.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <a href="#" className="text-sm text-green-600 hover:text-green-700">
                                            Forgot Password?
                                        </a>
                                    </div>
                                    <div className="relative">
                                        <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                required
                                                disabled={isSubmitting}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                                        />
                                        <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isSubmitting}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Login Button */}
                                <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </button>

                                {/* Google Sign In */}
                                <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        disabled={isSubmitting}
                                        className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg width="18" height="18" viewBox="0 0 18 18">
                                        <path
                                                fill="#4285F4"
                                                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                                        />
                                        <path
                                                fill="#34A853"
                                                d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
                                        />
                                        <path
                                                fill="#FBBC05"
                                                d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.335z"
                                        />
                                        <path
                                                fill="#EA4335"
                                                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                                        />
                                    </svg>
                                    Continue with Google
                                </button>
                            </form>

                            {/* Sign Up Link */}
                            <p className="mt-8 text-center text-gray-600">
                                Don't have an account?{" "}
                                <a href="/register" className="text-green-600 hover:text-green-700 font-semibold">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </section>
                </main>
                <ToastContainer />
            </>
    );
};

export default SignIn;