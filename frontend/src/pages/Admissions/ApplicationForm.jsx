import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { submitApplication } from "../../services/applicationService";
import {
  createPaymentOrder,
  verifyPayment,
} from "../../services/paymentService";

import Step1Personal from "./application/Step1Personal";
import Step2Address from "./application/Step2Address";
import Step3Academic from "./application/Step3Academic";
import Step4Programme from "./application/Step4Programme";
import Step5Documents from "./application/Step5Documents";
import Step6Declaration from "./application/Step6Declaration";
import Step7Review from "./application/Step7Review";

export default function AdmissionForm() {
  const navigate = useNavigate();
  const methods = useForm({
    mode: "onTouched",

    defaultValues: {
      // Step 1
      applicantName: "",
      fatherName: "",
      motherName: "",
      gender: "",
      dob: "",
      nationality: "Indian",
      category: "",
      bloodGroup: "",
      aadhaarNumber: "",

      // Step 2
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      mobileNumber: "",
      email: "",

      // Step 3
      tenthSchool: "",
      tenthBoard: "",
      tenthYear: "",
      tenthPercentage: "",

      twelfthCollege: "",
      twelfthBoard: "",
      twelfthYear: "",
      twelfthPercentage: "",

      bachelorDegree: "",
      bachelorUniversity: "",
      bachelorYear: "",
      bachelorPercentage: "",

      // Step 4
      programId: "",

      // Step 5
      photograph: null,
      aadhaarDocument: null,
      tenthMarksheet: null,
      twelfthMarksheet: null,
      degreeCertificate: null,
      degreeMarksheets: null,
      transferCertificate: null,
      migrationCertificate: null,

      // Step 6
      declarationAccepted: false,
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Store the created application so retrying payment
  // does not create another application.
  const [applicationId, setApplicationId] =
    useState(null);

  // Track successful payment.
  const [paymentCompleted, setPaymentCompleted] =
    useState(false);

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

  const onSubmit = async (data) => {
    // Prevent another payment after successful payment.
    if (paymentCompleted) {
      return;
    }

    try {
      setSubmitting(true);

      let currentApplicationId = applicationId;

      // ------------------------------------------------
      // STEP 1: Create application only once
      // ------------------------------------------------

      if (!currentApplicationId) {
        const formData = new FormData();

        // Add normal form fields
        Object.entries(data).forEach(
          ([key, value]) => {
            if (
              key !== "photograph" &&
              key !== "aadhaarDocument" &&
              key !== "tenthMarksheet" &&
              key !== "twelfthMarksheet" &&
              key !== "degreeCertificate" &&
              key !== "degreeMarksheets" &&
              key !== "transferCertificate" &&
              key !== "migrationCertificate"
            ) {
              formData.append(key, value);
            }
          }
        );

        // Add documents
        const documentFields = [
          "photograph",
          "aadhaarDocument",
          "tenthMarksheet",
          "twelfthMarksheet",
          "degreeCertificate",
          "degreeMarksheets",
          "transferCertificate",
          "migrationCertificate",
        ];

        documentFields.forEach((field) => {
          const fileList = data[field];

          if (
            fileList &&
            fileList.length > 0
          ) {
            formData.append(
              field,
              fileList[0]
            );
          }
        });

        const applicationResponse =
          await submitApplication(formData);

        const application =
          applicationResponse.data;

        if (!application?._id) {
          throw new Error(
            "Application was created but its ID was not returned."
          );
        }

        currentApplicationId =
          application._id;

        setApplicationId(
          currentApplicationId
        );

        toast.success(
          "Application saved. Proceeding to payment..."
        );
      }

      // ------------------------------------------------
      // STEP 2: Create Razorpay order
      // ------------------------------------------------

      const orderResponse =
        await createPaymentOrder(
          currentApplicationId
        );

      const order = orderResponse.data;

      if (
        !order?.orderId ||
        !order?.keyId
      ) {
        throw new Error(
          "Unable to create Razorpay payment order."
        );
      }

      // ------------------------------------------------
      // STEP 3: Check Razorpay
      // ------------------------------------------------

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay Checkout could not be loaded."
        );
      }

      // ------------------------------------------------
      // STEP 4: Open Razorpay
      // ------------------------------------------------

      const options = {
        key: order.keyId,

        amount: order.amount,

        currency: order.currency,

        name: "Jyoti Nivas College",

        description:
          "PG Admission Application Fee",

        order_id: order.orderId,

        prefill: {
          name:
            data.applicantName || "",

          email:
            data.email || "",

          contact:
            data.mobileNumber || "",
        },

        theme: {
          color: "#2F2F6F",
        },

        handler: async (response) => {
          try {
            setSubmitting(true);

            // ------------------------------------------------
            // STEP 5: Verify payment
            // ------------------------------------------------

            const verificationResponse =
              await verifyPayment({
                applicationId:
                  currentApplicationId,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              });

          if (verificationResponse.success) {
  setPaymentCompleted(true);

  toast.success(
    "Payment successful! Your application has been submitted."
  );

  console.log(
    "Submitted Application:",
    verificationResponse.data
  );

  navigate("/admissions/application/invoice");
}
          } catch (error) {
            console.error(
              "Payment Verification Error:",
              error
            );

            toast.error(
              error.response?.data?.message ||
                "Payment verification failed."
            );
          } finally {
            setSubmitting(false);
          }
        },

        modal: {
          ondismiss: () => {
            setSubmitting(false);

            toast.info(
              "Payment window was closed. You can try again."
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        (response) => {
          console.error(
            "Razorpay Payment Failed:",
            response.error
          );

          setSubmitting(false);

          toast.error(
            response.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Application Payment Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to proceed with payment."
      );

      setSubmitting(false);
    }
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
                  Step {currentStep} of{" "}
                  {totalSteps}
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
              <form
                onSubmit={methods.handleSubmit(
                  onSubmit
                )}
              >
                {renderStep()}

                <div className="flex justify-between items-center mt-12 border-t border-gray-200 pt-8">
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={
                      currentStep === 1 ||
                      submitting ||
                      paymentCompleted
                    }
                    className={`px-8 py-3 rounded-lg font-semibold transition ${
                      currentStep === 1 ||
                      submitting ||
                      paymentCompleted
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Previous
                  </button>

                  {currentStep <
                  totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        submitting ||
                        paymentCompleted
                      }
                      className="bg-[#2F2F6F] hover:bg-[#23235a] text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-60"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={
                        submitting ||
                        paymentCompleted
                      }
                      className={`font-semibold px-8 py-3 rounded-lg transition ${
                        paymentCompleted
                          ? "bg-green-600 text-white cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      } disabled:opacity-60`}
                    >
                      {paymentCompleted
                        ? "Payment Completed"
                        : submitting
                        ? "Processing..."
                        : "Proceed to Payment"}
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