import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Divider,
  Box,
  Chip,
  useTheme,
} from "@mui/material";

interface Variant {
  name: string;
  amount: number;
}

interface Product {
  id: number;
  productName: string;
  description: string;
  variants: Variant[];
}

const products: Product[] = [
  {
    id: 1,
    productName: "Product 1",
    description: "This is product 1 description.",
    variants: [
      { name: "Small", amount: 100 },
      { name: "Large", amount: 200 },
    ],
  },
  {
    id: 2,
    productName: "Product 2",
    description: "Short description.",
    variants: [{ name: "Default", amount: 150 }],
  },
  {
    id: 3,
    productName: "Product 3",
    description: "Another product description.",
    variants: [],
  },
];

export const AdminDashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: theme.palette.primary.main,
          textAlign: "center",
        }}
      >
        Admin Dashboard
      </Typography>

      <Typography my={2}>
        This is the admin dashboard where you can manage products.
      </Typography>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid columns={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <Card
              sx={{
                height: "100%",
                width: 300,
                borderRadius: 3,
                transition: "0.3s",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {product.productName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.description}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 500, mb: 1 }}
                  >
                    Variants:
                  </Typography>

                  {product.variants.length > 0 ? (
                    product.variants.map((variant, index) => (
                      <Chip
                        key={index}
                        label={`${variant.name}: ₹${variant.amount}`}
                        sx={{ mr: 1, mb: 1 }}
                        variant="outlined"
                        color="primary"
                      />
                    ))
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.disabled"
                      sx={{ fontStyle: "italic" }}
                    >
                      No variants available
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
