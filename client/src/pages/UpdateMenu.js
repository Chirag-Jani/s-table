import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const UpdateMenu = ({ menu, setMenu }) => {
  const [newItem, setNewItem] = useState({
    id: "",
    title: "",
    price: "",
    desc: "",
    img: "",
  });

  const addItemToMenu = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/restaurants/655323b268039e71097c7091/update-menu`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ menuItems: [newItem] }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update menu");
      }

      // If the API call is successful, update the menu state
      const updatedMenu = await response.json();
      setMenu(updatedMenu.restaurant.menu);

      // Clear the form fields
      setNewItem({
        id: "",
        title: "",
        price: "",
        desc: "",
        img: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        margin: "100px",
      }}
    >
      <Typography variant="h4">Menu</Typography>
      {/* Display the existing menu items */}
      <Grid container spacing={2}>
        {menu.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>{item.desc}</Typography>
                <Typography>${item.price}</Typography>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Form to add a new item to the menu */}
      <form>
        <TextField
          label="ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newItem.id}
          onChange={(e) => setNewItem({ ...newItem, id: e.target.value })}
        />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={newItem.desc}
          onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
        />
        <TextField
          label="Image"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newItem.img}
          onChange={(e) => setNewItem({ ...newItem, img: e.target.value })}
        />
        <Button variant="contained" onClick={addItemToMenu}>
          Add New Item
        </Button>
      </form>
    </div>
  );
};

export default UpdateMenu;
