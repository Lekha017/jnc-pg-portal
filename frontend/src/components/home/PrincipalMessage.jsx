import principal from "../../data/principal";

function PrincipalMessage() {
  return (
    <section className="bg-white pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Principal Card */}
        <div className="w-full max-w-[500px] bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">

          {/* Principal Image */}
          <div className="relative">
            <img
              src={principal.image}
              alt={principal.name}
              className="w-full h-[280px] object-cover"
            />

            {/* Name Banner */}
            <div className="absolute bottom-0 right-0">
              <div
                className="bg-[#1F1A52] text-white px-6 py-2"
                style={{
                  clipPath: "polygon(8% 0%,100% 0%,100% 100%,0% 100%)",
                }}
              >
                <h2 className="font-serif text-[22px] font-bold leading-none">
                  {principal.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-[18px] font-semibold text-gray-900 mb-4">
              {principal.title}
            </h3>

            <p className="text-[15px] leading-8 text-gray-700 text-justify">
              {principal.message}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrincipalMessage;