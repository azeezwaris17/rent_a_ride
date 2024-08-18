// src/components/user/dashboard/user/UserBookings.js
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import BookingDetailsModal from "../../../components/BookingDetailsModal";

const UserBookings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bookings = useSelector((state) => state.bookings.bookings); // Assume bookings are stored in Redux state
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    onOpen();
  };

  return (
    <Box>
      <Heading as="h1" mb={4}>
        My Bookings
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Car</Th>
            <Th>Location</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bookings.map((booking) => (
            <Tr key={booking.id}>
              <Td>{`${booking.carDetails.make} ${booking.carDetails.model}`}</Td>
              <Td>{booking.carDetails.location}</Td>
              <Td>{booking.date}</Td>
              <Td>{booking.status}</Td>
              <Td>
                <Button size="sm" onClick={() => handleViewDetails(booking)}>
                  View
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedBooking && (
        <BookingDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          bookingDetails={selectedBooking}
        />
      )}
    </Box>
  );
};

export default UserBookings;
