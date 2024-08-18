import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";

const BookingConfirmationModal = ({
  isOpen,
  onClose,
  bookingDetails,
  carDetails,
  userObject,
}) => {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const bookingId = `BOOKING-${Date.now()}`;

    // Parse the total price and price to numbers
    const pricePerHour = parseFloat(
      carDetails.pricePerHour.replace(/[^0-9.-]+/g, "")
    );
    const totalPrice = parseFloat(
      carDetails.totalPrice.replace(/[^0-9.-]+/g, "")
    );

    const bookingData = {
      bookingId,
      car: {
        make: carDetails.make,
        model: carDetails.model,
        price: pricePerHour,
      },
      user: {
        name: userObject?.name || "",
        email: userObject?.email || "",
      },
      location: bookingDetails.address,
      startDate: bookingDetails.startDate,
      endDate: bookingDetails.endDate,
      totalPrice,
      bookingStatus: "processing",
      paymentStatus: "unpaid",
    };

    try {
      const response = await axios.post("/api/bookings", bookingData);
      console.log("Booking saved:", response.data);

      toast({
        title: "Booking successful.",
        description: "Your booking has been saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setSuccess(true);

      router.push({
        pathname: "/payment",
        query: {
          bookingId,
          carDetails: JSON.stringify(carDetails),
          userDetails: JSON.stringify(userObject),
          bookingDetails: JSON.stringify(bookingDetails),
          bookingStatus: "processing",
          paymentStatus: "unpaid",
        },
      });
    } catch (error) {
      console.error(
        "Error saving booking:",
        error.response?.data || error.message
      );

      toast({
        title: "Error saving booking.",
        description:
          error.response?.data?.error || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Your Booking</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {carDetails ? (
            <Flex flexDirection="column" gap={4}>
              {/* Render booking details */}
              <Flex mb={4}>
                <Text fontSize="md">Make:</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="md">
                  {carDetails.make}
                </Text>
              </Flex>
              <Flex mb={4}>
                <Text fontSize="md">Model:</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="md">
                  {carDetails.model}
                </Text>
              </Flex>
              <Flex mb={4}>
                <Text fontSize="md">Price/hr:</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="md">
                  {carDetails.pricePerHour}
                </Text>
              </Flex>
              <Flex mb={4}>
                <Text fontSize="md">Total booking price:</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="md">
                  ₦{carDetails.totalPrice}
                </Text>
              </Flex>

              <Flex mb={4}>
                <Text fontSize="md">City:</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="md">
                  {bookingDetails.city}
                </Text>
              </Flex>
              <Flex mb={4}>
                <Text fontSize="md">Address:</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="md">
                  {bookingDetails.address}
                </Text>
              </Flex>
              <Flex mb={4}>
                <Text fontSize="md">Phone number:</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="md">
                  {bookingDetails.phoneNumber}
                </Text>
              </Flex>
              <Flex mb={4}>
                <Text fontSize="md">Full Name:</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="md">
                  {userObject?.fullName || "N/A"}
                </Text>
              </Flex>
              <Flex mb={4}>
                <Text fontSize="md">Email:</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize="md">
                  {userObject?.email || "N/A"}
                </Text>
              </Flex>
              {/* Add more fields as needed */}
            </Flex>
          ) : (
            <Text>Error: Unable to load booking details.</Text>
          )}
        </ModalBody>
        <Center>
          <ModalFooter>
            <Button
              w="100%"
              colorScheme="customRed"
              onClick={handleConfirm}
              disabled={!carDetails || loading}
              isLoading={loading}
              loadingText="Processing..."
            >
              Proceed to Payment
            </Button>
          </ModalFooter>
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default BookingConfirmationModal;
