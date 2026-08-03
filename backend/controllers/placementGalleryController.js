import PlacementGallery from "../models/PlacementGallery.js";
import cloudinary from "../utils/cloudinary.js";

/* ======================================================
   Get All Galleries
====================================================== */

export const getPlacementGalleries = async (req, res) => {
  try {
    const galleries = await PlacementGallery.find().sort({
      eventDate: -1,
    });

    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ======================================================
   Get Single Gallery
====================================================== */

export const getPlacementGallery = async (req, res) => {
  try {
    const gallery = await PlacementGallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Placement Gallery not found",
      });
    }

    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ======================================================
   Create Gallery
====================================================== */

export const createPlacementGallery = async (req, res) => {
  try {
    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "placement-gallery",
        });

        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    const gallery = await PlacementGallery.create({
      title: req.body.title,
      description: req.body.description,
      eventDate: req.body.eventDate,
      images: uploadedImages,
      isPublished: req.body.isPublished,
    });

    res.status(201).json(gallery);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ======================================================
   Update Gallery
====================================================== */

export const updatePlacementGallery = async (req, res) => {
  try {
    const gallery = await PlacementGallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Placement Gallery not found",
      });
    }

    let images = gallery.images;

    if (req.files && req.files.length > 0) {

      for (const image of gallery.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      images = [];

      for (const file of req.files) {

        const result = await cloudinary.uploader.upload(file.path, {
          folder: "placement-gallery",
        });

        images.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    gallery.title = req.body.title;
    gallery.description = req.body.description;
    gallery.eventDate = req.body.eventDate;
    gallery.isPublished = req.body.isPublished;
    gallery.images = images;

    await gallery.save();

    res.status(200).json(gallery);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* ======================================================
   Delete Gallery
====================================================== */

export const deletePlacementGallery = async (req, res) => {
  try {
    const gallery = await PlacementGallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        message: "Placement Gallery not found",
      });
    }

    for (const image of gallery.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await gallery.deleteOne();

    res.status(200).json({
      message: "Placement Gallery deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};