import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PageNotFoundImage from "../../assets/PageNotFoundLogo.png";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Page } from "../../utils/route";

const PageNotFound: React.FC = () => {
  return (
    <React.Fragment>
      <Grid
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "700px",
            width: "700px",
            border: "1px solid black",
          }}
        >
          <Box
            sx={{
              padding: "1rem",
              height: "92%",
              width: "92%",
              backgroundSize: "contain",
              backgroundImage: `url(${PageNotFoundImage})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            {" "}
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{ textTransform: "none", margin: "1rem", cursor: "pointer" }}
          component={Link}
          to={Page.LOGIN_PAGE}
        >
          Go to Login
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default PageNotFound;
