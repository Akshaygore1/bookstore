import React from "react"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../pages/CartContext"

const Navigation = () => {
  const cartStyle = {
    background: "#FFAE42",
    display: "flex",
    padding: "6px 12px",
    borderRadius: "50px"
  }

  const { cart } = useContext(CartContext)

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <img style={{ height: 60 }} src="/images/book-logo.png" alt="logo" />
        </Link>

        <ul className="flex items-center">
          <li>
            <Link to="/">
              <b style={{ color: "white" }}>Money</b>
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/fiction">
              <b style={{ color: "white" }}>fiction</b>
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/Travel">
              <b style={{ color: "white" }}>Travel</b>
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/childrens">
              <b style={{ color: "white" }}>childrens</b>
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/cart">
              <div style={cartStyle}>
                <span>{cart.totalItems ? cart.totalItems : 0}</span>
                <img
                  className="ml-2"
                  style={{ height: 30 }}
                  src="/images/cart.png"
                  alt="cart-icon"
                ></img>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navigation
