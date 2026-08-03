import { useEffect, useState } from "react";

import BasicInformationForm from "./BasicInformationForm";
import Button from "../common/Button";

const FacultyForm = ({
  initialData = {},
  departments,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    designation: "",
    departments: "",
    bio: "",
    image: null,
  });

  useEffect(() => {
    setFormData({
      _id: initialData._id || "",
      fullName: initialData.fullName || "",
      email: initialData.email || "",
      password: "",
      phone: initialData.phone || "",
      designation: initialData.designation || "",
      departments: initialData.departments?.[0]?._id || "",
      bio: initialData.bio || "",
      image: initialData.image || null,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "_id") return;

      if (key === "image") {
        if (value instanceof File) {
          data.append("image", value);
        }
      } else if (
        key !== "password" ||
        value.trim() !== ""
      ) {
        data.append(key, value);
      }
    });

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <BasicInformationForm
        formData={formData}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        departments={departments}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          text={initialData?._id ? "Update Faculty" : "Save Faculty"}
          className="w-auto px-8"
        />
      </div>
    </form>
  );
};

export default FacultyForm;