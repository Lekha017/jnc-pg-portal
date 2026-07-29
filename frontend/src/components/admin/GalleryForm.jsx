import { useState, useEffect } from "react";
import {
    Images,
    UploadCloud,
    Save,
    RotateCcw,
} from "lucide-react";
import { toast } from "react-toastify";

import {
    createGallery,
    updateGallery,
} from "../../services/galleryService";

const GalleryForm = ({
    selectedGallery,
    setSelectedGallery,
    triggerRefresh,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const [coverPreview, setCoverPreview] = useState("");

    const [galleryPreview, setGalleryPreview] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        isPublished: true,
        coverImage: null,
        images: [],
    });

    useEffect(() => {
        if (!selectedGallery) return;

        setIsEditing(true);

        setFormData({
            title: selectedGallery.title || "",
            description: selectedGallery.description || "",
            startDate:
                selectedGallery.startDate?.split("T")[0] || "",
            endDate:
                selectedGallery.endDate?.split("T")[0] || "",
            isPublished: selectedGallery.isPublished,
            coverImage: null,
            images: [],
        });

        setCoverPreview(
            selectedGallery.coverImage?.url || ""
        );

        setGalleryPreview(
            selectedGallery.images || []
        );
    }, [selectedGallery]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

    const handleCoverImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            coverImage: file,
        }));

        setCoverPreview(
            URL.createObjectURL(file)
        );
    };

    const handleGalleryImages = (e) => {
        const files = Array.from(
            e.target.files
        );

        if (files.length === 0) return;

        setFormData((prev) => ({
            ...prev,
            images: files,
        }));

        setGalleryPreview(
            files.map((file) => ({
                url: URL.createObjectURL(file),
            }))
        );
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            isPublished: true,
            coverImage: null,
            images: [],
        });

        setCoverPreview("");

        setGalleryPreview([]);

        setSelectedGallery(null);

        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            data.append("title", formData.title);
            data.append(
                "description",
                formData.description
            );
            data.append(
                "startDate",
                formData.startDate
            );
            data.append(
                "endDate",
                formData.endDate
            );
            data.append(
                "isPublished",
                formData.isPublished
            );

            if (formData.coverImage) {
                data.append(
                    "coverImage",
                    formData.coverImage
                );
            }

            formData.images.forEach((image) => {
                data.append("images", image);
            });

            if (isEditing) {
                await updateGallery(
                    selectedGallery._id,
                    data
                );

                toast.success(
                    "Gallery Updated Successfully"
                );
            } else {
                await createGallery(data);

                toast.success(
                    "Gallery Created Successfully"
                );
            }

            resetForm();

            triggerRefresh();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Operation Failed"
            );
        }
    };
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sticky top-6">

            {/* Heading */}
            <div className="flex items-center gap-3 mb-8">

                <div className="bg-[#2D2A70] p-3 rounded-xl text-white">
                    <Images size={24} />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-[#2D2A70]">
                        {isEditing ? "Update Gallery" : "Create Gallery"}
                    </h2>

                    <p className="text-gray-500 text-sm">
                        {isEditing
                            ? "Update the selected gallery."
                            : "Upload a new event gallery."}
                    </p>
                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Gallery Title */}
                <div>

                    <label className="block font-semibold text-gray-700 mb-2">
                        Gallery Title
                        <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter gallery title"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                    />

                </div>

                {/* Description */}
                <div>

                    <label className="block font-semibold text-gray-700 mb-2">
                        Description
                        <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Gallery description..."
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                    />

                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-5">

                    <div>

                        <label className="block font-semibold text-gray-700 mb-2">
                            Start Date
                        </label>

                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                        />

                    </div>

                    <div>

                        <label className="block font-semibold text-gray-700 mb-2">
                            End Date
                        </label>

                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                        />

                    </div>

                </div>

                {/* Cover Image */}
                <div>

                    <label className="block font-semibold text-gray-700 mb-3">
                        Cover Image
                        <span className="text-red-500">*</span>
                    </label>

                    <label
                        htmlFor="coverUpload"
                        className="border-2 border-dashed border-gray-300 rounded-2xl h-48 flex items-center justify-center cursor-pointer hover:border-[#2D2A70] transition overflow-hidden"
                    >

                        {coverPreview ? (

                            <img
                                src={coverPreview}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />

                        ) : (

                            <div className="text-center">

                                <UploadCloud
                                    size={40}
                                    className="mx-auto text-[#2D2A70] mb-3"
                                />

                                <p className="font-medium">
                                    Click to Upload Cover Image
                                </p>

                                <p className="text-sm text-gray-500">
                                    PNG, JPG, JPEG
                                </p>

                            </div>

                        )}

                    </label>

                    <input
                        id="coverUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImage}
                        className="hidden"
                    />

                </div>

                {/* Gallery Images */}
                <div>

                    <label className="block font-semibold text-gray-700 mb-3">
                        Gallery Images
                    </label>

                    <label
                        htmlFor="galleryUpload"
                        className="border-2 border-dashed border-gray-300 rounded-2xl min-h-52 p-5 flex flex-wrap gap-3 items-center justify-center cursor-pointer hover:border-[#2D2A70] transition"
                    >

                        {galleryPreview.length > 0 ? (

                            galleryPreview.map((image, index) => (

                                <img
                                    key={index}
                                    src={image.url}
                                    alt=""
                                    className="w-24 h-24 rounded-xl object-cover border"
                                />

                            ))

                        ) : (

                            <div className="text-center w-full">

                                <UploadCloud
                                    size={40}
                                    className="mx-auto text-[#2D2A70] mb-3"
                                />

                                <p className="font-medium">
                                    Click to Upload Multiple Images
                                </p>

                                <p className="text-sm text-gray-500">
                                    Select multiple files
                                </p>

                            </div>

                        )}

                    </label>

                    <input
                        id="galleryUpload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleGalleryImages}
                        className="hidden"
                    />

                </div>

                {/* Publish */}
                <div className="flex items-center gap-3">

                    <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleChange}
                        className="w-5 h-5 accent-[#2D2A70]"
                    />

                    <span className="font-medium text-gray-700">
                        Publish Immediately
                    </span>

                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-3">

                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white py-3 rounded-xl font-semibold transition"
                    >
                        <Save size={18} />

                        {isEditing
                            ? "Update Gallery"
                            : "Save Gallery"}
                    </button>

                    <button
                        type="button"
                        onClick={resetForm}
                        className="flex items-center justify-center gap-2 px-6 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
                    >
                        <RotateCcw size={18} />

                        Reset
                    </button>

                </div>

            </form>

        </div>
    );
};

export default GalleryForm;