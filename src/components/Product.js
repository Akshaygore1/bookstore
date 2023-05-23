import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../pages/CartContext"

const Product = ({ id, book }) => {
  const [isAdding, setIsAdding] = useState(false)
  const { cart, setCart } = useContext(CartContext)

  const { title, authors, imageLinks, pageCount } = book

  const addToCart = (e, book) => {
    e.preventDefault()
    const updatedCart = { ...cart }
    if (!updatedCart.items) {
      updatedCart.items = {}
    }
    if (updatedCart.items[id]) {
      updatedCart.items[id]++
    } else {
      updatedCart.items[id] = 1
    }
    if (!updatedCart.totalItems) {
      updatedCart.totalItems = 0
    }
    updatedCart.totalItems++
    console.log("----", updatedCart)
    setCart(updatedCart)
    setIsAdding(true)
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <Link to={`/books/${id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
        <div className="flex flex-col justify-between h-full">
          <img
            src={imageLinks.thumbnail}
            alt="bookcover"
            className="w-24 h-32 mx-auto mb-4 object-contain"
          />
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <span className="bg-gray-200 inline-block py-1 px-2 rounded-full text-sm">
              {authors.join(", ")}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-700">₹ {pageCount}</span>
          <button
            disabled={isAdding}
            onClick={(e) => {
              addToCart(e, book)
            }}
            className={`${
              isAdding ? "bg-green-500" : "bg-orange-500"
            } text-white py-2 px-4 rounded-full font-bold`}
          >
            Add{isAdding ? "ed" : ""}
          </button>
        </div>
      </div>
    </Link>
  )
}

export default Product
