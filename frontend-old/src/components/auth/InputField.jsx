const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-[16px] font-semibold text-gray-700 mb-2">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 px-4 border border-gray-300 rounded-lg text-[15px] outline-none focus:ring-2 focus:ring-[#4B4B7C] focus:border-transparent"
      />
    </div>
  );
};

export default InputField;