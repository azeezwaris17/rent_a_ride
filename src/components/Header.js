// src/components/Header.js
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  return (
    <Box bg="blue.600" p={4} color="white">
      <Flex>
        <Heading size="lg">RentARide</Heading>
        <Spacer />
        <Button
          onClick={() => router.push("/auth/register/user")}
          colorScheme="white"
          variant="outline"
        >
          Register
        </Button>
        <Button
          onClick={() => router.push("/auth/login/user")}
          colorScheme="white"
          variant="filled"
          ml={4}
        >
          Login
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
