import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import axiosInstance from "./utils/axiosInstance";

function Dashboard() {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axiosInstance.get(
            "/api/users/userinfo",
            config
          );
          setIsLoggedIn(true);
          setUser(response.data.username);
        } else {
          setIsLoggedIn(false);
          setUser("");
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await axiosInstance.post("/api/users/logout/", {
          refresh: refreshToken,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Paper elevation={3} style={{ padding: "20px" }}>
          {isLoggedIn ? (
            <>
              <Typography variant="h4">Hello, {user} !</Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="h3">Please Login!</Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default Dashboard;
