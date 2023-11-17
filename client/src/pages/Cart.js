import React from "react";
import { useLocation } from "react-router-dom";

import { Box, Typography, Avatar, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

// import RazorpayComponent from "../components/Razorpay";

const Cart = ({ cart, updateQuantity, removeItem, setCart, recommand }) => {
  const params = useLocation();
  const pathArray = params.pathname.split("/");

  // Get the last element of the array (after the last "/")
  const lastSegment = pathArray[pathArray.length - 1];

  // Use parseInt to extract the numeric part
  const numberAfterLastSlash = parseInt(lastSegment, 10);

  const getTotalPrice = () => {
    let val = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return val;
  };

  console.log(numberAfterLastSlash);
  const checkout = async (netAmount, timestamp) => {
    const orderData = {
      items: cart, // Assuming 'cart' contains the items you want to order
      netAmount: netAmount,
      timestamp: timestamp,
      tableNumber: numberAfterLastSlash,
    };

    try {
      const response = await fetch(
        `https://s-table-server.vercel.app/restaurants/655323b268039e71097c7091/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Error creating order");
      }
      alert("Order Placed Successfully");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating order");
    }
  };

  return (
    <Box
      p={2}
      border="1px solid #ccc"
      borderRadius="8px"
      sx={{
        marginTop: "100px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Cart
      </Typography>
      {cart?.map((item, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Avatar
            alt={item.title}
            src={item.image}
            sx={{ width: 100, height: 100, marginRight: 4 }}
          />
          <Box>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body1">{item.desc}</Typography>
            <Box mt={2} display="flex" alignItems="center">
              <IconButton
                color="primary"
                aria-label="remove"
                onClick={() => updateQuantity(item.id, -1)}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{item.quantity}</Typography>
              <IconButton
                color="primary"
                aria-label="add"
                onClick={() => updateQuantity(item.id, 1)}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Typography variant="body1">
              ₹{item.price * item.quantity}
            </Typography>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeItem(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Typography variant="h6">Total: ₹{getTotalPrice()}</Typography>
      {/* <RazorpayComponent amt={getTotalPrice()} /> */}
      {/* <Button variant="contained" sx={{ color: "white" }}>
        <a
          style={{
            color: "white",
            textDecoration: "none",
          }}
          href="upi://pay?pa=UPIID@oksbi&amp;pn=Chirag Jani&amp;cu=INR"
        >
          Pay Now !
        </a>
      </Button> */}
      <Button
        variant="contained"
        sx={{ color: "white" }}
        onClick={() => {
          checkout(getTotalPrice(), Date.now());
        }}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default Cart;
