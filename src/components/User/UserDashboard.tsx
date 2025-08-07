import React from "react";
import {
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  InputAdornment,
  Paper,
  Divider,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, FieldArray, FormikErrors } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import toastSuccess from "../../utils/toast";
import { REQUIRED_ERROR, TOASTER_SUCCESS_MSG } from "../../utils/enum";
import { Variant } from "../../models/Variant";

export const UserDashboard: React.FC = () => {
  const handleSubmit = () => {
    toastSuccess(TOASTER_SUCCESS_MSG.PRODUCT_CREATION_SUCCESS);
  };

  const INITIAL_FORM_STATE = {
    name: "",
    variants: [{ name: "", amount: "" }],
  };

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required(REQUIRED_ERROR.PRODUCT_NAME),
    variants: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(REQUIRED_ERROR.VARIANT_NAME),
          amount: Yup.number()
            .typeError(REQUIRED_ERROR.AMOUNT_NUMBER_TYPE)
            .required(REQUIRED_ERROR.AMOUNT_NUMBER),
        })
      )
      .min(1, REQUIRED_ERROR.AT_LEAST_ONE_VARIANT),
  });

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 900,
        mx: "auto",
        bgcolor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Create Product
        </Typography>
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <TextField
                label="Product Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                margin="normal"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight={600}>
                Variants
              </Typography>

              <FieldArray name="variants">
                {({ push, remove }) => (
                  <>
                    {values.variants.map((variant, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mt: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <TextField
                          label="Variant Name"
                          name={`variants[${index}].name`}
                          value={variant.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ flex: 1, minWidth: 120 }}
                          error={
                            touched.variants?.[index]?.name &&
                            Boolean(
                              (
                                errors.variants?.[
                                  index
                                ] as FormikErrors<Variant>
                              )?.name
                            )
                          }
                          helperText={
                            touched.variants?.[index]?.name &&
                            (errors.variants?.[index] as FormikErrors<Variant>)
                              ?.name
                          }
                        />
                        <TextField
                          label="Amount"
                          name={`variants[${index}].amount`}
                          type="number"
                          value={variant.amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ width: 200 }}
                          error={
                            touched.variants?.[index]?.amount &&
                            Boolean(
                              (
                                errors.variants?.[
                                  index
                                ] as FormikErrors<Variant>
                              )?.amount
                            )
                          }
                          helperText={
                            touched.variants?.[index]?.amount &&
                            (errors.variants?.[index] as FormikErrors<Variant>)
                              ?.amount
                          }
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  ₹
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  INR
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                        <IconButton onClick={() => remove(index)} color="error">
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    ))}

                    <Button
                      variant="text"
                      startIcon={<AddIcon />}
                      onClick={() => push({ name: "", amount: "" })}
                      disableRipple
                      sx={{ mt: 2 }}
                    >
                      Add Variant
                    </Button>
                  </>
                )}
              </FieldArray>

              <Divider sx={{ my: 3 }} />

              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">
                  Submit Product
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};
