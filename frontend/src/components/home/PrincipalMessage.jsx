import principal from "../../data/principal";

function PrincipalMessage() {
  return (
    <section className="bg-white w-full">

      {/* =========================
          PRINCIPAL CARD
      ========================= */}

      <div
        className="
          w-full
          max-w-[500px]
          mx-auto
          bg-white
          rounded-xl
          overflow-hidden
          border
          border-gray-200
          shadow-sm
        "
      >

        {/* =========================
            PRINCIPAL IMAGE
        ========================= */}

        <div className="relative w-full">

          <img
            src={principal.image}
            alt={principal.name}
            className="
              w-full
              h-[220px]
              sm:h-[250px]
              md:h-[280px]
              object-cover
            "
          />

          {/* =========================
              NAME BANNER
          ========================= */}

          <div className="absolute bottom-0 right-0 max-w-[90%]">

            <div
              className="
                bg-[#1F1A52]
                text-white
                px-4
                sm:px-5
                md:px-6
                py-2
                sm:py-2.5
              "
              style={{
                clipPath:
                  "polygon(8% 0%,100% 0%,100% 100%,0% 100%)",
              }}
            >
              <h2
                className="
                  font-serif
                  text-[17px]
                  sm:text-[19px]
                  md:text-[22px]
                  font-bold
                  leading-tight
                  whitespace-normal
                "
              >
                {principal.name}
              </h2>
            </div>

          </div>
        </div>

        {/* =========================
            CONTENT
        ========================= */}

        <div
          className="
            p-4
            sm:p-5
            md:p-6
          "
        >

          {/* Title */}

          <h3
            className="
              text-[17px]
              sm:text-[18px]
              font-semibold
              text-gray-900
              mb-3
              sm:mb-4
            "
          >
            {principal.title}
          </h3>

          {/* Message */}

          <p
            className="
              text-[14px]
              sm:text-[15px]
              leading-7
              sm:leading-8
              text-gray-700
              text-justify
            "
          >
            {principal.message}
          </p>

        </div>

      </div>

    </section>
  );
}

export default PrincipalMessage;