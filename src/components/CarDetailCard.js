import React from "react";
import { Box, Image, Text, Stack } from "@chakra-ui/react";

const CarDetailCard = ({ car }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={car.image} alt={`${car.make} ${car.model}`} />

      <Box p="6">
        <Stack spacing="3">
          <Text
            fontWeight="bold"
            fontSize="xl"
          >{`${car.make} ${car.model}`}</Text>
          <Text>{`Type: ${car.type}`}</Text>
          <Text>{`Location: ${car.location}`}</Text>
          <Text
            fontWeight="bold"
            fontSize="lg"
          >{`Price: $${car.price}/day`}</Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default CarDetailCard;
