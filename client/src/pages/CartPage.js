import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter(item => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Update quantity of an item in cart
  const updateQuantity = (pid, quantity) => {
    try {
      const updatedCart = cart.map(item => {
        if (item._id === pid) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get total price
  const totalPrice = () => {
    try {
      let total = cart.reduce((acc, item) => acc + item.ticketPrice * (item.quantity || 1), 0);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {cart?.map((item) => (
                <div className="row card flex-row mb-2" key={item._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/site/site-photo/${item._id}`}
                      className="card-img-top"
                      alt={item.name}
                      width="100%"
                      height="130px"
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <p>Price: {item.ticketPrice}</p>
                  </div>
                  <div className="col-md-4">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <button className="btn btn-outline-warning">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
