import { useState } from "react";

import FeeForm from "../../../components/admin/fees/FeeForm";
import FeeList from "../../../components/admin/fees/FeeList";

function ManageFees() {
  const [selectedFee, setSelectedFee] =
    useState(null);

  const [refresh, setRefresh] =
    useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div className="lg:col-span-1">

        <FeeForm
          selectedFee={selectedFee}
          setSelectedFee={setSelectedFee}
          triggerRefresh={triggerRefresh}
        />

      </div>

      <div className="lg:col-span-2">

        <FeeList
          refresh={refresh}
          onEdit={setSelectedFee}
        />

      </div>

    </div>
  );
}

export default ManageFees;