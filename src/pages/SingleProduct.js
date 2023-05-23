import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../pages/CartContext"

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({})
  const params = useParams()
  const navigate = useNavigate()
  const { cart, addToCart } = useContext(CartContext)

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${params._id}`)
      .then((response) => response.json())
      .then((data) => {
        setSingleProduct(data.volumeInfo)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [params._id])

  const handleAddToCart = () => {
    addToCart(singleProduct) // Add the singleProduct to the cart
    navigate("/cart") // Navigate to the cart page
  }

  return (
    <div className="bg-black min-h-screen p-10">
      <div className="container mx-auto mt-12 h-auto">
        <button
          className="mb-12 font-bold bg-orange-500 text-white py-1 px-4 rounded-full font-bold hover:bg-orange-700"
          onClick={() => {
            navigate(-1)
          }}
        >
          Back
        </button>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex">
            <img
              src={singleProduct?.imageLinks?.thumbnail}
              alt="Book Cover"
              className="w-auto h-auto"
              style={{ border: "2px solid black" }}
            />
            <div className="ml-6 p-4">
              <h1 className="text-3xl font-bold mb-2">{singleProduct.title}</h1>
              <div className="text-lg mb-4">
                by {singleProduct.authors?.join(", ")}
              </div>
              <div className="text-gray-700 mb-2">
                <span className="font-bold">Published Date:</span>{" "}
                {singleProduct.publishedDate}
              </div>
              <div className="text-gray-700 mb-2">
                <span className="font-bold">Page Count:</span>{" "}
                {singleProduct.pageCount}
              </div>
              <div className="text-gray-700 mb-2">
                <span className="font-bold">Publisher:</span>{" "}
                {singleProduct.publisher}
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Language:</span>{" "}
                {singleProduct.language}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
