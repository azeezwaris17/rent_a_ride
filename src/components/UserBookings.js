import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Spinner,
  Alert,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Select,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookings,
  selectAllBookings,
  selectBookingLoading,
  selectBookingError,
} from "../store/slices/bookingSlice";

import BookingDetailsModal from "../../components/BookingDetailsModal";

const UserBookings = ({ userId }) => {
   const dispatch = useDispatch();
   const bookings = useSelector(selectAllBookings);
   const loading = useSelector(selectBookingLoading);
   const error = useSelector(selectBookingError);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

 useEffect(() => {
    if (userId) {
      dispatch(fetchBookings(userId));
    }
  }, [dispatch, userId]);

  if (loading) return <Spinner />;
  if (error) return <Alert status="error">{error}</Alert>;

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearchTerm =
      booking.car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? booking.status === statusFilter : true;
    const matchesDate = dateFilter
      ? new Date(booking.startDate) <= new Date(dateFilter) &&
        new Date(booking.endDate) >= new Date(dateFilter)
      : true;

    return matchesSearchTerm && matchesStatus && matchesDate;
  });

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    onOpen();
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={4}>
        Your Bookings
      </Text>

      <Box display="flex" gap={4} mb={4} flexWrap="wrap">
        <Input
          placeholder="Search by car make/model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          flex="1"
        />
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          flex="1"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
        <Input
          type="date"
          placeholder="Filter by date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          flex="1"
        />
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Car</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Tr key={booking._id}>
                <Td>{`${booking.car.make} ${booking.car.model}`}</Td>
                <Td>{new Date(booking.startDate).toLocaleDateString()}</Td>
                <Td>{new Date(booking.endDate).toLocaleDateString()}</Td>
                <Td>{booking.status}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleViewBooking(booking)}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="5">
                <Text textAlign="center">No bookings found.</Text>
              </Td>
            </Tr>
          )}
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
