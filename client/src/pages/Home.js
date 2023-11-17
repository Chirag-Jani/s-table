import React from "react";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import Welcome from "../components/Welcome";

const Home = ({ data }) => {
  const ImportImages = () => {
    const imageContext = require.context(
      "../assets/tableQrCodes/",
      false,
      /\.(png|jpe?g|svg)$/
    );
    const images = imageContext.keys().map(imageContext);

    return (
      <Grid container spacing={2}>
        {images.map((src, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    textAlign: "center",
                  }}
                >
                  Table Number: {index + 1}
                </Typography>
                <img
                  src={src}
                  alt={`${index}`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Welcome restoName={data?.restos[0]?.name} />
      <Paper elevation={3} style={{ padding: "16px", marginTop: "100px" }}>
        <Box textAlign="center">
          <Typography variant="h2" sx={{ marginBottom: "16px" }}>
            Scan the QR to get to the Table!!!
          </Typography>
          {ImportImages()}
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
