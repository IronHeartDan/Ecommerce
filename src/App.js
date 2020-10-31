import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import db, { auth } from "./Firebase";
import Header from "./Header";
import Login from "./Login";
import Product from "./Product";
import { addItem, emptyCart } from "./features/cartSlice";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Button } from "@material-ui/core";
import Register from "./Register";
import emptyCartPic from "./emptyCart.svg";

function App() {
  const user = useSelector(selectUser);
  const [cart, setCart] = useState([]);
  var totalPrice = 0;
  cart.forEach((item) => {
    if (item.quantity) {
      totalPrice += item.price * item.quantity;
    } else {
      totalPrice += item.price;
    }
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();

  const products = [
    {
      id: "1",
      title:
        "Nikon D5600 DSLR Camera Body with Single Lens: AF-P DX Nikkor 18-55 MM F/3.5-5.6G VR (16 GB SD Card)  (Black)",
      img:
        "https://rukminim1.flixcart.com/image/416/416/dslr-camera/y/p/e/d5600-nikon-d5600-original-imaezvbrzzukzjj9.jpeg?q=70",
      price: 39999,
      rating: 4.5,
    },
    {
      id: "2",
      title:
        "VEGA INSTA GLAM-1000 HAIR DRYER (VHDH-20) INSTA GLAM 1000 HAIR DRYER Hair Dryer  (1000 W, Pink)",
      img:
        "https://rukminim1.flixcart.com/image/416/416/keykscw0/hair-dryer/n/e/s/vega-insta-glam-1000-hair-dryer-vhdh-20-insta-glam-1000-hair-original-imafvgnat93rgwfz.jpeg?q=70",
      price: 499,
      rating: 4.0,
    },
    {
      id: "3",
      title: "Apple iPhone XR (Black, 64 GB) (Includes EarPods, Power Adapter)",
      img:
        "https://rukminim1.flixcart.com/image/416/416/jnj7iq80/mobile/u/b/g/apple-iphone-xr-mryj2hn-a-original-imafa6zkm7qhv2zd.jpeg?q=70",
      price: 45000,
      rating: 3.5,
    },
    {
      id: "4",
      title: "Women Embroidered Cotton Blend Flared Kurta  (Blue)",
      img:
        "https://rukminim1.flixcart.com/image/880/1056/k4n2avk0/kurta/k/g/2/m-rf-var119124-varanga-original-imafng7jft5h3zq8.jpeg?q=50",
      price: 823,
      rating: "4.0",
    },
    {
      id: "5",
      title:
        "Revolving Spice Rack Masala Rack Spice Box Masala Box Masala Container (1 Stand,16 Plastic Bottles With Steel Cap) Set 16 Piece Spice Set  (Plastic)",
      img:
        "https://rukminim1.flixcart.com/image/416/416/k5o7r0w0/condiment-set/m/w/k/360-revolving-spice-rack-masala-rack-spice-box-vgmax-original-imafd834bgsqgfqa.jpeg?q=70",
      price: 499,
      rating: "4.5",
    },
    {
      id: "6",
      title:
        "JBL C100TWS True Wireless with Google Assistant Bluetooth Headset  (Black, True Wireless)",
      img:
        "https://rukminim1.flixcart.com/image/416/416/k6fd47k0pkrrdj/headphone/z/f/j/jbl-c100tws-original-imafmtrsguv29yz6.jpeg?q=70",
      price: 2499,
      rating: "3.0",
    },
    {
      id: "7",
      title:
        "Adrenex by Flipkart AIRBIKE90BS Exercise Bicycle with Fixed Handles and Back Support Upright Stationary Exercise Bike  (Black)",
      img:
        "https://rukminim1.flixcart.com/image/416/416/kfpq5jk0/exercise-bike/b/d/j/airbike90bs-exercise-bicycle-with-fixed-handles-and-back-support-original-imafw459q5vhudt5.jpeg?q=70",
      price: 5999,
      rating: 4.5,
    },
    {
      id: "8",
      title:
        "Uberlyfe 3 Seater Sofa Cum Bed Double Sofa Bed  (Finish Color - DOTTED BLUE Mechanism Type - Fold Out)",
      img:
        "https://rukminim1.flixcart.com/image/416/416/k23m4cw0/sofa-bed/f/h/v/double-dotted-blue-chenille-scb-001733-dot-bl-smcrcl-uberlyfe-original-imafhgayerb7kquy.jpeg?q=70",
      price: 10237,
      rating: 4.0,
    },
  ];

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
        if (authUser.email) setName(`${authUser?.displayName}`);
        if (authUser.email) setEmail(`${authUser?.email}`);
        if (authUser.phoneNumber)
          setNumber(`${authUser?.phoneNumber.substring(3, 12)}`);
        db.collection("users")
          .doc(authUser.uid)
          .collection("cart")
          .onSnapshot((snapshot) => {
            setCart(snapshot.docs.map((doc) => doc.data()));
          });
      } else {
        dispatch(logout());
        setCart([]);
        dispatch(emptyCart());
        if (window.location.pathname !== "/") {
          window.location.replace("/");
        }
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(addItem(cart));
  });

  const addToCart = (addProduct) => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .doc(addProduct.id)
        .set({
          id: addProduct.id,
          title: addProduct.title,
          img: addProduct.img,
          price: addProduct.price,
          rating: addProduct.rating,
          quantity: 1,
        })
        .catch(console.error());
    } else {
      alert("SignIn For Adding Item In Cart...");
    }
  };

  const removeFromCart = (removeProduct) => {
    db.collection("users")
      .doc(user.uid)
      .collection("cart")
      .doc(removeProduct.id)
      .delete();
  };

  const increaseQuantity = (increaseProduct) => {
    let quantity = increaseProduct.quantity;
    quantity++;
    db.collection("users")
      .doc(user.uid)
      .collection("cart")
      .doc(increaseProduct.id)
      .set({
        id: increaseProduct.id,
        title: increaseProduct.title,
        img: increaseProduct.img,
        price: increaseProduct.price,
        rating: increaseProduct.rating,
        quantity: quantity,
      })
      .catch(console.error());
  };

  const decreaseQuantity = (decreaseProduct) => {
    let quantity = decreaseProduct.quantity;
    if (quantity === 1) {
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .doc(decreaseProduct.id)
        .delete();
    } else {
      quantity--;
      db.collection("users")
        .doc(user.uid)
        .collection("cart")
        .doc(decreaseProduct.id)
        .set({
          id: decreaseProduct.id,
          title: decreaseProduct.title,
          img: decreaseProduct.img,
          price: decreaseProduct.price,
          rating: decreaseProduct.rating,
          quantity: quantity,
        })
        .catch(console.error());
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/cart">
            <Header />
            {cart.length > 0 ? (
              <>
                <div className="helper">
                  <div className="helper__info">
                    <span>Cart-item Total</span>
                    <span>
                      <small>Rs</small>
                      {totalPrice}
                    </span>
                  </div>
                  <Link to="/checkout">
                    <Button>CheckOut</Button>
                  </Link>
                </div>
              </>
            ) : (
              <></>
            )}
            {cart.length > 0 ? (
              <>
                <div className="main">
                  {cart.map((item) => (
                    <Product
                      key={item.id}
                      product={item}
                      fun={removeFromCart}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      type="1"
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="empty__cart">
                  <img src={emptyCartPic} alt="" />
                  <h1>Your Cart Is Empty</h1>

                  <Link to="/">Shop Now</Link>
                </div>
              </>
            )}
          </Route>
          <Route path="/checkout">
            <Header />
            <div className="checkout">
              <div className="checkout__form">
                <h1>Add Details</h1>

                <div className="checkout__con">
                  <div className="checkout__input">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="checkout__input">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="checkout__input">
                    <label htmlFor="number">Number</label>
                    <input
                      type="number"
                      name="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>

                  <div className="checkout__input">
                    <label htmlFor="state">State</label>
                    <select name="state">
                      <option value="1">Andhra Pradesh</option>
                      <option value="2">Arunachal Pradesh</option>
                      <option value="3">Assam</option>
                      <option value="4">Bihar</option>
                      <option value="5">Chhattisgarh</option>
                      <option value="6">Goa</option>
                      <option value="7">Gujarat</option>
                      <option value="8">Haryana</option>
                      <option value="9">Himachal Pradesh</option>
                      <option value="10">Jharkhand</option>
                      <option value="11">Karnataka</option>
                      <option value="12">Kerala</option>
                      <option value="13">Madhya Pradesh</option>
                      <option value="14">Maharashtra</option>
                      <option value="15">Manipur</option>
                      <option value="16">Meghalaya</option>
                      <option value="17">Mizoram</option>
                      <option value="18">Nagaland</option>
                      <option value="19">Odisha</option>
                      <option value="20">Punjab</option>
                      <option value="21">Rajasthan</option>
                      <option value="22">Sikkim</option>
                      <option value="23">Tamil Nadu</option>
                      <option value="24">Telangana</option>
                      <option value="25">Tripura</option>
                      <option value="26">Uttarakhand</option>
                      <option value="27">Uttar Pradesh</option>
                      <option value="28">West Bengal</option>
                    </select>
                  </div>

                  <div className="checkout__input">
                    <label htmlFor="adress">Adress</label>
                    <textarea name="adress"></textarea>
                  </div>
                </div>
              </div>

              <div className="checkout__info">
                <h1>Total</h1>
                <div className="checkout__infoCon">
                  {cart.map((item) => (
                    <div className="totalItem" key={item.id}>
                      <img src={item.img} alt="" />
                      <div className="totalItem__info">
                        <span>{item.price}</span>
                        <strong>x</strong>
                        <span>{item.quantity}</span>
                      </div>
                      <div className="item__total">
                        <span>Rs-{item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="checkout__action">
                  <Button>Pay</Button>
                  <span>Rs-{totalPrice}</span>
                </div>
              </div>
            </div>
          </Route>
          <Route path="/">
            <Header />

            {cart.length > 0 ? (
              <>
                <div className="helper">
                  <div className="helper__info">
                    <span>Cart-item Total</span>
                    <span>
                      <small>Rs</small>
                      {totalPrice}
                    </span>
                  </div>
                  <Link to="/checkout">
                    <Button>CheckOut</Button>
                  </Link>
                </div>
              </>
            ) : (
              <></>
            )}

            {
              <div className="main">
                {products.map((product) => (
                  <Product key={product.id} product={product} fun={addToCart} />
                ))}
              </div>
            }
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
