const AuthButton = ({ title, loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-[#4B4B7C] hover:bg-[#3b3b66] text-white py-3 rounded-lg font-semibold transition"
    >
      {loading ? "Please wait..." : title}
    </button>
  );
};

export default AuthButton;