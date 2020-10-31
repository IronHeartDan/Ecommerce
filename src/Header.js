import { Avatar } from "@material-ui/core";
import { Search, ShoppingBasket } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCart } from "./features/cartSlice";
import { selectUser } from "./features/userSlice";
import { auth } from "./Firebase";
import "./Header.css";
import logo from "./logo.png";
import worthshop from "./WorthShop.in.png";
import profile from "./profile.svg";

function Header() {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="" />
          <img src={worthshop} alt="" />
        </Link>
      </div>

      <div className="header__search">
        <input type="text" />
        <Search />
      </div>

      <div className="header__data">
        {user ? (
          <>
            <Link className="cart__link" to="/cart">
              <ShoppingBasket />
              <span>{cart.length}</span>
            </Link>
            <span className="header__name">{user?.displayName}</span>
            <div className="header__profile">
              <Avatar src={user.photo ? user.photo : profile} />
              <div className="profile__menu">
                <span>Profile</span>
                <span>Settings</span>
                <span onClick={() => auth.signOut()}>LogOut</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link className="profile__link" to="/login">
              <span>Sign In</span>
              <Avatar src={profile} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
