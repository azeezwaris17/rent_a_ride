import { useRouter } from "next/router";
import UserLoginForm from "../components/user/auth/UserLoginForm";
import AdminLoginForm from "../components/admin/auth/AdminLoginForm";
import AuthLayout from "../layouts/auth/AuthLayout";
import { Center } from "@chakra-ui/react";

const LoginPage = () => {
  const router = useRouter();
  const { role = "user" } = router.query; // Default role to "user" if not provided

  // Choose the appropriate form based on the role
  const form = role === "admin" ? <AdminLoginForm /> : <UserLoginForm />;
  const heading = role === "admin" ? "Admin Login" : "User Login";

  return (
    <Center m="auto" p="4">
      <AuthLayout form={form} heading={heading} role={role} />
    </Center>
  );
};

export default LoginPage;
