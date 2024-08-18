// src/components/TransactionHistory.js
import {
  Box,
  Text,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectAllTransactions } from "../store/slices/paymentSlice";

const TransactionHistory = () => {
  const transactions = useSelector(selectAllTransactions);

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        Transaction History
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Transaction ID</Th>
            <Th>Booking ID</Th>
            <Th>Payment Method</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <Tr key={transaction.transactionId}>
              <Td>{transaction.transactionId}</Td>
              <Td>{transaction.bookingId}</Td>
              <Td>{transaction.paymentMethod}</Td>
              <Td>{`$${transaction.amount}`}</Td>
              <Td>{transaction.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TransactionHistory;
