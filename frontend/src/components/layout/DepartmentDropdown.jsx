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
      const data = await getDepartments();
      setDepartments(data || []);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  };

  return (
    <div className="space-y-2">
      {departments.length > 0 ? (
        departments.map((department) => (
          <Link
            key={department._id}
            to={`/departments/${department.slug}`}
            className="block hover:text-[#FF2D55] transition"
          >
            {department.name}
          </Link>
        ))
      ) : (
        <p className="text-gray-400">
          No departments
        </p>
      )}
    </div>
  );
};

export default DepartmentDropdown;