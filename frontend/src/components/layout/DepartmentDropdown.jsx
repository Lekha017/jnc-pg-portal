import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDepartments } from "../../services/departmentService";

const DepartmentDropdown = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments({
        page: 1,
        limit: 100,
      });

      setDepartments(response.data || []);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  };

  return (
    <div className="w-72 py-2 bg-white rounded-lg shadow-lg">
      {departments.length > 0 ? (
        departments.map((department) => (
          <Link
            key={department._id}
            to={`/department/${department.slug}`}
            className="block px-5 py-3 text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition-colors duration-200"
          >
            {department.name}
          </Link>
        ))
      ) : (
        <p className="px-5 py-3 text-gray-400 text-sm">
          No departments found
        </p>
      )}
    </div>
  );
};

export default DepartmentDropdown;