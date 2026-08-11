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
        <section className="relative w-full h-[450px] overflow-hidden">

            {/* Background Image */}
            <img
                src={
                    details?.heroImage ||
                    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
                }
                alt={details?.degreeTitle}
                className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">

                <div className="max-w-6xl mx-auto w-full px-8">

                    <h1 className="text-white text-5xl lg:text-6xl font-bold">
                        {details?.degreeTitle}
                    </h1>

                    <p className="text-white/90 text-xl mt-4">
                        {details?.departmentName}
                    </p>

                    <button
                        type="button"
                        onClick={handleApplyNow}
                        className="
                            mt-8
                            bg-[#2D2A70]
                            text-white
                            px-8
                            py-3
                            rounded-xl
                            hover:bg-[#23205b]
                            transition
                            cursor-pointer
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