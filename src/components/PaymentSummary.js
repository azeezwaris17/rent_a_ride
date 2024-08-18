// src/components/PaymentSummary.js
import { Box, Text, Stack } from "@chakra-ui/react";

const PaymentSummary = ({ booking }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="6" maxW="sm">
      <Stack spacing="3">
        <Text fontWeight="bold" fontSize="xl">
          Payment Summary
        </Text>
        <Text>{`Make: ${booking.car.make}`}</Text>
        <Text>{`Model: ${booking.car.model}`}</Text>
        <Text>{`Price: $${booking.car.price}/day`}</Text>
        <Text>{`Location: ${booking.car.location}`}</Text>
        <Text>{`Total Price: $${booking.totalPrice}`}</Text>
      </Stack>
    </Box>
  );
};

export default PaymentSummary;
