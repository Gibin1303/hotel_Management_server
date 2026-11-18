import {
  createPaymentRepo,
  updateBookingPaymentRepo,
  updatePaymentSuccessRepo,
} from "./paymenrRepo.js";
import bookingModel from "../booking/booking.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { hex } from "zod";
import ApiError from "../../utils/apiError.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const gatewaycheck = ["RAZORPAY", "STRIPE"];

export const createPayment = async (bookingId, gateway) => {
  const booking = await bookingModel.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  const selectedGateway = gateway?.toUpperCase();

  if (!selectedGateway || !gatewaycheck.includes(selectedGateway)) {
    throw new Error("Invalid payment gateway");
  }

  const payment = await createPaymentRepo({
    bookingId: booking._id,
    customerId: booking.customerId,
    amount: booking.priceDetails.totalAmount,
    gateway: selectedGateway,
    status: "PENDING",
  });

  console.log(payment, "payment data");

  if (selectedGateway === "RAZORPAY") {
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(booking.priceDetails.totalAmount * 100), // Convert INR to paise (avoid decimals)
      currency: "INR",
      receipt: payment._id.toString(), // Link your DB payment ID as receipt
    });

    // Save Razorpay's order ID to your payment record for future verification
    payment.orderId = razorpayOrder.id;
    await payment.save();

    // Return what the frontend needs to open the Razorpay popup
    return {
      paymentId: payment._id,
      gateway: "RAZORPAY",
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    };
  }

  return payment;
};

export const verifyservice = async (data) => {
  console.log(data, "verify service");
  const {
    bookingId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = data;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new ApiError(400, "Inavlid payment signature");
  }

  const payment = await updatePaymentSuccessRepo({
    bookingId,
    razorpay_payment_id,
  });

  const booking = await updateBookingPaymentRepo({ bookingId });

  return {
    payment,
    booking,
  };
};
