import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    createPlacement,
    updatePlacement,
} from "../../../services/placementService";
import {
    UploadCloud,
} from "lucide-react";
import { getDepartments } from "../../../services/departmentService";

function PlacementForm({
    selectedPlacement,
    setSelectedPlacement,
    triggerRefresh,
}) {
    const [departments, setDepartments] =
        useState([]);

    const [formData, setFormData] =
        useState({
            studentName: "",
            department: "",
            company: "",
            role: "",
            package: "",
            placementDate: "",
            year: "",
            testimonial: "",
            isPublished: true,
        });

    const [studentPhoto, setStudentPhoto] =
        useState(null);

    const [companyLogo, setCompanyLogo] =
        useState(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (selectedPlacement) {
            setFormData({
                studentName:
                    selectedPlacement.studentName || "",
                department:
                    selectedPlacement.department?._id || "",
                company:
                    selectedPlacement.company || "",
                role:
                    selectedPlacement.role || "",
                package:
                    selectedPlacement.package || "",
                placementDate:
                    selectedPlacement.placementDate?.split(
                        "T"
                    )[0] || "",
                year:
                    selectedPlacement.year || "",
                testimonial:
                    selectedPlacement.testimonial || "",
                isPublished:
                    selectedPlacement.isPublished,
            });
        }
    }, [selectedPlacement]);

    const fetchDepartments = async () => {
        try {
            const res = await getDepartments();

            console.log("FULL RESPONSE:", res);

            setDepartments(res || []);
        } catch (error) {
            console.error(error);
        }
    };
    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const resetForm = () => {
        setFormData({
            studentName: "",
            department: "",
            company: "",
            role: "",
            package: "",
            placementDate: "",
            year: "",
            testimonial: "",
            isPublished: true,
        });

        setStudentPhoto(null);
        setCompanyLogo(null);
        setSelectedPlacement(null);
    };

    const handleSubmit =
        async (e) => {
            e.preventDefault();

            try {
                const data =
                    new FormData();

                Object.keys(formData).forEach(
                    (key) => {
                        data.append(
                            key,
                            formData[key]
                        );
                    }
                );

                if (studentPhoto) {
                    data.append(
                        "studentPhoto",
                        studentPhoto
                    );
                }

                if (companyLogo) {
                    data.append(
                        "companyLogo",
                        companyLogo
                    );
                }

                if (selectedPlacement) {
                    await updatePlacement(
                        selectedPlacement._id,
                        data
                    );

                    toast.success(
                        "Placement Updated Successfully"
                    );
                } else {
                    await createPlacement(
                        data
                    );

                    toast.success(
                        "Placement Created Successfully"
                    );
                }

                resetForm();
                triggerRefresh();
            } catch (error) {
                console.error(error);

                toast.error(
                    "Failed to save placement"
                );
            }
        };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">

            <h2 className="text-2xl font-bold text-[#2D2A70] mb-6">
                {selectedPlacement
                    ? "Edit Placement"
                    : "Add Placement"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>
                    <label className="block font-medium mb-2">
                        Student Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-gray-300"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">
                        Department <span className="text-red-500">*</span>
                    </label>

                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-gray-300"
                        required
                    >
                        <option value="">
                            Select Department
                        </option>

                        {departments.map((dept) => (
                            <option
                                key={dept._id}
                                value={dept._id}
                            >
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Company <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-gray-300"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Role <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-gray-300"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Package (LPA) <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="number"
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-gray-300"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Placement Date <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="date"
                        name="placementDate"
                        value={formData.placementDate}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-gray-300"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Placement Year <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-gray-300"
                        required
                    />
                </div>

                <textarea
                    rows="4"
                    name="testimonial"
                    placeholder="Testimonial"
                    value={
                        formData.testimonial
                    }
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-gray-300"
                />

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Student Photo */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-3">
                            Student Photo <span className="text-red-500">*</span>
                        </label>

                        <label className="cursor-pointer block">

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    setStudentPhoto(
                                        e.target.files[0]
                                    )
                                }
                            />

                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#2D2A70] transition">

                                <div className="flex justify-center mb-3">
                                    <UploadCloud
                                        size={50}
                                        className="text-[#2D2A70]"
                                    />
                                </div>

                                <h3 className="font-semibold text-lg text-gray-700">
                                    Click to Upload
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    PNG, JPG, JPEG
                                </p>

                                {studentPhoto && (
                                    <p className="mt-3 text-green-600 text-sm">
                                        {studentPhoto.name}
                                    </p>
                                )}

                            </div>

                        </label>
                    </div>

                    {/* Company Logo */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-3">
                            Company Logo <span className="text-red-500">*</span>
                        </label>

                        <label className="cursor-pointer block">

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    setCompanyLogo(
                                        e.target.files[0]
                                    )
                                }
                            />

                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#2D2A70] transition">

                                <div className="flex justify-center mb-3">
                                    <UploadCloud
                                        size={50}
                                        className="text-[#2D2A70]"
                                    />
                                </div>

                                <h3 className="font-semibold text-lg text-gray-700">
                                    Click to Upload
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    PNG, JPG, JPEG
                                </p>

                                {companyLogo && (
                                    <p className="mt-3 text-green-600 text-sm">
                                        {companyLogo.name}
                                    </p>
                                )}

                            </div>

                        </label>
                    </div>

                </div>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isPublished"
                        checked={
                            formData.isPublished
                        }
                        onChange={handleChange}
                    />

                    Published
                </label>

                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="bg-[#2D2A70] text-white px-6 py-3 rounded-xl"
                    >
                        {selectedPlacement
                            ? "Update"
                            : "Create"}
                    </button>

                    {selectedPlacement && (
                        <button
                            type="button"
                            onClick={resetForm}
                           className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                    )}

                </div>

            </form>

        </div>
    );
}

export default PlacementForm;