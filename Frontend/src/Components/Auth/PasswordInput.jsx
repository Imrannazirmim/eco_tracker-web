import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({ label, name, value, onChange, placeholder, error, required = false, showForgot = false, onForgotClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label className="text-green-700 font-medium mb-1 flex justify-between">
        <span>{label}</span>
        {showForgot && (
          <span
            onClick={onForgotClick}
            className="text-sm text-green-600 underline cursor-pointer hover:text-green-700"
          >
            Forgot Password?
          </span>
        )}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-11 text-gray-400 hover:text-gray-600"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;