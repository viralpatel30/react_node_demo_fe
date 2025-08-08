import React, { useEffect, useState } from "react";
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
import { getProducts } from "../../services/request";
import CircularProgress from "@mui/material/CircularProgress";

interface Variant {
  name: string;
  amount: number;
}

interface Product {
  productId: number;
  name: string;
  variants: Variant[];
}

export const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getProducts();
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid columns={{ xs: 12, sm: 6, md: 4 }} key={product.productId}>
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
                        {product.name}
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
            ))
          ) : (
            <Typography>No products available.</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};
