import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getDepartmentById,
    updateDepartment,
} from "../../services/departmentService";
import { getFacultyDropdown } from "../../services/facultyService";
import Toast from "../../components/common/Toast";

export default function EditDepartment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [facultyList, setFacultyList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        about: "",
        vision: "",
        mission: "",
        hod: "",
        hodMessage: "",
        programmes: [""],
    });

    useEffect(() => {
        fetchFaculty();
        fetchDepartment();
    }, []);

    const fetchFaculty = async () => {
        try {
            const res = await getFacultyDropdown();
setFacultyList(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDepartment = async () => {
        try {
            const department = await getDepartmentById(id);

            setFormData({
                name: department.name || "",
                slug: department.slug || "",
                about: department.about || "",
                vision: department.vision || "",
                mission: department.mission || "",
                hod: department.hod?._id || "",
                hodMessage: department.hodMessage || "",
                programmes:
                    department.programmes?.length > 0
                        ? department.programmes
                        : [""],
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            setFormData((prev) => ({
                ...prev,
                name: value,
                slug: generateSlug(value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleProgrammeChange = (index, value) => {
        const updated = [...formData.programmes];
        updated[index] = value;

        setFormData({
            ...formData,
            programmes: updated,
        });
    };

    const addProgramme = () => {
        setFormData({
            ...formData,
            programmes: [...formData.programmes, ""],
        });
    };

    const removeProgramme = (index) => {
        const updated = formData.programmes.filter(
            (_, i) => i !== index
        );

        setFormData({
            ...formData,
            programmes: updated.length ? updated : [""],
        });
    };

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = {
      ...formData,
      hod: formData.hod === "" ? null : formData.hod,
    };

    await updateDepartment(id, data);

    setToast({
      show: true,
      message: "Department updated successfully.",
      type: "success",
    });

    setTimeout(() => {
      navigate("/admin/departments");
    }, 1000);
  } catch (err) {
    console.error(err);

    setToast({
      show: true,
      message: "Failed to update department.",
      type: "error",
    });
  }
};

    if (loading) {
        return (
            <div className="text-center py-20">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f7ff] py-10 px-5">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-[#2f2f6f] mb-8">
                    Edit Department
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department Name *
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Department Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
                        required
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        About
                    </label>
                    <textarea
                        name="about"
                        placeholder="About"
                        rows={4}
                        value={formData.about}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vision
                    </label>
                    <textarea
                        name="vision"
                        placeholder="Vision"
                        rows={3}
                        value={formData.vision}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mission
                    </label>
                    <textarea
                        name="mission"
                        placeholder="Mission"
                        rows={3}
                        value={formData.mission}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
                    />

                 <label className="block text-sm font-medium text-gray-700 mb-2">
  Head of Department
</label>

<select
  name="hod"
  value={formData.hod}
  onChange={handleChange}
  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
>
                        <option value="">Select HOD</option>

                        {facultyList.map((faculty) => (
                            <option
                                key={faculty._id}
                                value={faculty._id}
                            >
                                {faculty.fullName} ({faculty.designation})
                            </option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        HOD Message
                    </label>
                    <textarea
                        name="hodMessage"
                        placeholder="HOD Message"
                        rows={4}
                        value={formData.hodMessage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Programmes Offered
                        </label>

                        {formData.programmes.map((programme, index) => (
                            <div
                                key={index}
                                className="flex gap-2 mb-2"
                            >
                                <input
                                    type="text"
                                    value={programme}
                                    onChange={(e) =>
                                        handleProgrammeChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeProgramme(index)}
                                    className="bg-red-500 text-white px-4 rounded-lg"
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addProgramme}
                            className="mt-2 bg-[#2f2f6f] text-white px-4 py-2 rounded-lg"
                        >
                            + Add Programme
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#2f2f6f] text-white px-8 py-3 rounded-lg hover:bg-[#25245d]"
                    >
                        Update Department
                    </button>
                </form>
            </div>

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() =>
                        setToast({ ...toast, show: false })
                    }
                />
            )}
        </div>
    );
}