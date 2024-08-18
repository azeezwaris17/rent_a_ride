// src/components/auth/AdminResetPasswordForm.js
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Input, Button } from "@chakra-ui/react";
import { BiLoaderCircle } from "react-icons/bi";
import { resetAdminPassword } from "../../../store/slices/admin/auth/adminAuthSlice";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../../utils/notificationUtils";

const AdminResetPasswordForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(resetAdminPassword(values)).unwrap();
        dispatch(showSuccessNotification("Password reset successful"));
        resetForm();
        router.push("/auth/login/admin");
      } catch (error) {
        dispatch(showErrorNotification(error.message));
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email</label>
        <Input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Password</label>
        <Input
          type={show ? "text" : "password"}
          name="password"
          placeholder="Enter new password"
          pr="4.5rem"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Confirm Password
        </label>
        <Input
          type={show ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm new password"
          pr="4.5rem"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-600">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <Button
        type="submit"
        isLoading={formik.isSubmitting}
        loadingText="Processing..."
        colorScheme="blue"
        width="full"
        className="relative"
      >
        {formik.isSubmitting && (
          <BiLoaderCircle className="animate-spin absolute left-4" />
        )}
        {!formik.isSubmitting && "Reset Password"}
      </Button>
    </form>
  );
};

export default AdminResetPasswordForm;
