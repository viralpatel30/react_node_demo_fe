import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import toastSuccess from "../../utils/toast";
import type { Variant } from "../../models/Variant";
import { TOASTER_SUCCESS_MSG } from "../../utils/enum";

export const UserDashboard: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [variants, setVariants] = useState<Variant[]>([
    { name: "", amount: "" },
  ]);

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string
  ) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };
  const handleAddVariant = () => {
    setVariants([...variants, { name: "", amount: "" }]);
  };

  const handleRemoveVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleSubmit = () => {
    console.log("name:", name);
    console.log("Variants:", variants);
    setName("");
    setVariants([{ name: "", amount: "" }]);
    toastSuccess(TOASTER_SUCCESS_MSG.VARIANT_SUBMITTED);
  };

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
          Product Information
        </Typography>

        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" fontWeight={600}>
          Variants
        </Typography>

        {variants.length > 0 ? (
          variants.map((variant, index) => (
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
                value={variant.name}
                onChange={(e) =>
                  handleVariantChange(index, "name", e.target.value)
                }
                sx={{ flex: 1, minWidth: 120 }}
              />
              <TextField
                label="Amount"
                type="number"
                value={variant.amount}
                onChange={(e) =>
                  handleVariantChange(index, "amount", e.target.value)
                }
                sx={{ width: 200 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">INR</InputAdornment>
                    ),
                  },
                }}
              />
              <IconButton
                onClick={() => handleRemoveVariant(index)}
                color="error"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography>Please add at least one variant.</Typography>
        )}

        <Button
          variant="text"
          startIcon={<AddIcon />}
          onClick={handleAddVariant}
          disableRipple
          sx={{ mt: 2 }}
        >
          Add Variant
        </Button>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Product
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
