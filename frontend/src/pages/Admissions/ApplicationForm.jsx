import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import Step1Personal from "./application/Step1Personal";
import Step2Address from "./application/Step2Address";
import Step3Academic from "./application/Step3Academic";
import Step4Programme from "./application/Step4Programme";
import Step5Documents from "./application/Step5Documents";
import Step6Declaration from "./application/Step6Declaration";
import Step7Review from "./application/Step7Review";

export default function AdmissionForm() {
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      applicantName: "",
      fatherName: "",
      motherName: "",
      gender: "",
      dob: "",
      nationality: "Indian",
      category: "",
      bloodGroup: "",
      aadhaarNumber: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 7;

  const progress = (currentStep / totalSteps) * 100;

  const nextStep = async () => {
    const valid = await methods.trigger();

    if (!valid) return;

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const onSubmit = (data) => {
    console.log(data);

    // Razorpay later
  };

 const renderStep = () => {
  switch (currentStep) {
    case 1:
      return <Step1Personal />;
    case 2:
        return <Step2Address />;
    case 3:
        return <Step3Academic />;
    case 4:
        return <Step4Programme />;
    case 5:
        return <Step5Documents />;
    case 6:
        return <Step6Declaration />;
    case 7:
        return <Step7Review />;
    default:
      return null;
  }
};

  return (
    <>
      <Header />
      <Navbar />

      <section className="bg-[#2F2F6F] py-14">
        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl text-center font-bold text-white">
            PG Admission Application
          </h1>

          <p className="text-center text-white/90 mt-5 text-lg">
            Academic Year 2026-2027
          </p>

        </div>
      </section>

      <section className="bg-[#F8F9FC] py-14 min-h-screen">

        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">

            <div className="mb-10">

              <div className="flex justify-between items-center mb-3">

                <h2 className="text-3xl font-bold text-[#2F2F6F]">
                  Admission Application
                </h2>

                <span className="text-gray-600 font-medium">
                  Step {currentStep} of {totalSteps}
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                  className="bg-[#2F2F6F] h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

            <FormProvider {...methods}>

              <form onSubmit={methods.handleSubmit(onSubmit)}>

                {renderStep()}
                                <div className="flex justify-between items-center mt-12 border-t border-gray-200 pt-8">

                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={currentStep === 1}
                    className={`px-8 py-3 rounded-lg font-semibold transition ${
                      currentStep === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Previous
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#2F2F6F] hover:bg-[#23235a] text-white font-semibold px-8 py-3 rounded-lg transition"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition"
                    >
                      Proceed to Payment
                    </button>
                  )}

                </div>

              </form>

            </FormProvider>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}