import EventGallery from "../models/EventGallery.js";

console.log(EventGallery.schema.obj);

// Create Gallery
export const createGallery = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);

        let coverImage = {
            url: "https://placehold.co/1200x800?text=Gallery+Cover",
            public_id: "",
        };

        // Upload Cover Image
        if (req.files?.coverImage?.length > 0) {
            coverImage = {
                url: req.files.coverImage[0].path,
                public_id: req.files.coverImage[0].filename,
            };
        }

        // Upload Gallery Images
        const images = [];

        if (req.files?.images?.length > 0) {
            req.files.images.forEach((image) => {
                images.push({
                    url: image.path,
                    public_id: image.filename,
                });
            });
        }

        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one gallery image.",
            });
        }

        if (new Date(req.body.startDate) > new Date(req.body.endDate)) {
            return res.status(400).json({
                success: false,
                message: "End date cannot be earlier than the start date.",
            });
        }

        const gallery = await EventGallery.create({
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,

            coverImage,
            images,

            isPublished:
                req.body.isPublished === "true" ||
                req.body.isPublished === true,

            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Gallery created successfully.",
            data: gallery,
        });

    } catch (error) {

        console.error("ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// Get Published Galleries (Public)
export const getGalleries = async (req, res) => {
    try {
        const galleries = await EventGallery.find({
            isPublished: true,
        })
            .populate("createdBy", "fullName")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: galleries.length,
            data: galleries,
        });
    } catch (error) {
        console.error("GET GALLERY ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Gallery
export const getGalleryById = async (req, res) => {
    try {
        const gallery = await EventGallery.findById(req.params.id)
            .populate("createdBy", "fullName email");

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: gallery,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Gallery
export const updateGallery = async (req, res) => {
    try {
        const gallery = await EventGallery.findById(req.params.id);

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found.",
            });
        }

        gallery.title = req.body.title || gallery.title;
        gallery.description = req.body.description || gallery.description;
        gallery.startDate = req.body.startDate || gallery.startDate;
        gallery.endDate = req.body.endDate || gallery.endDate;
        gallery.isPublished =
            req.body.isPublished === "true" ||
            req.body.isPublished === true;

        // Replace Cover Image
        if (req.files?.coverImage?.length > 0) {
            gallery.coverImage = {
                url: req.files.coverImage[0].path,
                public_id: req.files.coverImage[0].filename,
            };
        }

        // Append New Images
        if (req.files?.images?.length > 0) {
            req.files.images.forEach((image) => {
                gallery.images.push({
                    url: image.path,
                    public_id: image.filename,
                });
            });
        }

        gallery.imageCount = gallery.images.length;

        await gallery.save();

        res.status(200).json({
            success: true,
            message: "Gallery updated successfully.",
            data: gallery,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Gallery
export const deleteGallery = async (req, res) => {
    try {
        const gallery = await EventGallery.findById(req.params.id);

        if (!gallery) {
            return res.status(404).json({
                success: false,
                message: "Gallery not found.",
            });
        }

        await gallery.deleteOne();

        res.status(200).json({
            success: true,
            message: "Gallery deleted successfully.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getAllGalleries = async (req, res) => {
    try {
        const galleries = await EventGallery.find()
            .populate("createdBy", "fullName")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: galleries.length,
            data: galleries,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};