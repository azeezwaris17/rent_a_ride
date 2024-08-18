import {
  Box,
  Container,
  Center,
  Button,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMemo, useEffect, useState } from "react";
import BookingConfirmationModal from "../../../components/BookingConfirmationModal";
import * as nigerianStates from "nigerian-states-and-lgas";

const BookingPage = () => {
  const router = useRouter();
  const toast = useToast();

  const {
    user,
    id,
    make,
    model,
    pricePerHour,
    transmission,
    engine,
    seatingCapacity,
    mileage,
    fuelType,
    driveType,
  } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDurationType, setSelectedDurationType] = useState("1hr");
  const [currentDate] = useState(new Date().toISOString().slice(0, 16));
  const [userObject, setUserObject] = useState({});

  const states = nigerianStates.states();

  useEffect(() => {
    if (user) {
      try {
        setUserObject(JSON.parse(user));
      } catch (error) {
        console.error("Error parsing user:", error);
        setUserObject({});
      }
    } else {
      router.push("/"); // Redirect if not authenticated
    }
  }, [user, router]);

  const validationSchema = Yup.object().shape({
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    ...(selectedDurationType !== "1hr" && {
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date().required("End date is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      state: "",
      city: "",
      address: "",
      phoneNumber: "",
      startDate: currentDate,
      endDate: currentDate,
      startTime: "",
      endTime: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);

      const carDetails = {
        id,
        make,
        model,
        pricePerHour,
        transmission,
        engine,
        seatingCapacity,
        mileage,
        fuelType,
        driveType,
        totalPrice: totalPrice,
      };

      setIsModalOpen(true);
    },
  });

  const totalPrice = useMemo(() => {
    if (!pricePerHour) {
      console.error("pricePerHour is undefined");
      return 0;
    }

    const pricePerHourNumber = parseFloat(
      pricePerHour.replace(/[^0-9.-]+/g, "")
    );

    if (isNaN(pricePerHourNumber)) return 0;

    let total = 0;
    if (selectedDurationType === "1hr") {
      total = pricePerHourNumber;
    } else if (selectedDurationType === "2hr") {
      total = pricePerHourNumber * 2;
    } else if (selectedDurationType === "5hr") {
      total = pricePerHourNumber * 5;
    } else if (selectedDurationType === "1day") {
      total = pricePerHourNumber * 24;
    } else if (selectedDurationType === "other") {
      const start = new Date(formik.values.startDate);
      const end = new Date(formik.values.endDate);
      const diffTime = end - start;
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      total = pricePerHourNumber * diffHours;
    }
    return total.toLocaleString(); // Add comma formatting
  }, [
    selectedDurationType,
    pricePerHour,
    formik.values.startDate,
    formik.values.endDate,
  ]);

  useEffect(() => {
    if (selectedDurationType === "1day") {
      formik.setFieldValue("startDate", currentDate);
      formik.setFieldValue("endDate", currentDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDurationType, currentDate]);

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setSelectedDurationType(value);
  };

  return (
    <Box>
      <Box p={8}>
        <Heading  mb={2}>
          Book {make} {model}
        </Heading>
      </Box>

      <Grid
        h="100vh"
        w="100vw"
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={4}
      >
        {/* Fetched Car Details */}
        <GridItem w="100%" p={8} display={{ base: "none", md: "block" }}>
          <Container centerContent>
            <Box w="full" maxW="md" bg="white" p={8} rounded="lg" shadow="lg">
              <Heading mb={4}>Car Details</Heading>
              <Flex flexDirection="column" gap={4}>
                <Flex mb={4}>
                  <Text fontSize="md">Make:</Text>
                  <Spacer />
                  <Text fontWeight="bold" fontSize="md">
                    {make}
                  </Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontSize="md">Model:</Text>
                  <Spacer />
                  <Text fontWeight="bold" fontSize="md">
                    {model}
                  </Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontSize="md">Fuel type:</Text>
                  <Spacer />
                  <Text fontWeight="bold" fontSize="md">
                    {fuelType}
                  </Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontSize="md">Transmission:</Text>
                  <Spacer />
                  <Text fontWeight="bold" fontSize="md">
                    {transmission}
                  </Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontSize="md">Engine:</Text>
                  <Spacer />
                  <Text fontWeight="bold" fontSize="md">
                    {engine}
                  </Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontSize="md">Drive type:</Text>
                  <Spacer />
                  <Text fontWeight="bold" fontSize="md">
                    {driveType}
                  </Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontSize="md">Seating capacity:</Text>
                  <Spacer />
                  <Text fontWeight="bold" fontSize="md">
                    {seatingCapacity}
                  </Text>
                </Flex>
                <Flex mb={2}>
                  <Text fontSize="md">Mileage:</Text>
                  <Spacer />
                  <Text fontWeight="bold" fontSize="md">
                    {mileage}
                  </Text>
                </Flex>
                <Flex mb={4}>
                  <Text fontSize="md">Price/hr:</Text>
                  <Spacer />
                  <Text fontWeight="bold" fontSize="md">
                    {pricePerHour}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Container>
        </GridItem>

        {/* Booking Form */}
        <GridItem w="100%">
          <Container centerContent>
            <Box w="full" maxW="md" bg="white" p={8} rounded="lg" shadow="lg">
              <Heading mb={4}>Booking Form</Heading>
              <form onSubmit={formik.handleSubmit}>
                <FormControl isRequired mb={4}>
                  <FormLabel>State</FormLabel>
                  <Select
                    name="state"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                  >
                    <option value="">Select state</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel>Booking Duration</FormLabel>
                  <Select
                    placeholder="Select duration"
                    onChange={handleDurationChange}
                    value={selectedDurationType}
                  >
                    <option value="1hr">1 Hour</option>
                    <option value="2hr">2 Hours</option>
                    <option value="5hr">5 Hours</option>
                    <option value="1day">1 Day</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>

                {selectedDurationType === "1day" && (
                  <>
                    <FormControl isRequired mb={4}>
                      <FormLabel>Start Time</FormLabel>
                      <Input
                        type="time"
                        name="startTime"
                        onChange={formik.handleChange}
                        value={formik.values.startTime || ""}
                      />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                      <FormLabel>End Time</FormLabel>
                      <Input
                        type="time"
                        name="endTime"
                        onChange={formik.handleChange}
                        value={formik.values.endTime || ""}
                      />
                    </FormControl>
                  </>
                )}

                {selectedDurationType === "other" && (
                  <>
                    <FormControl isRequired mb={4}>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        type="datetime-local"
                        name="startDate"
                        min={currentDate}
                        onChange={formik.handleChange}
                        value={formik.values.startDate}
                      />
                    </FormControl>
                    <FormControl isRequired mb={4}>
                      <FormLabel>End Date</FormLabel>
                      <Input
                        type="datetime-local"
                        name="endDate"
                        min={formik.values.startDate || currentDate}
                        onChange={formik.handleChange}
                        value={formik.values.endDate}
                      />
                    </FormControl>
                  </>
                )}

                <FormControl isRequired mb={4}>
                  <FormLabel>City</FormLabel>
                  <Input
                    name="city"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </FormControl>

                <FormControl isRequired mb={4}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                  />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel>Total Price</FormLabel>
                  <Input value={`₦${totalPrice}`} isReadOnly />
                </FormControl>

                <Center mt={4}>
                  <Button
                    type="submit"
                    w="100%"
                    colorScheme="customRed"
                    isDisabled={!formik.isValid || !formik.dirty}
                  >
                    Confirm Booking
                  </Button>
                </Center>
              </form>
            </Box>
          </Container>
        </GridItem>
      </Grid>

      {isModalOpen && (
        <BookingConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bookingDetails={formik.values}
          carDetails={{
            id,
            make,
            model,
            pricePerHour,
            transmission,
            engine,
            seatingCapacity,
            mileage,
            fuelType,
            driveType,
            totalPrice,
          }}
          userObject={userObject}
        />
      )}
    </Box>
  );
};

export default BookingPage;
