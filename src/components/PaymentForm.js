import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Icon,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaPaypal, FaCreditCard, FaMobileAlt } from "react-icons/fa";

const PaymentForm = ({

  userDetails,
  amount,
  onSuccess,
  onFailure,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card"); // Default to card
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const toast = useToast();
  const router = useRouter();

  const handlePaymentSuccess = (paymentId) => {
     const role = JSON.parse(userDetails)?.role || "user";
    console.log("user role:", role)

    const dashboardPath = `/dashboard/${role}`;

    toast({
      title: "Payment Successful!",
      description: "Your booking has been confirmed.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    router.push(dashboardPath);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const paymentData = {
      //   bookingId,
      //   paymentMethod,
      //   amount,
      // };

      // if (paymentMethod === "card") {
      //   paymentData.cardDetails = {
      //     number: cardNumber,
      //     expiry: cardExpiry,
      //     cvc: cardCVC,
      //   };
      // }

      // const paymentResponse = await axios.post("/api/payment", paymentData);

      // if (paymentResponse.status === 201) {
      //   onSuccess(paymentResponse.data.payment.paymentId);
      // } else {
      //   onFailure();
      // }

      // Simulate successful payment for now
      handlePaymentSuccess("dummy-payment-id");
    } catch (error) {
      console.error("Payment error:", error);
      onFailure();
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {paymentMethod === "card" && (
        <Box>
          <FormControl isRequired>
            <FormLabel>Card Number</FormLabel>
            <Input
              type="text"
              placeholder="1234 5678 9123 4567"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
            <GridItem>
              <FormControl isRequired>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isRequired>
                <FormLabel>CVC</FormLabel>
                <Input
                  type="text"
                  placeholder="123"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <Button
            leftIcon={<Icon as={FaCreditCard} />}
            colorScheme="customRed"
            w="100%"
            type="submit"
            mt={4}
          >
            Pay ₦{amount}
          </Button>
        </Box>
      )}

      <Box mt={6}>
        <Flex flexDirection={{ base: "column", md: "row" }} gap={4}>
          <Button
            leftIcon={<Icon as={FaPaypal} />}
            colorScheme="blue"
            w="100%"
            mb={4}
            onClick={() => {
              setPaymentMethod("paypal");
              // Simulate successful payment for now
              handlePaymentSuccess("dummy-payment-id");
            }}
          >
            Pay with PayPal
          </Button>

          <Button
            leftIcon={<Icon as={FaMobileAlt} />}
            colorScheme="green"
            w="100%"
            mb={4}
            onClick={() => {
              setPaymentMethod("flutterwave");
              // Simulate successful payment for now
              handlePaymentSuccess("dummy-payment-id");
            }}
          >
            Pay with Flutterwave
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default PaymentForm;
