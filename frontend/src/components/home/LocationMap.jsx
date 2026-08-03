const LocationMap = () => {
  return (
    <section className="bg-[#F4F8FF] py-10">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-6">

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#2D2A70]">
            Our Location
          </h2>

          <p className="mt-2 text-base text-gray-600">
            Visit Jyoti Nivas College (Autonomous), Bengaluru
          </p>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-[28px] border border-gray-200 shadow-xl">
          <iframe
            title="Jyoti Nivas College Location"
            src="https://www.google.com/maps?q=Jyoti+Nivas+College+Autonomous+Bengaluru&output=embed"
            className="w-full"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center mt-5">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Jyoti+Nivas+College+Autonomous+Bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2D2A70] hover:bg-[#23205d] text-white text-sm font-semibold px-7 py-3 rounded-xl shadow-md transition-all duration-300"
          >
            Get Directions
          </a>
        </div>

      </div>
    </section>
  );
};

export default LocationMap;