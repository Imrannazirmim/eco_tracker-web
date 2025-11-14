const InputField = ({ label, type, name, value, onChange, placeholder, error, required = false }) => {
  return (
    <div>
      <label className="text-green-700 font-medium mb-1 block" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
export default InputField