import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const staff = [
  { name: "Mr. K. Nagappa", designation: "Peon" },
  { name: "Mr. A. Srinivasa", designation: "Peon" },
  { name: "MR. C Sommappa", designation: "Peon" },
  { name: "Ms. G. Subhashini", designation: "SDA" },
  { name: "Sr. Sopna Rani .S", designation: "Administrator - Library" },
  { name: "Mr. B. V. Prakash", designation: "Attender" },
  { name: "Ms. Poondi Mary", designation: "Peon" },
  { name: "Ms. Lourde Mary", designation: "Peon" },
  { name: "Mr. Stanislaus", designation: "Attender" },
  { name: "Mr. Jayarama T C", designation: "Attender" },
  { name: "Mr. Gopinath J", designation: "Peon" },
  { name: "Ms. Yashodha", designation: "Attender" },
  { name: "Ms. Mary Pauline Nirmala", designation: "Office Assistant" },
  { name: "Mr. Jayaseelan", designation: "Lab Attender" },
  { name: "Ms. Jayashree S", designation: "Front Office Assistant" },
  { name: "Mr. Praveen M Mascarenhas", designation: "System Administrator" },
  { name: "Ms. Priya Veera D'Souza", designation: "Office Assistant" },
  { name: "Mr. Jipson Paul", designation: "FDC" },
  { name: "Mrs. Vijaya Jones", designation: "Receptionist" },
  { name: "Mr. Yellappa", designation: "Peon" },
  { name: "Mr. Basil Aleyas", designation: "Technical Staff" },
  { name: "Ms. Savitha", designation: "Computer Data Operator" },
  { name: "Mr. Satish Kumar", designation: "Peon" },
  { name: "Mrs. Jaya Thomas", designation: "First Division Clerk" },
  { name: "Ms. J Asantha Kumari", designation: "Office Assistant" },
  { name: "Ms. Saroja S", designation: "Peon" },
  { name: "Ms. Ammu", designation: "Peon" },
  { name: "Mr. Paul Richard", designation: "Studio Technician" },
  { name: "Ms. Selvi", designation: "Peon" },
  { name: "Mr. A Elumalai", designation: "Attender" },
  { name: "Mrs. S Lakshmi", designation: "Peon" },
  { name: "Mr. Nagaraja A D", designation: "Library Assistant" },
  { name: "Mr. Alwyn Manoj Kumar", designation: "Office Assistant" },
  { name: "Mr. Bhagyanathan P", designation: "First Division Clerk" },
  { name: "Mrs. S Thanga Rani", designation: "Peon" },
  { name: "Mr. Murugan G", designation: "Lab Attender" },
  { name: "Ms. Padmini K", designation: "Peon" },
  { name: "Ms. Maya", designation: "Peon" },
  { name: "Mr. Francis Arokya Swamy", designation: "House Keeping" },
  { name: "Ms. M. Sathyakala", designation: "Office Assistant" },
             { name: "Mr. Vivek Raj . D", designation: "Data Operator" },
  { name: "Ms. Rani", designation: "Peon" },
  { name: "Mr. Sundaresh B. V", designation: "Library Assistant" },
  { name: "Mr. Sandeep", designation: "Lab Assistant" },
  { name: "Mr. Bhargava", designation: "Lab Attender" },
  { name: "Mr. Anand", designation: "Lab Attender" },
  { name: "Mr. Shabari M", designation: "Lab Attender" },
  { name: "Ms. Selvi", designation: "Peon" },
  { name: "Ms. Periye Nayaki", designation: "Peon" },
  { name: "Ms. Prema", designation: "Peon" },
  { name: "Mr. Shravan", designation: "Lab Attender" },
  { name: "Mr. Ambrose SG", designation: "Peon" },
  { name: "Ms. Geetha", designation: "Peon" },
  { name: "Ms. Vijaya Lakshmi", designation: "Peon" },
  { name: "Mr. Sudeep .Naik", designation: "Technical Staff" },
  { name: "Mr. Khaleelurahman K", designation: "Website Designer" },
  { name: "Mr. Raju R.V.K", designation: "Peon" },
  { name: "Ms. Shanthi", designation: "Peon" },
  { name: "Mr. Katesh Yadav K", designation: "Lab Attender" },
  { name: "Mr. Krishnappa K.M", designation: "Lab Attender" },
  { name: "Mr. Praveen Kumar", designation: "Peon - Electrical Maintenance" },
  { name: "Mrs. Devi A", designation: "Peon" },
  { name: "Ms. Jasinta John", designation: "Office Assistant" },
  { name: "Mr. Shreyas R", designation: "ERP Coordinator" },
  { name: "Ms. Aishwarya T.P", designation: "Receptionist" },
  { name: "Ms. Soumya Cecil", designation: "FDC" },
  { name: "Mr. Michael Rahul D", designation: "Lab Attender" },
  { name: "Mrs. Mary V", designation: "Lab Attender" },
  { name: "Mrs. Emilda Jyoti", designation: "Lab Attender" },
  { name: "Mr. Jaya Kumar L", designation: "Lab Attender" },
  { name: "Ms. P A Edith Bhula", designation: "Accounts Assistant" },
  { name: "Ms. Anu Biju", designation: "Office Assistant" },
  {
    name: "Mr. Aashish Sasikumar",
    designation: "Visual Documentor and Content Designer",
  },
  { name: "Mr. Raghul N", designation: "Supervisor" },
  { name: "Mr. Jeevan Anthony", designation: "Supervisor (Canteen)" },
  { name: "Mr. Reneish Joselin J", designation: "Light and Sound Technician" },
  { name: "Mrs. Peddamusti Nagamma", designation: "Peon" },
  { name: "Mrs. Usha M", designation: "Peon" },
  { name: "Mr. Anil Kumar G", designation: "Driver" },
  { name: "Mr. Divine Maria", designation: "Peon" },
  { name: "Mr. Bharath", designation: "Peon" },
  { name: "Mr. Namithran Joseph", designation: "Peon" },

  ];
  const AdministrativeStaff = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Administrative Staff
          </h1>
        </div>
      </section>

      <section className="bg-white py-14">
       <div className="max-w-6xl mx-auto px-6">

         {/* Administrator */}
<div className="flex flex-col lg:flex-row items-start gap-8 mb-16">

  <img
    src="/administrator.jpg"
    alt="Administrator"
    className="w-[300px] h-auto object-cover"
  />

  <div className="pt-2 text-gray-800">

    <div className="space-y-3 text-gray-700">
              <h2 className="text-3xl font-bold text-[#2F2F6F]">
                Sr. Sajitha Jose
              </h2>

              <p className="text-lg font-semibold text-[#E91E63]">
                Administrator
              </p>

              <p>
                <strong>Phone:</strong> 080 25501919
              </p>

              <p>
                <strong>Email:</strong>{" "}
                info@jyotinivas.org,
                <br />
                srsajithajose@jyotinivas.org
              </p>
            </div>

          </div>

</div>
 
          {/* Staff List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {staff.map((member, index) => (
              <div
                key={index}
               className="bg-white border border-gray-200 rounded-lg px-5 py-5 shadow-sm hover:shadow-md transition duration-200"
              >
                <h3 className="font-semibold text-[#2F2F6F]">
                  {member.name}
                </h3>

                <p className="mt-2 text-[#E91E63] text-sm">
                  {member.designation}
                </p>
              </div>
            ))}
          </div>
                  </div>
      </section>

      <Footer />
    </>
  );
};

export default AdministrativeStaff;