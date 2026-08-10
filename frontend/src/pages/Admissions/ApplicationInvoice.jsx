import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { getMyApplication } from "../../services/applicationService";

export default function ApplicationInvoice() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null);

  useEffect(() => {
    const loadApplication = async () => {
      try {
        const response = await getMyApplication();

        const applications = response.data || [];

        const paidApplication =
          applications.find(
            (item) =>
              item.paymentStatus === "Paid"
          ) || applications[0];

        setApplication(paidApplication || null);
      } catch (error) {
        console.error(
          "Failed to load application:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, []);

 const handleDownload = async () => {
  try {
    const invoice = invoiceRef.current;

    if (!invoice) {
      return;
    }

    const canvas = await html2canvas(invoice, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imageData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210;
    const pdfHeight =
      (canvas.height * pdfWidth) /
      canvas.width;

    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    const applicationNumber =
      application.applicationNumber ||
      "JNC-PG-APPLICATION";

    pdf.save(
      `${applicationNumber}-Invoice.pdf`
    );
  } catch (error) {
    console.error(
      "Invoice Download Error:",
      error
    );
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
        <p className="text-gray-600">
          Loading invoice...
        </p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC]">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-[#2F2F6F] mb-2">
            Invoice Not Found
          </h2>

          <p className="text-gray-600">
            No admission application was found.
          </p>
        </div>
      </div>
    );
  }

  const paymentDate = application.updatedAt
    ? new Date(
        application.updatedAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "-";

  const paymentTime = application.updatedAt
    ? new Date(
        application.updatedAt
      ).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  return (
    <>
      <style>
        {`
          @media print {
            body {
              background: white !important;
            }

            .no-print {
              display: none !important;
            }

            .invoice-wrapper {
              padding: 0 !important;
              background: white !important;
            }

            .invoice {
              box-shadow: none !important;
              border: none !important;
              max-width: 100% !important;
            }
          }
        `}
      </style>

      <div className="invoice-wrapper min-h-screen bg-[#F5F6FA] py-10 px-4">
        {/* Download / Print Button */}

        <div className="no-print max-w-4xl mx-auto mb-5 flex justify-end">
          <button
          onClick={handleDownload}
            className="bg-[#2F2F6F] hover:bg-[#23235a] text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Download Invoice
          </button>
        </div>

        {/* Invoice */}

      <div
  ref={invoiceRef}
  className="invoice max-w-4xl mx-auto bg-white border border-gray-200 shadow-sm"
>
          {/* Header */}

          <div className="px-10 py-8 border-b border-gray-200">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                {/* Replace the src below with your actual JNC logo path */}
                <img
                 src="/jjnc-logo.png"
                  alt="Jyoti Nivas College Autonomous"
                  className="h-20 w-auto object-contain"
                />
              </div>

              <div className="text-right">
                <h2 className="text-xl font-bold text-[#2F2F6F]">
                  PAYMENT RECEIPT
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  PG Admission Application
                </p>

                <p className="text-sm text-gray-500">
                  Academic Year 2026–2027
                </p>
              </div>
            </div>
          </div>

          {/* Receipt Information */}

          <div className="px-10 py-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Application Number
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {application.applicationNumber ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Payment Date
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {paymentDate}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Payment Time
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  {paymentTime}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Payment Status
                </p>

                <p className="font-semibold text-green-600 mt-1">
                  {application.paymentStatus ||
                    "Paid"}
                </p>
              </div>
            </div>
          </div>

          {/* Applicant Details */}

          <div className="px-10 py-7">
            <h3 className="text-lg font-bold text-[#2F2F6F] mb-5">
              Applicant Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Applicant Name
                </p>

                <p className="text-gray-800 font-medium mt-1">
                  {application.applicantName ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Email
                </p>

                <p className="text-gray-800 font-medium mt-1">
                  {application.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Mobile Number
                </p>

                <p className="text-gray-800 font-medium mt-1">
                  {application.mobileNumber ||
                    "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Programme
                </p>

                <p className="text-gray-800 font-medium mt-1">
                  {application.programId
                    ?.programName ||
                    "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Details */}

          <div className="px-10 pb-7">
            <h3 className="text-lg font-bold text-[#2F2F6F] mb-5">
              Payment Details
            </h3>

            <div className="border border-gray-200">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
                <div className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Description
                </div>

                <div className="px-5 py-4 text-sm font-semibold text-gray-700">
                  Payment ID
                </div>

                <div className="px-5 py-4 text-sm font-semibold text-gray-700 text-right">
                  Amount
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div className="px-5 py-5 text-sm text-gray-700">
                  PG Admission Application Fee
                </div>

                <div className="px-5 py-5 text-sm text-gray-700 break-all">
                  {application.razorpayPaymentId ||
                    "-"}
                </div>

                <div className="px-5 py-5 text-sm font-semibold text-gray-800 text-right">
                  ₹
                  {application.applicationFee ||
                    500}
                </div>
              </div>
            </div>
          </div>

          {/* Total */}

          <div className="px-10 pb-8">
            <div className="flex justify-end">
              <div className="w-full md:w-72 border-t border-gray-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    Total Paid
                  </span>

                  <span className="text-2xl font-bold text-[#2F2F6F]">
                    ₹
                    {application.applicationFee ||
                      500}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}

          <div className="mx-10 mb-8 bg-[#F8F9FC] border border-gray-200 px-6 py-5">
            <p className="text-sm text-gray-600 leading-6">
              This receipt is issued towards the PG
              admission application fee only. The
              ₹500 application fee is not a tuition
              fee, semester fee, examination fee, or
              any other college fee.
            </p>
          </div>

          {/* Footer */}

          <div className="px-10 py-6 border-t border-gray-200 text-center">
            <p className="text-sm font-semibold text-[#2F2F6F]">
              Jyoti Nivas College Autonomous
            </p>

            <p className="text-xs text-gray-500 mt-1">
              This is a computer-generated payment
              receipt and does not require a signature.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}