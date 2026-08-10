import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function AdmissionPortal() {
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
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            ADMISSION APPLICATION PORTAL
          </h1>

          <p className="text-white/90 text-lg mt-4">
            Postgraduate Admissions • Academic Year 2026–2027
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#2F2F6F] mb-6">
              Welcome to the PG Admission Portal
            </h2>

            <p className="text-gray-600 text-[18px] leading-9 max-w-4xl mx-auto">
              This portal is exclusively designed for candidates applying
              for admission to the Postgraduate programmes offered by
              Jyoti Nivas College Autonomous. Applicants can create an
              account, complete the online application, upload the
              required documents and securely pay the application fee.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-14">

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-[#2F2F6F] mb-5">
                Through this portal you can
              </h3>

              <ul className="space-y-4 text-gray-600 text-[17px]">
                <li>✓ Register as a new applicant</li>
                <li>✓ Complete your online application</li>
                <li>✓ Save your progress and continue later</li>
                <li>✓ Upload the required documents</li>
                <li>✓ Pay the application fee securely</li>
                <li>✓ Track your application status</li>
              </ul>
            </div>

            <div className="bg-[#F8F8FC] rounded-xl p-8 border border-[#D8D8F3]">

              <h3 className="text-2xl font-bold text-[#2F2F6F] mb-5">
                Application Fee
              </h3>

              <div className="text-5xl font-bold text-[#FF2D55] mb-3">
                ₹500
              </div>

              <p className="text-gray-600 leading-8">
                Postgraduate Admission Application Fee
              </p>

              <div className="mt-6 p-4 rounded-lg bg-white border border-yellow-300">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This payment is only for submitting
                  your admission application. It is <strong>not</strong> the
                  tuition fee, semester fee or examination fee.
                </p>
              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-14">

          <button
  onClick={handleApplyNow}
  className="bg-[#2F2F6F] hover:bg-[#23235a] text-white text-lg font-semibold px-10 py-4 rounded-lg transition text-center"
>
  Apply Now (PG)
</button>

            <Link
              to="/login"
              className="border-2 border-[#2F2F6F] text-[#2F2F6F] hover:bg-[#2F2F6F] hover:text-white text-lg font-semibold px-10 py-4 rounded-lg transition text-center"
            >
              Already Registered? Login
            </Link>

          </div>

          {/* Important Information */}

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-8">

            <h3 className="text-2xl font-bold text-[#2F2F6F] mb-4">
              Important Information
            </h3>

            <div className="space-y-4 text-gray-700 leading-8">

              <p>
                • This portal is exclusively meant for candidates applying
                for admission to the Postgraduate programmes of Jyoti Nivas
                College Autonomous.
              </p>

              <p>
                • Applicants are advised to keep all academic records,
                photographs and supporting documents ready before starting
                the application.
              </p>

              <p>
                • Your application will be considered complete only after
                successful payment of the application fee.
              </p>

              <p>
                • Please verify all information carefully before submitting
                your application.
              </p>

              <p>
                • This portal should <strong>not</strong> be used for paying
                semester fees, examination fees or any other college dues.
              </p>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}