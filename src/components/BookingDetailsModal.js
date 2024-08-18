import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

const BookingDetailsModal = ({ isOpen, onClose, bookingDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Booking Details</ModalHeader>
        <ModalBody>
          <Text>Make: {bookingDetails.carDetails.make}</Text>
          <Text>Model: {bookingDetails.carDetails.model}</Text>
          <Text>Location: {bookingDetails.carDetails.location}</Text>
          <Text>Total Price: ₦{bookingDetails.totalPrice}</Text>
          <Text>Date: {bookingDetails.date}</Text>
          <Text>Status: {bookingDetails.status}</Text>
          <Text>State: {bookingDetails.state}</Text>
          <Text>City: {bookingDetails.city}</Text>
          <Text>Address: {bookingDetails.address}</Text>
          <Text>Phone Number: {bookingDetails.phoneNumber}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookingDetailsModal;
