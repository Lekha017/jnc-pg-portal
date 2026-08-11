import Application from "../models/Application.js";

const generateApplicationNumber = () => {
  const year = new Date().getFullYear();

  const random = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `JNC-PG-${year}-${random}`;
};

// Apply
// Apply
export const submitApplication = async (req, res) => {
  try {
    const documents = {
      photograph:
        req.files?.photograph?.[0]?.path || "",

      aadhaarDocument:
        req.files?.aadhaarDocument?.[0]?.path || "",

      tenthMarksheet:
        req.files?.tenthMarksheet?.[0]?.path || "",

      twelfthMarksheet:
        req.files?.twelfthMarksheet?.[0]?.path || "",

      degreeCertificate:
        req.files?.degreeCertificate?.[0]?.path || "",

      degreeMarksheets:
        req.files?.degreeMarksheets?.[0]?.path || "",

      transferCertificate:
        req.files?.transferCertificate?.[0]?.path || "",

      migrationCertificate:
        req.files?.migrationCertificate?.[0]?.path || "",
    };

    const application = await Application.create({
      ...req.body,

      // JNC is a women's college
      gender: "Female",

      user: req.user._id,

      documents,

      applicationNumber:
        generateApplicationNumber(),
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: application,
    });
  } catch (error) {
    console.error(
      "Submit Application Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// My Application
export const getMyApplication = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    });

    // Generate an application number for
    // older applications that don't have one.
    for (const application of applications) {
      if (!application.applicationNumber) {
        application.applicationNumber =
          generateApplicationNumber();

        await application.save();
      }
    }

    // Populate programme details after saving.
    await Application.populate(applications, {
      path: "programId",
      select: "programName shortCode category",
    });

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error(
      "Get My Application Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Application
export const updateApplication = async (
  req,
  res
) => {
  try {
    const application =
      await Application.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    Object.assign(application, req.body);

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application updated.",
      data: application,
    });
  } catch (error) {
    console.error(
      "Update Application Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};