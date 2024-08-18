import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Image,
  Flex,
  Grid,
  GridItem,
  Center,
  Heading,
  Text,
  Button,
  Stack,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { FaCar } from "react-icons/fa";
import theme from "@/themes/theme";

const AuthLayout = ({ heading = "", form, role }) => {
  const toast = useToast();

  const [carData, setCarData] = useState([]);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  // Function to fetch car data
  const fetchCarsData = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await fetch("/cars.json");
      const data = await response.json();
      setCarData(data);
      setStatus("succeeded");
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError(error.message);
      setStatus("failed");
    }
  }, []);

  useEffect(() => {
    fetchCarsData();
  }, [fetchCarsData]);

  // Rotate car image every 3 seconds
  useEffect(() => {
    if (carData.length > 0) {
      const interval = setInterval(() => {
        setCurrentCarIndex((prevIndex) => (prevIndex + 1) % carData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [carData]);

  return (
    <Grid
      h="100vh"
      w="100vw"
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={4}
      alignItems="center"
    >
      {/* Car Image Section */}
      <GridItem w="100%" display={{ base: "none", md: "block" }}>
        <Container centerContent>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" && carData.length > 0 && (
            <Box w="full" maxW="md"  p={8}  >
              <Image
                src={carData[currentCarIndex].images[0]}
                alt={carData[currentCarIndex].make}
                borderRadius="md"
                boxSize="100%"
                objectFit="cover"
              />
              <Center>
                <Text mt={1} fontWeight="bold" center>
                  {carData[currentCarIndex].name}
                </Text>
              </Center>
            </Box>
          )}
        </Container>
      </GridItem>

      {/* Form Section */}
      <GridItem w="100%">
        <Container centerContent>
          <Box w="full" maxW="md" bg="white" p={8} rounded="lg" shadow="lg">
            <Flex alignItems="center" justify="center" gap={4} mb={6}>
              <Heading size="lg">{heading}</Heading>
              <Icon
                as={FaCar}
                boxSize={8}
                color={theme.colors.customRed[500]}
              />
            </Flex>

            {/* Form component */}
            {form}
            <Stack spacing={4} mt={6}>
              {heading.includes("Login") ? (
                <>
                  <Text fontSize="sm" color="gray.600">
                    Don&apos;t have an account yet?{" "}
                    <Link href={`/auth/register/${role}`} passHref>
                      <Button variant="link" colorScheme="customRed">
                        Register
                      </Button>
                    </Link>
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Forgot password?{" "}
                    <Link href={`/auth/reset-password/${role}`} passHref>
                      <Button variant="link" colorScheme="customRed">
                        Reset
                      </Button>
                    </Link>
                  </Text>
                </>
              ) : (
                <Text fontSize="sm" color="gray.600">
                  Already registered?{" "}
                  <Link href={`/auth/login/${role}`} passHref>
                    <Button variant="link" colorScheme="customRed">
                      Login
                    </Button>
                  </Link>
                </Text>
              )}
            </Stack>
          </Box>
        </Container>
      </GridItem>
    </Grid>
  );
};

export default AuthLayout;
