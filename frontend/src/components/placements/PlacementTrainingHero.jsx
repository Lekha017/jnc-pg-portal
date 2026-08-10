function PlacementTrainingHero() {
  return (
    <section className="bg-[#EEF5FF] border-none">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Breadcrumb */}

        <p className="text-xs text-gray-500 mb-3">
          Home &nbsp;&gt;&nbsp; Placements &nbsp;&gt;&nbsp;

          <span className="text-[#2D2A70] font-semibold">
            Placement Training
          </span>
        </p>

        {/* Heading */}

        <h1
          className="text-4xl font-bold text-[#2D2A70]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Placement Training
        </h1>

        {/* Description */}

        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-700">
          The Placement Cell is committed to preparing and empowering
          students with the right skills, attitude and confidence to
          excel in the corporate world.
        </p>

      </div>
    </section>
  );
}

export default PlacementTrainingHero;