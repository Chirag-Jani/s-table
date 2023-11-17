import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Cart from "./pages/Cart";
import UpdateMenu from "./pages/UpdateMenu";
import Dashboard from "./pages/Dashboard";

function App() {
  const [data, setData] = useState();
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]);
  const [recommand, setRecommand] = useState([]);

  const getData = async () => {
    try {
      let response = await fetch("http://127.0.0.1:8080/");
      if (!response.ok) {
        throw new Error("Error creating order");
      }
      let resData = await response.json();
      setData(resData);

      if (resData?.restos.length !== 0) {
        let dbMenu = resData.restos[0].menu;
        setMenu(dbMenu);
      }
    } catch (error) {
      console.error(error);
      // throw new Error("Error creating order");
    }
  };

  const addToCart = async (_quantity, _title, _price, _image, _id) => {
    if (_quantity > 0) {
      const existingItem = cart.find((item) => item.id === _id);
      if (existingItem) {
        const updatedCart = cart.map((item) => {
          if (item.id === _id) {
            return {
              ...item,
              quantity: item.quantity + parseInt(_quantity),
            };
          }
          return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        setCart([
          ...cart,
          {
            id: _id,
            title: _title,
            price: _price,
            quantity: parseInt(_quantity),
            image: _image,
          },
        ]);
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...cart,
            {
              id: _id,
              title: _title,
              price: _price,
              quantity: parseInt(_quantity),
              image: _image,
            },
          ])
        );
      }
      // let url = "http://127.0.0.1:8085/recommend?items=" + _title;
      // let res = await fetch(url);
      // let data = await res.json();
      // setRecommand(data.recommendations);
      console.log(data);
    } else {
      alert("Minimum quantity 1.");
    }
  };

  const updateQuantity = (itemId, change) => {
    const updatedCartItems = cart
      .map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, quantity: item.quantity + change };
          return updatedItem.quantity === 0 ? null : updatedItem;
        }
        return item;
      })
      .filter(Boolean);

    setCart(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const removeItem = (itemId) => {
    const updatedCartItems = cart.filter((item) => item.id !== itemId);
    setCart(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  useEffect(() => {
    let cartData = localStorage.getItem("cart");
    if (cartData?.length > 0) {
      setCart(JSON.parse(cartData));
    }
    getData();
  }, []);

  return (
    <Router>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/dashboard" element={<Dashboard data={data} />} />
        <Route
          path="/explore/:tableNumber"
          element={
            <Explore
              cart={cart}
              setCart={setCart}
              menu={menu}
              addToCart={addToCart}
              recommand={recommand}
            />
          }
        />
        <Route
          path="/cart/:tableNumber"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          }
          setCart={setCart}
        />
        <Route
          path="/update-menu"
          element={<UpdateMenu menu={menu} setMenu={setMenu} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
