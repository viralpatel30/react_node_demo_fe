import React, { useCallback, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Page from "../../utils/route";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = useCallback(() => {
    console.log("Email:", email);
    console.log("Password:", password);
  }, [email, password]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Box p={3} className="bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <TextField
          label="Email"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          placeholder="Enter your email"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mt: 2 }}
          variant="standard"
          placeholder="Enter your password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          sx={{ mt: 2, borderRadius: "20px" }}
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography
            sx={{
              color: "black",
              textTransform: "none",
              fontFamily: "cursive",
            }}
          >
            Don't have an account?
            <Link to={Page.REGISTRATION_PAGE} className="text-blue-500">
              SignUp
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
