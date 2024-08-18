import Payment from "../../../models/payment";
import connectDB from "../../api/config/connectDB";
import axios from "axios";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { bookingId, paymentMethod, amount, cardDetails } = req.body;

    try {
      let paymentStatus = "failed";
      let paymentId = `PAYMENT-${Date.now()}`;
      let paymentResponse;

      if (paymentMethod === "paypal") {
        paymentResponse = await processPayPalPayment({ amount });
      } else if (paymentMethod === "flutterwave") {
        paymentResponse = await processFlutterwavePayment({ amount });
      } else if (paymentMethod === "card" && cardDetails) {
        paymentResponse = await processCardPayment({ amount, cardDetails });
      }

      if (paymentResponse && paymentResponse.status === "success") {
        paymentStatus = "paid";
        paymentId = paymentResponse.paymentId || paymentId;
      }

      const payment = new Payment({
        bookingId,
        paymentMethod,
        amount,
        status: paymentStatus,
        paymentId,
        currency: "USD",
        transactionDetails: paymentResponse.transactionDetails || {},
      });
      await payment.save();

      res
        .status(paymentStatus === "paid" ? 201 : 400)
        .json({ success: paymentStatus === "paid", payment });
    } catch (error) {
      console.error("Payment processing error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function processPayPalPayment({ amount }) {
  try {
    const response = await axios.post(
      "https://api.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer YOUR_PAYPAL_ACCESS_TOKEN`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "CREATED") {
      return {
        status: "success",
        paymentId: response.data.id,
        transactionDetails: response.data,
      };
    } else {
      return { status: "error" };
    }
  } catch (error) {
    console.error("PayPal payment error:", error);
    return { status: "error" };
  }
}

async function processFlutterwavePayment({ amount }) {
  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/charges?type=mobilemoneyghana",
      {
        tx_ref: `TX-${Date.now()}`,
        amount: amount,
        currency: "USD",
        email: "customer@example.com",
        phone_number: "0123456789",
        payment_type: "mobilemoneyghana",
      },
      {
        headers: {
          Authorization: `Bearer YOUR_FLUTTERWAVE_SECRET_KEY`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      return {
        status: "success",
        paymentId: response.data.data.id,
        transactionDetails: response.data,
      };
    } else {
      return { status: "error" };
    }
  } catch (error) {
    console.error("Flutterwave payment error:", error);
    return { status: "error" };
  }
}

async function processCardPayment({ amount, cardDetails }) {
  try {
    // Implement card payment processing logic here

    const response = await axios.post(
      "https://api.stripe.com/v1/charges",
      new URLSearchParams({
        amount: amount * 100, // Convert to cents
        currency: "usd",
        source: cardDetails.token,
        description: "Payment for booking",
      }),
      {
        headers: {
          Authorization: `Bearer YOUR_STRIPE_SECRET_KEY`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data.status === "succeeded") {
      return {
        status: "success",
        paymentId: response.data.id,
        transactionDetails: response.data,
      };
    } else {
      return { status: "error" };
    }
  } catch (error) {
    console.error("Card payment error:", error);
    return { status: "error" };
  }
}
