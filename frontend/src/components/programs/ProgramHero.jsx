import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProgramHero({ details }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleApplyNow = () => {
        if (user) {
            navigate("/admissions/application");
        } else {
            navigate("/login", {
                state: {
                    from: "/admissions/application",
                },
            });
        }
    };

    return (
        <section
            className="
                relative
                w-full
                h-[320px]
                sm:h-[380px]
                md:h-[420px]
                lg:h-[450px]
                overflow-hidden
            "
        >

            {/* =========================
                BACKGROUND IMAGE
            ========================= */}

            <img
                src={
                    details?.heroImage ||
                    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
                }
                alt={details?.degreeTitle || "Programme"}
                className="
                    w-full
                    h-full
                    object-cover
                "
            />

            {/* =========================
                OVERLAY
            ========================= */}

            <div className="absolute inset-0 bg-black/45" />

            {/* =========================
                CONTENT
            ========================= */}

            <div className="absolute inset-0 flex items-center">

                <div
                    className="
                        w-full
                        max-w-6xl
                        mx-auto

                        px-5
                        sm:px-6
                        md:px-8
                        lg:px-8
                    "
                >

                    {/* Programme Name */}

                    <h1
                        className="
                            text-white
                            font-bold

                            text-3xl
                            sm:text-4xl
                            md:text-5xl
                            lg:text-6xl

                            leading-tight

                            max-w-4xl

                            break-words
                        "
                    >
                        {details?.degreeTitle}
                    </h1>

                    {/* Department */}

                    <p
                        className="
                            text-white/90

                            text-base
                            sm:text-lg
                            md:text-xl

                            mt-3
                            sm:mt-4

                            max-w-2xl

                            break-words
                        "
                    >
                        {details?.departmentName}
                    </p>

                    {/* Apply Button */}

                    <button
                        type="button"
                        onClick={handleApplyNow}
                        className="
                            mt-5
                            sm:mt-6
                            md:mt-8

                            bg-[#2D2A70]
                            hover:bg-[#23205b]

                            text-white

                            px-6
                            sm:px-7
                            md:px-8

                            py-2.5
                            sm:py-3

                            text-sm
                            sm:text-base

                            rounded-xl

                            transition
                            duration-200

                            cursor-pointer

                            w-auto
                            min-w-[120px]
                        "
                    >
                        Apply Now
                    </button>

                </div>

            </div>

        </section>
    );
}

export default ProgramHero;