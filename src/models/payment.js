import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true, unique: true },
    bookingId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Success" },
  },
  { timestamps: true }
);

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
