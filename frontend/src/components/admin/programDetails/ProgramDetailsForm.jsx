import { useEffect, useState } from "react";

import {
    createProgramDetails,
    updateProgramDetails,
} from "../../../services/programDetailsService";

import { getPrograms } from "../../../services/programService";

import { toast } from "react-toastify";

function ProgramDetailsForm({
    selectedDetails,
    setSelectedDetails,
    triggerRefresh,
}) {
    const [programs, setPrograms] = useState([]);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            program: "",

            degreeTitle: "",
            departmentName: "",

            heroImage: "",

            contactPerson1: "",
            contactPhone1: "",

            contactPerson2: "",
            contactPhone2: "",

            email: "",

            eligibility: "",
            programmeDetails: "",

            selectionProcess: "",

            programmeObjectives: "",

            programmeOutcomes: "",

            potentialCareerOptions: "",

            syllabus: "",

            syllabusPdf: null,

            isActive: true,
        });

    useEffect(() => {
        loadPrograms();
    }, []);

    useEffect(() => {
        if (selectedDetails) {
            setFormData({
                ...selectedDetails,
                program:
                    selectedDetails.program?._id || "",
            });
        }
    }, [selectedDetails]);

    const loadPrograms = async () => {
        try {
            const res = await getPrograms();

            setPrograms(res.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const {
            name,
            value,
            checked,
            type,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };


    const handlePdfUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            syllabusPdf: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.program ||
            !formData.degreeTitle ||
            !formData.eligibility ||
            !formData.programmeDetails
        ) {
            toast.error(
                "Please fill all mandatory fields."
            );
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null) {
                    data.append(key, formData[key]);
                }
            });

            if (selectedDetails) {
                await updateProgramDetails(
                    selectedDetails._id,
                    data
                );

                toast.success("Program Details Updated");
            } else {
                await createProgramDetails(data);

                toast.success("Program Details Added");
            }

            triggerRefresh();

            setSelectedDetails(null);

            setFormData({
                program: "",

                degreeTitle: "",
                departmentName: "",

                heroImage: "",

                contactPerson1: "",
                contactPhone1: "",

                contactPerson2: "",
                contactPhone2: "",

                email: "",

                eligibility: "",
                programmeDetails: "",

                selectionProcess: "",

                programmeObjectives: "",

                programmeOutcomes: "",

                potentialCareerOptions: "",

                syllabus: "",

                syllabusPdf: null,

                isActive: true,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Operation Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const inputStyle =
        "w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#2D2A70]";

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">

            <h2 className="text-xl font-bold text-[#2D2A70] mb-6">
                {selectedDetails
                    ? "Edit Program Details"
                    : "Add Program Details"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* PROGRAM */}

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Program
                        <span className="text-red-500 ml-1">
                            *
                        </span>
                    </label>

                    <select
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        className={inputStyle}
                    >
                        <option value="">
                            Select Program
                        </option>

                        {programs.map((program) => (
                            <option
                                key={program._id}
                                value={program._id}
                            >
                                {program.programName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* DEGREE */}

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Degree Title
                        <span className="text-red-500 ml-1">
                            *
                        </span>
                    </label>

                    <input
                        type="text"
                        name="degreeTitle"
                        value={formData.degreeTitle}
                        onChange={handleChange}
                        className={inputStyle}
                    />
                </div>

                <input
                    type="text"
                    name="departmentName"
                    placeholder="Department Name"
                    value={formData.departmentName}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <input
                    type="text"
                    name="heroImage"
                    placeholder="Hero Image URL"
                    value={formData.heroImage}
                    onChange={handleChange}
                    className={inputStyle}
                />


                <input
                    type="text"
                    name="contactPerson1"
                    placeholder="Contact Person 1"
                    value={formData.contactPerson1}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <input
                    type="text"
                    name="contactPhone1"
                    placeholder="Contact Phone 1"
                    value={formData.contactPhone1}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <input
                    type="text"
                    name="contactPerson2"
                    placeholder="Contact Person 2"
                    value={formData.contactPerson2}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <input
                    type="text"
                    name="contactPhone2"
                    placeholder="Contact Phone 2"
                    value={formData.contactPhone2}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <textarea
                    rows="4"
                    name="eligibility"
                    placeholder="Eligibility *"
                    value={formData.eligibility}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <textarea
                    rows="5"
                    name="programmeDetails"
                    placeholder="Programme Details *"
                    value={formData.programmeDetails}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <textarea
                    rows="4"
                    name="selectionProcess"
                    placeholder="Selection Process"
                    value={formData.selectionProcess}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <textarea
                    rows="4"
                    name="programmeObjectives"
                    placeholder="Programme Objectives"
                    value={formData.programmeObjectives}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <textarea
                    rows="4"
                    name="programmeOutcomes"
                    placeholder="Programme Outcomes"
                    value={formData.programmeOutcomes}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <textarea
                    rows="4"
                    name="potentialCareerOptions"
                    placeholder="Potential Career Options"
                    value={
                        formData.potentialCareerOptions
                    }
                    onChange={handleChange}
                    className={inputStyle}
                />


                <textarea
                    rows="4"
                    name="syllabus"
                    placeholder="Syllabus"
                    value={formData.syllabus}
                    onChange={handleChange}
                    className={inputStyle}
                />

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        Upload Syllabus PDF
                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        className={inputStyle}
                    />

                    {formData.syllabusPdf && (
                        <p className="text-sm text-green-600 mt-2">
                            {formData.syllabusPdf.name || "PDF Selected"}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                        className="h-4 w-4 accent-[#2D2A70]"
                    />

                    <label>
                        Active Details
                    </label>
                </div>

                <div className="flex gap-3">

                    <button
                        type="submit"
                        disabled={loading}
                        className="
              bg-[#2D2A70]
              text-white
              px-6
              py-3
              rounded-xl
            "
                    >
                        {loading
                            ? "Saving..."
                            : selectedDetails
                                ? "Update Details"
                                : "Save Details"}
                    </button>

                    {selectedDetails && (
                        <button
                            type="button"
                            onClick={() =>
                                setSelectedDetails(null)
                            }
                            className="
                border
                border-gray-300
                px-6
                py-3
                rounded-xl
              "
                        >
                            Cancel
                        </button>
                    )}

                </div>

            </form>
        </div>
    );
}

export default ProgramDetailsForm;