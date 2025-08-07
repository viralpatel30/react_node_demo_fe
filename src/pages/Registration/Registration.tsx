import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Page } from "../../utils/route";
import { Link, useNavigate } from "react-router-dom";
import {
  REQUIRED_ERROR,
  TOASTER_ERROR_MSG,
  TOASTER_SUCCESS_MSG,
} from "../../utils/enum";
import { registerUser } from "../../services/request";
import toastSuccess, { toastError } from "../../utils/toast";

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(REQUIRED_ERROR.NAME),
  email: Yup.string().email().required(REQUIRED_ERROR.EMAIL),
  password: Yup.string().min(6).required(REQUIRED_ERROR.PASSWORD),
});

export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const handleSubmit = async (values: typeof INITIAL_FORM_STATE) => {
    try {
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      const response = await registerUser(data);
      console.log("Registration response", response);
      navigate(Page.USER_DASHBOARD);
      toastSuccess(TOASTER_SUCCESS_MSG.IS_REGISTER);
    } catch (error) {
      toastError(TOASTER_ERROR_MSG.IS_REGISTER_FAILED);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Box p={3} className="bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <TextField
                label="Name"
                name="name"
                fullWidth
                type="text"
                placeholder="Enter your name"
                variant="standard"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
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
                name="email"
                fullWidth
                type="email"
                sx={{ mt: 2 }}
                variant="standard"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
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
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                placeholder="Enter your password"
                sx={{ mt: 2 }}
                variant="standard"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
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
                variant="contained"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                sx={{ mt: 2, borderRadius: "20px" }}
                fullWidth
                type="submit"
              >
                Register
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
