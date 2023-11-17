import { useRef } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, TextField } from "@mui/material";

import Recommand from "./Recommand";

export default function MenuCard({
  cardId,
  cardImage,
  cardTitle,
  cardDesc,
  cardPrice,
  cart,
  setCart,
  addToCart,
  recommand,
  shorRecommandations,
}) {
  const quantityRef = useRef(0);

  const handleMouseEnter = (e) => {
    e.currentTarget.querySelector("img").style.transform = "scale(1.1)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.querySelector("img").style.transform = "scale(1)";
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 345,
        boxShadow: "4px 4px 7px rgba(0, 0, 0, 0.3)",
        margin: "10px",
      }}
    >
      <CardActionArea
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardMedia
          component="img"
          height="240"
          image={cardImage}
          alt={cardTitle}
          style={{ transition: "transform 0.5s" }}
        />
        <CardContent
          sx={{
            margin: "5px 5px",
            padding: "8px 15px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {cardTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardDesc}
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ marginRight: "4px" }}>₹</span>
            {cardPrice}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          margin: "5px 5px",
          paddingTop: 0,
        }}
      >
        <TextField
          id="quantity"
          label="Quantity"
          type="number"
          variant="outlined"
          size="small"
          sx={{ marginRight: 2, width: "45%" }} // Adjust spacing and width as needed
          inputRef={quantityRef}
          inputProps={{ min: 0 }}
        />
        <Button
          size="medium"
          color="primary"
          variant="outlined"
          onClick={() => {
            addToCart(
              quantityRef.current.value,
              cardTitle,
              cardPrice,
              cardImage,
              cardId
            );
            quantityRef.current.value = 0;
          }}
          sx={{ textTransform: "none", width: "45%" }} // Prevent uppercase text
        >
          Add to Cart
        </Button>
        {shorRecommandations && (
          <Recommand
            recommand={recommand}
            addToCart={addToCart}
            cart={cart}
            setCart={setCart}
          />
        )}
      </CardActions>
    </Card>
  );
}
