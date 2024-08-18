// src/components/BookingForm.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../store/slices/bookingSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const BookingForm = ({ carId, userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required("Required"),
      endDate: Yup.date().required("Required"),
    }),
    onSubmit: async (values) => {
      const bookingData = {
        userId,
        carId,
        startDate: values.startDate,
        endDate: values.endDate,
      };
      await dispatch(createBooking(bookingData));
      router.push("/dashboard");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        isInvalid={formik.errors.startDate && formik.touched.startDate}
      >
        <FormLabel htmlFor="startDate">Start Date</FormLabel>
        <Input
          id="startDate"
          type="date"
          {...formik.getFieldProps("startDate")}
        />
        <FormErrorMessage>{formik.errors.startDate}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={formik.errors.endDate && formik.touched.endDate}>
        <FormLabel htmlFor="endDate">End Date</FormLabel>
        <Input id="endDate" type="date" {...formik.getFieldProps("endDate")} />
        <FormErrorMessage>{formik.errors.endDate}</FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        isLoading={formik.isSubmitting}
        type="submit"
      >
        Book Now
      </Button>
    </form>
  );
};

export default BookingForm;
