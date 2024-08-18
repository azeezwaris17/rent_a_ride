import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/user/auth/userAuthSlice";
import UserHeader from "../../../components/user/dashboard/UserHeader";
import UserSidebar from "../../../components/user/dashboard/UserSidebar";
import UserFooter from "../../../components/user/dashboard/UserFooter";
import UserDashboard from "../../../components/user/dashboard/UserDashboard";
import UserBookings from "../../../components/user/dashboard/UserBookings";
import UserProfile from "../../../components/user/dashboard/UserProfile";
import UserSettings from "../../../components/user/dashboard/UserSettings";
import { Grid, GridItem } from "@chakra-ui/react";

const UserDashboardLayout = ({ component, setComponent }) => {
  const user = useSelector(selectUser);
  const isUser = user?.role === "user";

  if (!isUser) return null;

  const renderComponent = () => {
    switch (component) {
      case "Bookings":
        return <UserBookings />;
      case "UserProfile":
        return <UserProfile />;
      case "UserSettings":
        return <UserSettings />;
      default:
        return <UserDashboard />;
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
      <GridItem bg="orange.300" area="header">
        <UserHeader setComponent={setComponent} />
      </GridItem>

      <GridItem
        mt="4"
        bg="pink.300"
        area="nav"
        display={{ base: "none", md: "block" }}
      >
        <UserSidebar setComponent={setComponent} />
      </GridItem>

      <GridItem
        pl="2"
        marginTop={{ base: "none", md: "4" }}
        marginLeft={{ base: "none", md: "4" }}
        bg="green.300"
        area="main"
      >
        {renderComponent()}
      </GridItem>

      <GridItem pl="2" bg="blue.300" area="footer">
        <UserFooter />
      </GridItem>
    </Grid>
  );
};

export default UserDashboardLayout;
