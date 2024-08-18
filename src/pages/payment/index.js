import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Container,
  Center,
  Spacer,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PaymentForm from "../../components/PaymentForm";
import axios from "axios";

const PaymentPage = () => {
  const router = useRouter();
  const { carDetails, userDetails, bookingDetails, bookingId } = router.query;

  const toast = useToast();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    if (!bookingId) {
      router.push("/"); // Redirect to home if no booking ID
    }
  }, [bookingId, router]);

  const handlePaymentSuccess = async (paymentId) => {
    try {
      await axios.put(`/api/bookings?bookingId=${bookingId}`, {
        amount: parseJSON(carDetails)?.totalPrice || 0,
        bookingStatus: "pending",
        paymentStatus: "paid",
        paymentId,
      });

      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating booking:", error);
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setPaymentStatus("failed");
    }
  };

  const handlePaymentFailure = () => {
    toast({
      title: "Payment Failed",
      description: "There was an issue processing your payment.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    setPaymentStatus("failed");
  };

  const parseJSON = (data) => {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse JSON:", e, "Data:", data);
      return null;
    }
  };

  return (
    <>
      <Box p={8}>
        <Heading mb={2}>Make Payment</Heading>
        <Grid
          h="100vh"
          w="100vw"
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          alignItems="center"
          gap={4}
        >
          {/* Payment Summary */}
          <GridItem w="100%" p={8} display={{ base: "none", md: "block" }}>
            <Container centerContent>
              <Box w="full" maxW="md" bg="white" p={8} rounded="lg" shadow="lg">
                <Heading mb={2}>Payment Summary</Heading>
                <hr />
                <Flex flexDirection="column" gap={4}>
                  {/* Car Details */}
                  {carDetails && (
                    <Flex flexDirection="column" gap={4} mt={2}>
                      <Heading size="md">Car Details</Heading>
                      <Flex flexDirection="row" justifyContent="space-between">
                        <Text fontSize="md">Make:</Text>
                        <Text fontSize="md" fontWeight="bold">
                          {parseJSON(carDetails)?.make || "N/A"}
                        </Text>
                      </Flex>
                      <Flex flexDirection="row" justifyContent="space-between">
                        <Text fontSize="md">Model:</Text>
                        <Text fontSize="md" fontWeight="bold">
                          {parseJSON(carDetails)?.model || "N/A"}
                        </Text>
                      </Flex>
                      <Flex flexDirection="row" justifyContent="space-between">
                        <Text fontSize="md">Total Price:</Text>
                        <Text fontSize="md" fontWeight="bold">
                          ₦{parseJSON(carDetails)?.totalPrice || "0"}
                        </Text>
                      </Flex>
                    </Flex>
                  )}

                  <hr />

                  {/* Booking Details */}
                  {bookingDetails && (
                    <Flex flexDirection="column" gap={4} mt={2}>
                      <Heading size="md">Booking Details</Heading>
                      <Flex flexDirection="row" justifyContent="space-between">
                        <Text fontSize="md">ID:</Text>
                        <Text fontSize="md" fontWeight="bold">
                          {bookingId || "N/A"}
                        </Text>
                      </Flex>
                      <Flex flexDirection="row" justifyContent="space-between">
                        <Text fontSize="md">Start Date:</Text>
                        <Text fontSize="md" fontWeight="bold">
                          {parseJSON(bookingDetails)?.startDate || "N/A"}
                        </Text>
                      </Flex>
                      <Flex flexDirection="row" justifyContent="space-between">
                        <Text fontSize="md">End Date:</Text>
                        <Text fontSize="md" fontWeight="bold">
                          {parseJSON(bookingDetails)?.endDate || "N/A"}
                        </Text>
                      </Flex>
                    </Flex>
                  )}

                  <hr />

                  {/* User Details */}
                  {userDetails && (
                    <Flex flexDirection="column" gap={4} mt={2}>
                      <Heading size="md">User Details</Heading>
                      <Flex flexDirection="row" justifyContent="space-between">
                        <Text fontSize="md">Full Name:</Text>
                        <Text fontSize="md" fontWeight="bold">
                          {parseJSON(userDetails)?.fullName || "N/A"}
                        </Text>
                      </Flex>
                      <Flex flexDirection="row" justifyContent="space-between">
                        <Text fontSize="md">Email:</Text>
                        <Text fontSize="md" fontWeight="bold">
                          {parseJSON(userDetails)?.email || "N/A"}
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                </Flex>
              </Box>
            </Container>
          </GridItem>

          {/* Payment Form */}
          <GridItem w="100%">
            <Container centerContent>
              <Box w="full" maxW="md" bg="white" p={8} rounded="lg" shadow="lg">
                <PaymentForm
                  carDetails={carDetails}
                  userDetails={userDetails}
                  bookingDetails={bookingDetails}
                  amount={parseJSON(carDetails)?.totalPrice || 0}
                  bookingId={bookingId}
                  onSuccess={handlePaymentSuccess}
                  onFailure={handlePaymentFailure}
                />
              </Box>
            </Container>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default PaymentPage;
