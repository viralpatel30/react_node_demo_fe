import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Page } from "../../utils/route";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  REQUIRED_ERROR,
  TOASTER_ERROR_MSG,
  TOASTER_SUCCESS_MSG,
} from "../../utils/enum";
import { loginUser } from "../../services/request";
import toastSuccess, { toastError } from "../../utils/toast";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const access_token =
  import.meta.env.VITE_LOCAL_STORAGE_ACCESS_TOKEN || "access_token";

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email().required(REQUIRED_ERROR.EMAIL),
  password: Yup.string().min(6).required(REQUIRED_ERROR.PASSWORD),
});

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (values: typeof INITIAL_FORM_STATE) => {
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const response = await loginUser(data);
      // Set access token in local storage
      const tokenData = {
        accessToken: response,
        email: values.email,
      };
      const tokenDataString = JSON.stringify(tokenData);
      localStorage.setItem(access_token, tokenDataString);
      toastSuccess(TOASTER_SUCCESS_MSG.IS_LOGIN);
      navigate(Page.USER_DASHBOARD);
    } catch (error) {
      toastError(TOASTER_ERROR_MSG.IS_LOGIN_FAILED);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Box p={3} className="bg-white shadow-lg rounded-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <TextField
                label="Email"
                name="email"
                fullWidth
                type="email"
                variant="standard"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                name="password"
                fullWidth
                type={showPassword ? "text" : "password"}
                variant="standard"
                sx={{ mt: 2 }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
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
                type="submit"
                variant="contained"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                sx={{ mt: 2, borderRadius: "20px" }}
                fullWidth
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography
            sx={{
              color: "black",
              textTransform: "none",
              fontFamily: "cursive",
            }}
          >
            Don't have an account?{" "}
            <Link to={Page.REGISTRATION_PAGE} className="text-blue-500">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
