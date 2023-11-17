import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardHeader,
  CardActionArea,
  Box,
  Button,
} from "@mui/material";

const Dashboard = ({ data }) => {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        marginTop: "100px",
      }}
    >
      {data?.restos?.map((restaurant) => (
        <Grid item key={restaurant._id} xs={12} md={12} lg={12}>
          <Card>
            {/* Displaying restaurant name as header and ID underneath */}
            <CardHeader
              title={restaurant.name}
              subheader={`ID: ${restaurant._id}`}
            />
            {/* Removed CardMedia for restaurant image */}
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                {/* Displaying cards for tables 1, 2, and 3 */}
                {[1, 2, 3].map((tableNumber) => (
                  <Card
                    key={tableNumber}
                    onClick={() => setSelectedTable(tableNumber)}
                    sx={{
                      cursor: "pointer",
                      marginTop: 2,
                      width: "30%",
                    }}
                  >
                    <CardActionArea
                      sx={{
                        border:
                          selectedTable === tableNumber && "1px solid red",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          Table {tableNumber}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>

              {/* Displaying orders for the selected table */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {restaurant.orders.map((order) => (
                  <Box key={order.tableNumber}>
                    {selectedTable === order.tableNumber && (
                      <Box
                        sx={{
                          margin: "20px",
                        }}
                      >
                        <Card
                          key={order._id}
                          sx={{ marginTop: 2, padding: "20px" }}
                        >
                          <Typography variant="body2" color="textSecondary">
                            <strong>Order ID:</strong> {order._id}
                          </Typography>
                          {order.items.map((item) => (
                            <CardContent>
                              <Typography variant="body2" color="textSecondary">
                                {item.quantity} x {item.title} - ₹
                                {item.price * item.quantity}
                              </Typography>
                              {/* Add other item details here */}
                            </CardContent>
                          ))}
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{
                              margin: "10px 0",
                            }}
                          >
                            <strong>Net Amount:</strong> ₹{order.netAmount}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{
                              margin: "10px 0",
                            }}
                          >
                            <strong>Timestamp:</strong> {order.timestamp}
                          </Typography>
                          <Box>
                            <Button
                              variant="outlined"
                              color="error"
                              sx={{
                                margin: "10px",
                              }}
                            >
                              Pending
                            </Button>
                            <Button
                              variant="outlined"
                              color="warning"
                              sx={{
                                margin: "10px",
                              }}
                            >
                              In Progress
                            </Button>
                            <Button
                              variant="outlined"
                              color="success"
                              sx={{
                                margin: "10px",
                              }}
                            >
                              Delivered
                            </Button>
                          </Box>
                        </Card>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
