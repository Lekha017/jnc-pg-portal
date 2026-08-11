import ClubAssociation from "../models/ClubAssociation.js";
import cloudinary from "../utils/cloudinary.js";

// =========================================================
// CREATE CLUB / ASSOCIATION
// =========================================================

export const createClubAssociation = async (req, res) => {
  try {
    const {
      title,
      description,
      department,
      isPublished,
    } = req.body;

    // =======================================================
    // VALIDATION
    // =======================================================

    if (
      !title?.trim() ||
      !description?.trim() ||
      !department
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description and department are required.",
      });
    }

    // =======================================================
    // CHECK IMAGES
    // =======================================================

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "At least one gallery image is required.",
      });
    }

    // =======================================================
    // GET IMAGES FROM CLOUDINARY STORAGE
    // =======================================================

    const uploadedImages = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename,
    }));

    // =======================================================
    // CREATE DOCUMENT
    // =======================================================

    const clubAssociation =
      await ClubAssociation.create({
        title: title.trim(),
        description: description.trim(),
        department,
        images: uploadedImages,

        isPublished:
          isPublished === "false"
            ? false
            : isPublished === false
            ? false
            : true,
      });

    // =======================================================
    // POPULATE DEPARTMENT
    // =======================================================

    const populatedClub =
      await ClubAssociation.findById(
        clubAssociation._id
      ).populate(
        "department",
        "name code"
      );

    // =======================================================
    // RESPONSE
    // =======================================================

    return res.status(201).json({
      success: true,
      message:
        "Club/Association created successfully.",
      data: populatedClub,
    });
  } catch (error) {
    console.error(
      "Create Club/Association Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create club/association.",
      error: error.message,
    });
  }
};

// =========================================================
// GET ALL CLUBS / ASSOCIATIONS - ADMIN
// Includes BOTH published and unpublished
// =========================================================

export const getAllClubAssociationsAdmin = async (
  req,
  res
) => {
  try {
    const clubs =
      await ClubAssociation.find()
        .populate(
          "department",
          "name code"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: clubs.length,
      data: clubs,
    });
  } catch (error) {
    console.error(
      "Get All Club/Association Admin Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch clubs and associations.",
      error: error.message,
    });
  }
};

// =========================================================
// GET ALL PUBLISHED CLUBS / ASSOCIATIONS - PUBLIC
// =========================================================

export const getClubAssociations = async (
  req,
  res
) => {
  try {
    const clubs =
      await ClubAssociation.find({
        isPublished: true,
      })
        .populate(
          "department",
          "name code"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: clubs.length,
      data: clubs,
    });
  } catch (error) {
    console.error(
      "Get Club/Association Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch clubs and associations.",
      error: error.message,
    });
  }
};

// =========================================================
// GET CLUBS / ASSOCIATIONS BY DEPARTMENT - PUBLIC
// Only published records
// =========================================================

export const getClubAssociationsByDepartment =
  async (req, res) => {
    try {
      const { departmentId } = req.params;

      if (!departmentId) {
        return res.status(400).json({
          success: false,
          message:
            "Department ID is required.",
        });
      }

      const clubs =
        await ClubAssociation.find({
          department: departmentId,
          isPublished: true,
        })
          .populate(
            "department",
            "name code"
          )
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({
        success: true,
        count: clubs.length,
        data: clubs,
      });
    } catch (error) {
      console.error(
        "Get Department Clubs Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch department clubs and associations.",
        error: error.message,
      });
    }
  };

// =========================================================
// GET SINGLE CLUB / ASSOCIATION
// =========================================================

export const getClubAssociationById =
  async (req, res) => {
    try {
      const { id } = req.params;

      const club =
        await ClubAssociation.findById(
          id
        ).populate(
          "department",
          "name code"
        );

      if (!club) {
        return res.status(404).json({
          success: false,
          message:
            "Club/Association not found.",
        });
      }

      return res.status(200).json({
        success: true,
        data: club,
      });
    } catch (error) {
      console.error(
        "Get Club/Association By ID Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch club/association.",
        error: error.message,
      });
    }
  };

// =========================================================
// UPDATE CLUB / ASSOCIATION
// =========================================================

export const updateClubAssociation =
  async (req, res) => {
    try {
      const { id } = req.params;

      const club =
        await ClubAssociation.findById(id);

      if (!club) {
        return res.status(404).json({
          success: false,
          message:
            "Club/Association not found.",
        });
      }

      // =====================================================
      // UPDATE TITLE
      // =====================================================

      if (req.body.title !== undefined) {
        if (!req.body.title.trim()) {
          return res.status(400).json({
            success: false,
            message:
              "Title cannot be empty.",
          });
        }

        club.title =
          req.body.title.trim();
      }

      // =====================================================
      // UPDATE DESCRIPTION
      // =====================================================

      if (
        req.body.description !==
        undefined
      ) {
        if (
          !req.body.description.trim()
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Description cannot be empty.",
          });
        }

        club.description =
          req.body.description.trim();
      }

      // =====================================================
      // UPDATE DEPARTMENT
      // =====================================================

      if (
        req.body.department !==
        undefined
      ) {
        if (!req.body.department) {
          return res.status(400).json({
            success: false,
            message:
              "Department is required.",
          });
        }

        club.department =
          req.body.department;
      }

      // =====================================================
      // UPDATE PUBLISH STATUS
      // =====================================================

      if (
        req.body.isPublished !==
        undefined
      ) {
        club.isPublished =
          req.body.isPublished === true ||
          req.body.isPublished === "true";
      }

      // =====================================================
      // REMOVE OLD IMAGES
      // =====================================================

      if (req.body.removeImages) {
        let removeImages = [];

        try {
          removeImages =
            JSON.parse(
              req.body.removeImages
            );
        } catch (error) {
          console.error(
            "Invalid removeImages JSON:",
            error
          );

          removeImages = [];
        }

        if (
          Array.isArray(removeImages) &&
          removeImages.length > 0
        ) {
          for (
            const publicId of removeImages
          ) {
            try {
              await cloudinary.uploader.destroy(
                publicId
              );
            } catch (
              cloudinaryError
            ) {
              console.error(
                "Cloudinary delete error:",
                cloudinaryError
              );
            }
          }

          club.images =
            club.images.filter(
              (image) =>
                !removeImages.includes(
                  image.publicId
                )
            );
        }
      }

      // =====================================================
      // ADD NEW IMAGES
      // =====================================================

      if (
        req.files &&
        req.files.length > 0
      ) {
        const newImages =
          req.files.map((file) => ({
            url: file.path,
            publicId: file.filename,
          }));

        club.images.push(
          ...newImages
        );
      }

      // =====================================================
      // IMAGE VALIDATION
      // =====================================================

      if (
        !club.images ||
        club.images.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "At least one gallery image is required.",
        });
      }

      // =====================================================
      // MAX IMAGE VALIDATION
      // =====================================================

      if (club.images.length > 10) {
        return res.status(400).json({
          success: false,
          message:
            "A maximum of 10 gallery images are allowed.",
        });
      }

      // =====================================================
      // SAVE
      // =====================================================

      await club.save();

      // =====================================================
      // POPULATE
      // =====================================================

      const updatedClub =
        await ClubAssociation.findById(
          club._id
        ).populate(
          "department",
          "name code"
        );

      // =====================================================
      // RESPONSE
      // =====================================================

      return res.status(200).json({
        success: true,
        message:
          "Club/Association updated successfully.",
        data: updatedClub,
      });
    } catch (error) {
      console.error(
        "Update Club/Association Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update club/association.",
        error: error.message,
      });
    }
  };

// =========================================================
// DELETE CLUB / ASSOCIATION
// =========================================================

export const deleteClubAssociation =
  async (req, res) => {
    try {
      const { id } = req.params;

      const club =
        await ClubAssociation.findById(id);

      if (!club) {
        return res.status(404).json({
          success: false,
          message:
            "Club/Association not found.",
        });
      }

      // =====================================================
      // DELETE CLOUDINARY IMAGES
      // =====================================================

      for (const image of club.images) {
        if (image.publicId) {
          try {
            await cloudinary.uploader.destroy(
              image.publicId
            );
          } catch (
            cloudinaryError
          ) {
            console.error(
              "Cloudinary delete error:",
              cloudinaryError
            );
          }
        }
      }

      // =====================================================
      // DELETE MONGODB DOCUMENT
      // =====================================================

      await ClubAssociation.findByIdAndDelete(
        id
      );

      // =====================================================
      // RESPONSE
      // =====================================================

      return res.status(200).json({
        success: true,
        message:
          "Club/Association deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete Club/Association Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete club/association.",
        error: error.message,
      });
    }
  };