import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import MenuCard from "./MenuCard";

export default function Recommand({ recommand, addToCart, cart, setCart }) {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor) => (
    <Box
      sx={{
        wiwidth: "auto",
        display: "flex",
        overflowX: "auto",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {recommand?.map((item) => {
        return (
          <MenuCard
            key={item.details.title}
            cardImage={item.details.img}
            cardTitle={item.details.title}
            cardDesc={item.details.desc}
            cardPrice={item.details.price}
            cardId={item.details.id}
            cart={cart}
            setCart={setCart}
            addToCart={addToCart}
            recommand={recommand}
            shorRecommandations={false}
          />
        );
      })}
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"bottom"}>
        <Button onClick={toggleDrawer(true)} variant="outlined">
          More
        </Button>
        <Drawer anchor={"bottom"} open={state} onClose={toggleDrawer(false)}>
          {list("bottom")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
