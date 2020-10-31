import { Button } from "@material-ui/core";
import React from "react";
import "./Product.css";

function Product({ product, fun, increaseQuantity, decreaseQuantity, type }) {
  return (
    <div className="product">
      <img className="product__image" src={product.img} alt="" />
      <div className="product__data">
        <div className="product__info">
          <span>{product.title.substring(0, 50)}...</span>
          <p>
            Rating : <strong>{product.rating}</strong>{" "}
          </p>
          <p>
            <small>Rs.</small>
            <strong>{product.price}</strong>
          </p>
        </div>
      </div>
      {product.quantity ? (
        <div className="product__quantity">
          <Button onClick={() => decreaseQuantity(product)}>-</Button>
          <span>{product.quantity}</span>
          <Button onClick={() => increaseQuantity(product)}>+</Button>
        </div>
      ) : (
        <></>
      )}
      {type === "1" ? (
        <>
          <Button onClick={() => fun(product)}>Remove</Button>
        </>
      ) : (
        <>
          <Button onClick={() => fun(product)}>Add To Cart</Button>
        </>
      )}
    </div>
  );
}

export default Product;
