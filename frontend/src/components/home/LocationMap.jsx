const LocationMap = () => {
  return (
    <section className="bg-[#F4F8FF] py-8 sm:py-10 lg:py-12">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            HEADING
        ========================= */}

        <div className="text-center mb-5 sm:mb-6">

          <h2
            className="
              text-2xl
              sm:text-3xl
              lg:text-4xl
              font-bold
              text-[#2D2A70]
            "
          >
            Our Location
          </h2>

          <p
            className="
              mt-2
              text-sm
              sm:text-base
              text-gray-600
              px-2
            "
          >
            Visit Jyoti Nivas College (Autonomous), Bengaluru
          </p>

        </div>


        {/* =========================
            MAP
        ========================= */}

        <div
          className="
            w-full
            overflow-hidden
            rounded-2xl
            sm:rounded-[24px]
            lg:rounded-[28px]
            border
            border-gray-200
            shadow-lg
            sm:shadow-xl
          "
        >
          <iframe
            title="Jyoti Nivas College Location"
            src="https://www.google.com/maps?q=Jyoti+Nivas+College+Autonomous+Bengaluru&output=embed"
            className="
              block
              w-full
              h-[280px]
              sm:h-[350px]
              lg:h-[400px]
            "
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>


        {/* =========================
            BUTTON
        ========================= */}

        <div className="flex justify-center mt-5 sm:mt-6">

          <a
            href="https://www.google.com/maps/search/?api=1&query=Jyoti+Nivas+College+Autonomous+Bengaluru"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              justify-center
              w-full
              sm:w-auto
              bg-[#2D2A70]
              hover:bg-[#23205d]
              text-white
              text-sm
              sm:text-base
              font-semibold
              px-7
              py-3
              rounded-xl
              shadow-md
              hover:shadow-lg
              transition-all
              duration-300
            "
          >
            Get Directions
          </a>

        </div>

      </div>
    </section>
  );
};

export default LocationMap;