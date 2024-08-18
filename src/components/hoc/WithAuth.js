// src/components/hoc/withAuth.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  selectIsAuthenticated,
  selectUser,
  setUser,
} from "../../store/slices/user/auth/userAuthSlice";
import axios from "axios";

const WithAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);

    useEffect(() => {
      const checkAuth = async () => {
        if (!isAuthenticated) {
          try {
            const response = await axios.get("/api/user/auth/me");
            dispatch(setUser(response.data));
          } catch (error) {
            console.error("Authentication check failed:", error);
            router.push(`/auth/login?redirect=${router.asPath}`);
          }
        }
      };

      checkAuth();
    }, [isAuthenticated, dispatch, router]);

    if (!isAuthenticated && !user) {
      return <div>Loading...</div>; // Or a more user-friendly spinner
    }

    return <WrappedComponent {...props} />;
  };

  AuthHOC.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthHOC;
};

export default WithAuth;
