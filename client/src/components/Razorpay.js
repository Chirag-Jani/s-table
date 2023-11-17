import { Button } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";

function getQueryParams() {
  var params = {};
  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (str, key, value) {
      params[key] = value;
    }
  );
  return params;
}

function RazorpayComponent({ amt }) {
  const [totalPrice, setTotalPrice] = useState(amt);
  const [tableNumber, setTableNumber] = useState(0);
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    var queryParams = getQueryParams();
    setOrderData(
      queryParams.order ? JSON.parse(decodeURIComponent(queryParams.order)) : {}
    );
    setTableNumber(
      queryParams.table_number ? parseInt(queryParams.table_number) : 0
    );
    setTotalPrice(queryParams.total ? parseFloat(queryParams.total) : amt);
  }, [amt]);

  const options = useMemo(() => {
    return {
      key: "rzp_test_x6gwd2RFp6bql6", // Your Razorpay key
      amount: (totalPrice * 100 + totalPrice * 0.05 * 100).toFixed(0), // Convert to paise and round off
      currency: "INR",
      name: "Restaurant Name",
      description: `Payment for Table ${tableNumber}`,
      image: "URL_TO_YOUR_LOGO",
      handler: function (response) {
        alert(
          "Payment successful! Payment ID: " + response.razorpay_payment_id
        );
        let query = `order=${encodeURIComponent(
          JSON.stringify(orderData)
        )}&total=${totalPrice}&table_number=${tableNumber}`;
        window.location.href = "http://localhost:5000/payment/success?" + query;
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
      },
      notes: {
        order_id: "YOUR_ORDER_ID",
      },
      theme: {
        color: "#007bff",
      },
    };
  }, [totalPrice, tableNumber, orderData]);

  useEffect(() => {
    var rzp = new window.Razorpay(options);
    const buttonElement = document.getElementById("rzp-button");

    buttonElement.addEventListener("click", function (e) {
      rzp.open();
      e.preventDefault();
    });

    return () => {
      buttonElement.removeEventListener("click", function (e) {
        rzp.open();
        e.preventDefault();
      });
    };
  }, [options]);

  return (
    <div>
      <Button variant="contained" id="rzp-button">
        Pay with Razorpay
      </Button>
    </div>
  );
}

export default RazorpayComponent;
