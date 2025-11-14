import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
      const navigate = useNavigate();
      return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
                  <div className="text-center p-8 border border-gray-300 rounded-2xl px-4">
                        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-6">Something went wrong</p>
                        <p className="text-gray-500 mb-8">
                              We're sorry, but an unexpected error occurred. Please try again later.
                        </p>
                        <button
                              onClick={() => navigate("/")}
                              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                              Back to home
                        </button>
                  </div>
            </div>
      );
};

export default ErrorPage;
