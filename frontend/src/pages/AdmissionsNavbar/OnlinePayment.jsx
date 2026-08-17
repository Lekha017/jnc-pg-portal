import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function OnlinePayment() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-10 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            ONLINE PAYMENT PORTAL
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-10 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-8 sm:space-y-10 text-base sm:text-[17px] md:text-[18px] leading-7 sm:leading-8 md:leading-9 text-justify text-gray-600">

            <p>
              Detailed instructions are given on the login page of the web
              payment portal regarding the procedure to be followed in case of
              completed transactions, payment confirmation slips received and
              failed transactions. Please follow the instructions carefully.
            </p>

            <p>
              Once the <strong>"Pay"</strong> option is selected, you will be
              directed to the payment gateway where payment can be made through
              Net Banking or Credit/Debit Card. You may choose the desired
              payment option and proceed. After a successful payment, a payment
              confirmation slip will be generated. The payer is advised to keep
              this confirmation slip safely for future reference.
            </p>

            <p>
              If the payment is not successful for any reason, the system will
              display a payment failure status. If there is a delay in receiving
              any response from the payment gateway and you have <strong>not</strong>{" "}
              entered your card details or Net Banking authorization, you may
              safely restart the payment process from the beginning.
            </p>

            <p>
              However, if you have already entered your Credit/Debit Card
              details or completed the Net Banking authorization but have not
              received any response, please first verify with your bank or card
              issuer whether your account has been debited. If your account has
              been debited, <strong>do not attempt to make the payment
              again.</strong>
            </p>

            <p>
              If your account has <strong>not</strong> been debited, you may
              proceed with making the payment again until a successful payment
              confirmation is received. In all cases, kindly note down the
              transaction/reference number generated during the payment process
              for future reference.
            </p>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2F2F6F] mb-4 sm:mb-6">
                Privacy Policy
              </h2>

              <p>
                The information provided by you will be used solely for the
                purpose of processing payments made to the institution. All
                personal and payment-related information will be kept secure and
                confidential and will not be disclosed to any third party or
                used for any purpose other than payment processing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2F2F6F] mb-4 sm:mb-6">
                Cancellation / Refund Policy
              </h2>

              <p>
                There is no cancellation option available once the payment has
                been successfully completed. In the event of a duplicate
                payment, the payer, parent or student should contact the
                Administration, Finance or Accounts Department of the
                institution with valid proof of the transaction or bank
                statement.
              </p>

              <p>
                Eligible refunds will normally be processed within
                <strong> 10–15 working days.</strong> The payment gateway will
                return the amount to the issuing bank in batches for further
                processing. Depending on the issuing bank's policies, the amount
                may take approximately <strong>8–15 working days</strong> to
                reflect in the customer's account.
              </p>

              <p>
                By submitting a payment through the Online Payment Portal, you
                agree to these terms and conditions, including any future
                updates published by the institution on its website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2F2F6F] mb-4 sm:mb-6">
                Disclaimer
              </h2>

              <p>
                The articles, information and documents provided on this website
                are intended solely for informational purposes. No legal
                commitment whatsoever is attached to the information published.
                While every effort has been made to ensure the accuracy of the
                content, inadvertent errors may occur due to unavoidable
                circumstances despite the best efforts of the website management
                team.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}