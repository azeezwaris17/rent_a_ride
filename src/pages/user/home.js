import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Box,
  Grid,
  GridItem,
  Button,
  Flex,
  Spacer,
  FormControl,
  FormLabel,
  Select,
  Heading,
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  useToast,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Header from "../../components/user/HomePageHeader";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../store/slices/user/auth/userAuthSlice";

const HomePage = () => {
  const router = useRouter();
  const toast = useToast();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [carTypes, setCarTypes] = useState([]);
  const [carType, setCarType] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [showCarDetailsModal, setShowCarDetailsModal] = useState(false);
  const [showNoCarAvailableModal, setShowNoCarAvailableModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const carsPerPage = 6;

  const fetchCarsData = useCallback(async () => {
    try {
      const response = await fetch("/cars.json");
      const data = await response.json();
      console.log("Fetched cars data:", data);

      const types = [...new Set(data.map((car) => car.type))];
      setCarTypes(types);

      setAllCars(data);
      setFilteredCars(data);
      setCars(data.slice(0, carsPerPage));
      setTotalPages(Math.ceil(data.length / carsPerPage));
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }, []);

  useEffect(() => {
    fetchCarsData();
  }, [fetchCarsData]);

  const handleCarTypeChange = (e) => {
    setCarType(e.target.value);
    setPage(0); // Reset page to 0 when car type is changed
    console.log("Selected car type:", e.target.value);
  };

  const handleSearch = () => {
    if (!carType) {
      toast({
        title: "Please select a car type.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      console.log("Car type not selected");
      return;
    }

    const filtered = allCars.filter(
      (car) => car.type.toLowerCase() === carType.toLowerCase()
    );
    console.log("Filtered cars:", filtered);

    setFilteredCars(filtered);
    setTotalPages(Math.ceil(filtered.length / carsPerPage));
    setCars(filtered.slice(0, carsPerPage));

    if (filtered.length === 0) {
      setShowNoCarAvailableModal(true);
      console.log("No cars found for selected type");
    } else {
      setShowNoCarAvailableModal(false);
    }
  };

  const handleBook = (car) => {
    if (!isAuthenticated) {
      toast({
        title: "You need to be logged in to book a car.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } else {
      router.push({
        pathname: `/bookings/new/${car.id}`,
        query: {
          user: JSON.stringify(user),
          id: car.id,
          make: car.make,
          model: car.model,
          pricePerHour: car.pricePerHour,
          fuelType: car.fuelType,
          transmission: car.transmission,
          engine: car.engine,
          seatingCapacity: car.seatingCapacity,
          driveType: car.driveType,
          mileage: car.mileage,
        },
      });
    }
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage < totalPages) {
      setPage(nextPage);
      setCars(
        filteredCars.slice(nextPage * carsPerPage, (nextPage + 1) * carsPerPage)
      );
    }
  };

  const handlePreviousPage = () => {
    const prevPage = page - 1;
    if (prevPage >= 0) {
      setPage(prevPage);
      setCars(
        filteredCars.slice(prevPage * carsPerPage, (prevPage + 1) * carsPerPage)
      );
    }
  };

  const handleExploreAllCars = () => {
    setPage(0);
    setFilteredCars(allCars);
    setCars(allCars.slice(0, carsPerPage));
    setTotalPages(Math.ceil(allCars.length / carsPerPage));
    console.log("Exploring all available cars");

    // Reset input fields
    setCarType("");
    setShowNoCarAvailableModal(false);
  };

  const closeNoCarAvailableModal = () => {
    setShowNoCarAvailableModal(false);
    console.log("Modal closed");
  };

  const handleViewCarDetailsModal = (car) => {
    setSelectedCar(car);
    setShowCarDetailsModal(true);
  };

  const closeCarDetailsModal = () => {
    setShowCarDetailsModal(false);
    setSelectedCar(null);
  };

  if (!isAuthenticated) {
    return (
      <Center minH="100vh">
        <Box textAlign="center">
          <Heading mt={4} size="md" color="red.700">
            Access Denied
          </Heading>
          <Text mt={2} color="gray.600">
            You are not authenticated, Kindly login to proceed
          </Text>
          <Button
            colorScheme="customRed"
            mr={4}
            mt={4}
            onClick={() => router.push(`/auth/login/user`)}
          >
            Log in
          </Button>
        </Box>
      </Center>
    );
  }

  return (
    <Box>
      {/* homepage header */}
      <Header />

      {/* Hero section */}
      <Box mt={4} p={4}>
        <Grid
          w="100vw"
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={4}
          alignItems="center"
        >
          {/* Hero heading and description */}
          <GridItem w="100%" display={{ base: "none", md: "block" }}>
            <Box w="full" bg="white" p={4}>
              <Heading as="h1" size="2xl" mb={4}>
                Find Your Perfect Ride
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="xl">
                Discover the best cars for rent at unbeatable prices. Whether
                you need a car for a few hours or a few days, we have the
                perfect vehicle for you.
              </Text>
            </Box>
          </GridItem>

          {/* search car type field */}
          <GridItem w="100%" p={4}>
            <Box w="full" bg="white" p={8}>
              <Card>
                <CardBody>
                  <Flex
                    alignItems="center"
                    gap="2"
                    mb={4}
                    flexDirection={{ base: "column", md: "row" }}
                  >
                    <FormControl isRequired mb={{ base: 4, md: 0 }}>
                      <FormLabel>Car Type</FormLabel>
                      <Select
                        placeholder="Select Car Type"
                        value={carType}
                        onChange={handleCarTypeChange}
                      >
                        {carTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Flex>
                </CardBody>
                <CardFooter>
                  <Button
                    w="100%"
                    colorScheme="customRed"
                    onClick={handleSearch}
                  >
                    Search Cars
                  </Button>
                </CardFooter>
              </Card>
            </Box>
          </GridItem>
        </Grid>
      </Box>

      {/* render fetch cars */}
      <Box mt={4} padding={4}>
        <Flex alignItems="center" justifyItems="center" mb={6} p={4}>
          <Heading>Available Cars</Heading>

          <Spacer />

          {filteredCars.length < allCars.length && (
            <Button colorScheme="customRed" onClick={handleExploreAllCars}>
              Explore all cars
            </Button>
          )}
        </Flex>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {cars.map((car) => (
            <GridItem key={car.id}>
              <Card>
                <CardBody>
                  <Image
                    src={car.images[0]}
                    alt={car.make}
                    borderRadius="md"
                    boxSize="100%"
                    objectFit="cover"
                  />
                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text mt={2} fontWeight="bold">
                      {car.make} {car.model} – {car.year}
                    </Text>

                    <Text mt={2} fontWeight="bold" fontSize="lg">
                      {car.pricePerHour}
                    </Text>
                  </Flex>
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme="customRed"
                    w="100%"
                    onClick={() => handleViewCarDetailsModal(car)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* prev and next buttton */}
      <Flex mt={8} justify="center" align="center" gap={4}>
        <Button
          onClick={handlePreviousPage}
          isDisabled={page === 0}
          colorScheme="customRed"
        >
          Previous
        </Button>
        <Text>
          Page {page + 1} of {totalPages}
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={page >= totalPages - 1}
          colorScheme="customRed"
        >
          Next
        </Button>
      </Flex>

      {/* selected Car Details Modal */}
      {selectedCar && (
        <Modal
          isOpen={showCarDetailsModal}
          onClose={closeCarDetailsModal}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Car Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Image
                  src={selectedCar.images[0]}
                  alt={selectedCar.make}
                  borderRadius="md"
                  boxSize="100%"
                  objectFit="cover"
                />

                {/* car make and model */}

                <Center mb={2}>
                  <Text fontWeight="bold">
                    {selectedCar.make} {selectedCar.model} – {selectedCar.year}
                  </Text>
                </Center>

                {/* price per hour */}
                <Flex mb={2}>
                  <Text fontSize="lg">Price/hr:</Text>

                  <Spacer />

                  <Text fontWeight="bold" fontSize="lg">
                    {selectedCar.pricePerHour}
                  </Text>
                </Flex>

                {/* fuel type */}
                <Flex mb={2}>
                  <Text fontSize="lg">Fuel type:</Text>

                  <Spacer />

                  <Text fontWeight="bold">{selectedCar.fuelType}</Text>
                </Flex>

                {/* transmission */}
                <Flex mb={2}>
                  <Text fontSize="lg">Transmission:</Text>

                  <Spacer />

                  <Text fontWeight="bold">{selectedCar.transmission}</Text>
                </Flex>

                {/* Engine */}
                <Flex mb={2}>
                  <Text fontSize="lg"> Engine:</Text>

                  <Spacer />

                  <Text fontWeight="bold">{selectedCar.engine}</Text>
                </Flex>

                {/* Seating capacity */}
                <Flex mb={2}>
                  <Text fontSize="lg">Seating capacity:</Text>

                  <Spacer />
                  <Text fontWeight="bold">{selectedCar.seatingCapacity}</Text>
                </Flex>

                {/* drive type */}
                <Flex mb={2}>
                  <Text fontSize="lg">Drive type:</Text>

                  <Spacer />

                  <Text fontWeight="bold">{selectedCar.driveType}</Text>
                </Flex>

                {/* mileage */}
                <Flex mb={2}>
                  <Text fontSize="lg">Mileage:</Text>

                  <Spacer />

                  <Text fontWeight="bold">{selectedCar.mileage}</Text>
                </Flex>
              </Box>
            </ModalBody>
            {/* <Center mt={2}> */}
            <ModalFooter>
              <Button
                w="100%"
                colorScheme="customRed"
                onClick={() => handleBook(selectedCar)}
              >
                Book Now
              </Button>
            </ModalFooter>
            {/* </Center> */}
          </ModalContent>
        </Modal>
      )}

      {/* No Car Available Modal */}
      <Modal
        isOpen={showNoCarAvailableModal}
        onClose={closeNoCarAvailableModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>No Cars Available</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>No cars are available for the selected type.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="customRed" onClick={handleExploreAllCars}>
              Check Available Cars
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HomePage;
