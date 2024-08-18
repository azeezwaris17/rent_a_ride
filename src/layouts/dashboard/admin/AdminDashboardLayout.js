import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/user/auth/userAuthSlice";
import AdminHeader from "../../../components/admin/dashboard/AdminHeader";
import AdminSidebar from "../../../components/admin/dashboard/AdminSidebar";
import AdminFooter from "../../../components/admin/dashboard/AdminFooter";
import AdminDashboard from "../../../components/admin/dashboard/AdminDashboard";
import ManageUsers from "../../../components/admin/dashboard/ManageUsers";
import ManageCars from "../../../components/admin/dashboard/ManageCars";
import ManageBookings from "../../../components/admin/dashboard/ManageBookings";
import withAuth from "../../../components/hoc/WithAuth";
import { Grid, GridItem } from "@chakra-ui/react";

const AdminDashboardLayout = ({ component }) => {
  const user = useSelector(selectUser);
  const isAdmin = user?.role === "admin";

  if (!isAdmin) return null;

  const renderComponent = () => {
    switch (component) {
      case "ManageUsers":
        return <ManageUsers />;
      case "ManageCars":
        return <ManageCars />;
      case "ManageBookings":
        return <ManageBookings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <Grid
      templateAreas={{
        base: `"header" "main" "footer"`,
        md: `"header header" "nav main" "footer footer"`,
      }}
      gridTemplateRows={{
        base: "50px 1fr 30px",
      }}
      gridTemplateColumns={{
        base: "1fr",
        md: "150px 1fr",
      }}
      h="100vh"
      gap="1"
      overflow="hidden"
    >
      {/* Header - visible on small screens */}
      <GridItem
        pl="2"
        bg="orange.300"
        area="header"
        display={{ base: "block", md: "none" }}
      >
        <AdminHeader />
      </GridItem>

      {/* Sidebar - hidden on small screens */}
      <GridItem
        pl="2"
        bg="pink.300"
        area="nav"
        display={{ base: "none", md: "block" }}
      >
        <AdminSidebar />
      </GridItem>

      {/* Main content */}
      <GridItem pl="2" bg="green.300" area="main">
        {renderComponent()}
      </GridItem>

      {/* Footer */}
      <GridItem pl="2" bg="blue.300" area="footer">
        <AdminFooter />
      </GridItem>
    </Grid>
  );
};

export default withAuth(AdminDashboardLayout);
