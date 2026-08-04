import Programs from "../../../components/programs/Programs";

function ProgramsFees() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-[#2D2A70]">
          Postgraduate Programmes
        </h2>

        <p className="text-gray-500 mt-2">
          Explore the postgraduate programmes offered by Jyoti Nivas College.
          Click on <strong>Fees</strong> to view the fee structure,
          <strong> Details</strong> to know more about the programme,
          or <strong>Apply</strong> to begin your admission process.
        </p>

      </div>

      <Programs />

    </div>
  );
}

export default ProgramsFees;