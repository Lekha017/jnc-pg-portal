const Logo = ({ className = "" }) => {
  return (
    <img
      src="/jjnc-logo.png"
      alt="Jyoti Nivas College"
      className={`object-contain ${className}`}
    />
  );
};

export default Logo;