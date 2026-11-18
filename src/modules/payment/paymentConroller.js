import { success } from "zod";
import asyncHandler from "../../utils/asyncHandler.js";
import { createPayment, verifyservice } from "./paymentSerice.js";

export const paymentController = asyncHandler(async (req, res) => {
  const { gateway } = req.body;
  const { bookingId } = req.params;

  console.log({ gateway, bookingId }, "booking data");

  const cretePayment = await createPayment(bookingId, gateway);

  res.status(200).json({
    success: true,

    data: cretePayment,
  });
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    bookingId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const data = {
    bookingId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  };

  console.log(data, "verify controller");
  

  const result = await verifyservice(data);

  return res
    .status(201)
    .json({
      success: true,
      message: "Payment verified successfully",
      data: result,
    });
});
