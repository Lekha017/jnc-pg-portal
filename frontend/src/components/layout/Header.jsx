const Header = () => {
  return (
    <div className="bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

        {/* Logo */}

        <div className="flex items-center gap-5">

          <img
            src="/logo.png"
            alt="JNC Logo"
            className="w-20 h-20 object-contain"
          />

          <div>

            <h1 className="text-5xl font-bold text-[#1d1d54]">
              Jyoti Nivas College Autonomous
            </h1>

            <p className="text-gray-600 mt-2">
              A Premier Institute for Women | Estd. 1966 |
              Reaccredited by NAAC with 'A+' Grade in the 4th Cycle
            </p>

          </div>

        </div>

        {/* Statistics */}

        <div className="hidden xl:flex gap-12">

          {[
            ["59", "Years"],
            ["6", "Streams"],
            ["43", "Programmes"],
            ["64th", "Best College in India"],
            ["5th", "Best College in Karnataka"],
          ].map(([number, text]) => (
            <div key={number} className="text-center">
              <h2 className="text-4xl font-bold">{number}</h2>
              <p className="mt-2 text-sm">{text}</p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Header;