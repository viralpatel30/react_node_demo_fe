import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Page from "../../utils/route";
import { Link } from "react-router-dom";

export const Registration: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to prevent mouse down event propagation
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Box p={3} className="bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <TextField
          label="Name"
          fullWidth
          type="text"
          placeholder="Enter your name"
          value={name}
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Email"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 2 }}
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
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          fullWidth
          placeholder="Enter your password"
          sx={{ mt: 2 }}
          variant="standard"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
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
          sx={{ mt: 2 }}
          fullWidth
        >
          Register
        </Button>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography
            sx={{
              color: "black",
              textTransform: "none",
              fontFamily: "cursive",
            }}
          >
            Already have an account?
            <Link to={Page.LOGIN_PAGE} className="text-blue-500">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
