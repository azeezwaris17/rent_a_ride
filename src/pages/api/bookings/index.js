import Booking from "../../../models/booking";
import connectDB from "../../api/config/connectDB";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "POST":
      return createBooking(req, res);
    case "GET":
      return getBookings(req, res);
    case "PUT":
      return updateBooking(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const createBooking = async (req, res) => {
  try {
    console.log("Received booking data:", req.body);

    // Validate request body
    const {
      bookingId,
      car,
      user,
      location,
      startDate,
      endDate,
      totalPrice,
      bookingStatus,
      paymentStatus,
    } = req.body;

    if (!bookingId || !car || !user || !location || !startDate || !endDate || !totalPrice) {
      throw new Error("Missing required fields");
    }

    const booking = new Booking({
      bookingId,
      car,
      user,
      location,
      startDate,
      endDate,
      totalPrice,
      bookingStatus,
      paymentStatus,
    });

    await booking.save();
    console.log("Booking saved successfully:", booking);

    res.status(201).json({
      success: true,
      message: "Car booked successfully",
      booking,
    });
  } catch (error) {
    console.error("Error in createBooking:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateBooking = async (req, res) => {
  const { bookingId } = req.query;
  const { bookingStatus, paymentStatus, paymentId } = req.body;

  try {
    console.log("Updating booking with ID:", bookingId);

    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = bookingStatus || booking.bookingStatus;
    booking.paymentStatus = paymentStatus || booking.paymentStatus;
    if (paymentId) {
      booking.paymentId = paymentId;
    }

    await booking.save();
    console.log("Booking updated successfully:", booking);

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error in updateBooking:", error.message);
    res.status(500).json({ message: error.message });
  }
};
