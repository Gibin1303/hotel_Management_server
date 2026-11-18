import payment from "./paymentSchema.js";
import bookingModel from "../booking/booking.model.js";


export const createPaymentRepo = async (data) => {
  return await payment.create(data);
};

import Payment from "./paymentSchema.js";



export const updatePaymentSuccessRepo = async ({
  bookingId,
  razorpay_payment_id,
}) => {
  const payment = await Payment.findOneAndUpdate(
    { bookingId },
    {
      status: "SUCCESS",
      transactionId: razorpay_payment_id,
      paidAt: new Date(),
    },
    {
      new: true,
    },
  );

  if (!payment) {
    throw new Error("Payment record not found");
  }

  return payment;
};




export const updateBookingPaymentRepo = async ({bookingId}) => {

  const booking = await bookingModel.findByIdAndUpdate(
    bookingId,
    {
      paymentStatus: "SUCCESS",
      bookingStatus: "CONFIRMED",
    },
    {
      new: true,
    }
  );


  if (!booking) {
    throw new Error("Booking not found");
  }


  return booking;
};
