import React from "react";

import { Box } from "@mui/material";

import MenuCard from "../components/MenuCard";

const Explore = ({ cart, setCart, menu, addToCart, recommand }) => {
  return (
    <Box
      sx={{
        margin: "150px 20px 150px 20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {menu?.map((menuItem) => {
          return (
            <MenuCard
              key={menuItem.title}
              cardImage={menuItem.img}
              cardTitle={menuItem.title}
              cardDesc={menuItem.desc}
              cardPrice={menuItem.price}
              cardId={menuItem.id}
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
              recommand={recommand}
              shorRecommandations={true}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Explore;
