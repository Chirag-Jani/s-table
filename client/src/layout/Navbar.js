import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Explore",
    path: "/explore/1",
  },
  {
    label: "Update Menu",
    path: "/update-menu",
  },
];

function Navbar({ cart }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const params = useLocation();
  const pathArray = params.pathname.split("/");

  // Get the last element of the array (after the last "/")
  const lastSegment = pathArray[pathArray.length - 1];

  // Use parseInt to extract the numeric part
  const numberAfterLastSlash = parseInt(lastSegment, 10);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "rgba(22, 41, 102, 1)",
        color: "white",
        minHeight: "100vh",
        minWidth: {
          xs: "180px",
          sm: "220px",
          m: "220px",
          lg: "250px",
          xl: "250px",
        },
      }}
    >
      <Link
        to={"/"}
        style={{
          textDecoration: "none",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontSize: "25px",
            p: 3,
          }}
        >
          Secure Table
        </Typography>
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link
            to={item.path}
            style={{
              textDecoration: "none",
              color: "white",
            }}
            key={item.label}
          >
            <ListItem key={item.label} disablePadding>
              <ListItemButton sx={{ textAlign: "start" }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          backgroundColor: "rgba(22, 41, 102, 1)",
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: {
                xs: "block",
                sm: "block",
                m: "block",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "25px",
                }}
              >
                Secure Table
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 1, // This will distribute space evenly
              display: { xs: "none", sm: "none", m: "block", lg: "block" },
            }}
          >
            {navItems.map((item) => (
              <Link
                to={item.path}
                style={{
                  textDecoration: "none",
                }}
                key={item.label}
              >
                <Button
                  key={item.label}
                  sx={{
                    color: "#fff",
                    textTransform: "capitalize",
                    fontWeight: "700",
                    margin: "20px",
                    fontSize: {
                      xl: "22px",
                      m: "22px",
                      sm: "20px",
                      xs: "20px",
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              textDecoration: "none",
            }}
            component={Link}
            to={`cart/${numberAfterLastSlash}`}
          >
            <ShoppingCartIcon sx={{ fontSize: 40, marginRight: 2 }} />
            <Typography
              sx={{
                fontSize: "20px",
                fontWeigth: "bold",
              }}
            >
              {cart?.length}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
export default Navbar;
