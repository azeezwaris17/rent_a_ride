// src/components/admin/auth/AdminRegistrationForm.js
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BiLoaderCircle } from "react-icons/bi";
import { registerAdmin } from "../../../store/slices/admin/auth/adminAuthSlice";
import {
  showSuccessNotification,
  showErrorNotification,
} from "../../../utils/notificationUtils";

const AdminRegistrationForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, user } = useSelector((state) => state.adminAuth);

  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  useEffect(() => {
    const { role: roleFromQuery } = router.query;
    if (roleFromQuery) {
      setRole(roleFromQuery);
    }
  }, [router.query]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: role,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const resultAction = await dispatch(registerAdmin({ ...values, role }));
        if (registerAdmin.fulfilled.match(resultAction)) {
          dispatch(showSuccessNotification("Registration successful"));
          resetForm();
          router.push(`/auth/login/${role}`);
        } else {
          dispatch(showErrorNotification(resultAction.payload.message));
        }
      } catch (error) {
        dispatch(showErrorNotification(error.message));
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <Input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-600">{formik.errors.name}</div>
        ) : null}
      </div>
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
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            pr="4.5rem"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600">{formik.errors.password}</div>
        ) : null}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Confirm Password
        </label>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            pr="4.5rem"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-600">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <Button
        type="submit"
        isLoading={loading}
        loadingText="Processing..."
        colorScheme="blue"
        width="full"
        className="relative"
      >
        {loading && <BiLoaderCircle className="animate-spin absolute left-4" />}
        {!loading && "Register"}
      </Button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
};

export default AdminRegistrationForm;
