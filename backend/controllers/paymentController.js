import crypto from "crypto";

import razorpay from "../config/razorpay.js";
import Application from "../models/Application.js";

// Create Razorpay Order
export const createPaymentOrder = async (req, res) => {
  try {
    const { applicationId } = req.body;

    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: "Application ID is required.",
      });
    }

    const application = await Application.findOne({
      _id: applicationId,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    // Do not create another payment order
    // after successful payment.
    if (
      application.paymentStatus === "Paid" &&
      application.applicationNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "Application payment is already completed.",
      });
    }

    const amount = 50000; // ₹500 in paise

    const options = {
      amount,
      currency: "INR",
      receipt: `application_${application._id}`,
    };

    const order = await razorpay.orders.create(options);

    application.razorpayOrderId = order.id;
    application.applicationFee = 500;
    application.paymentStatus = "Pending";
    application.status = "Pending Payment";

    await application.save();

    res.status(201).json({
      success: true,
      message: "Payment order created successfully.",
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
        applicationId: application._id,
      },
    });
  } catch (error) {
    console.error(
      "Create Payment Order Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  try {
    const {
      applicationId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !applicationId ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are incomplete.",
      });
    }

    const application = await Application.findOne({
      _id: applicationId,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    // Already successfully paid
    if (
      application.paymentStatus === "Paid" &&
      application.applicationNumber
    ) {
      return res.status(200).json({
        success: true,
        message: "Payment has already been verified.",
        data: application,
      });
    }

    // Make sure the Razorpay order belongs
    // to this application.
    if (
      application.razorpayOrderId !==
      razorpay_order_id
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment order.",
      });
    }

    // Generate expected Razorpay signature
    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // Verify signature
    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed.",
      });
    }

    // Generate unique application number
    const currentYear = new Date().getFullYear();

    const applicationNumber = `JNC-PG-${currentYear}-${Date.now()}`;

    application.applicationNumber =
      applicationNumber;

    application.razorpayPaymentId =
      razorpay_payment_id;

    application.paymentStatus = "Paid";

    application.status = "Submitted";

    await application.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      data: application,
    });
  } catch (error) {
    console.error(
      "Verify Payment Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};