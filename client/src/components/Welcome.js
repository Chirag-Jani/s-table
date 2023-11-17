import { Box, Typography } from "@mui/material";
import React from "react";

const Welcome = ({ restoName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
      }}
    >
      <img
        src="https://t3.ftcdn.net/jpg/05/53/00/78/360_F_553007886_vpgBDlwAyAaCTABowvIaPMPg437haVKR.jpg"
        alt=""
        style={{
          width: "300px",
          height: "auto",
          margin: "auto",
          marginTop: "200px",
        }}
      />
      <Typography
        sx={{
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        {restoName}
      </Typography>
    </Box>
  );
};

export default Welcome;
