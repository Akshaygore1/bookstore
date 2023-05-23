import React, { useEffect, useState } from "react"
import { useContext } from "react"
import { CartContext } from "./CartContext"

const Cart = () => {
  let total = 0
  const [products, setProducts] = useState([])
  const { cart, setCart } = useContext(CartContext)
  console.log("--------------------", cart)

  const [priceFetched, togglePriceFetched] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!cart.items || priceFetched) {
        return
      }

      console.log("cart", Object.keys(cart.items))
      const idArr = Object.keys(cart.items)

      try {
        const productPromises = idArr.map(async (value) => {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${value}`
          )
          const data = await response.json()
          return { value, ...data.volumeInfo } // Include 'value' along with volumeInfo
        })

        const products = await Promise.all(productPromises)
        setProducts(products)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [cart])

  const getQty = (productId) => {
    console.log(cart.items[productId])
    return cart.items[productId] //returning the quantity of products which we are adding
  }

  const increament = (productId) => {
    const existingQty = cart.items[productId]
    const _cart = { ...cart }
    _cart.items[productId] = existingQty + 1
    _cart.totalItems += 1
    setCart(_cart)
  }

  const decreament = (productId) => {
    const existingQty = cart.items[productId]
    if (existingQty === 1) {
      return
    }
    const _cart = { ...cart }
    _cart.items[productId] = existingQty - 1
    _cart.totalItems -= 1
    setCart(_cart)
  }

  const getSum = (productId, price) => {
    const sum = price * getQty(productId)
    total += sum
    return sum
  }

  const handleDelete = (productId) => {
    const _cart = { ...cart } //cloning the cart using spread operator(...)
    const qty = _cart.items[productId]
    delete _cart.items[productId]
    _cart.totalItems -= qty
    setCart(_cart)
    const updatedProductsList = products.filter(
      (product) => product._id !== productId
    )
    setProducts(updatedProductsList)
  }

  const handlePlaceOrder = () => {
    window.alert("Your Order Has Been Placed Successfully!")
    setProducts([])
    setCart({})
  }
  return products.length ? (
    <div className="container mx-auto lg:w-1/2 w-full pb-24  min-h-screen">
      <h1 className="my-12 font-bold">Cart Items</h1>
      <ul>
        {products.map((product, index) => {
          console.log("===", product)
          return (
            <li className="mb-12" key={product.value}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    className="h-16"
                    src={product.imageLinks.thumbnail}
                    alt="pizza"
                  />
                  <span className="font-bold ml-4 w-48 text-white">
                    {product.title}
                  </span>
                </div>

                <div className="flex items-center ">
                  <button
                    onClick={() => {
                      decreament(product.value)
                    }}
                    className="bg-orange-500 px-4 py-2 rounded-full leading-none font-bold text-white"
                  >
                    -
                  </button>
                  <b className="px-4 text-white">{getQty(product.value)}</b>
                  <button
                    onClick={() => {
                      increament(product.value)
                    }}
                    className="bg-orange-500 px-4 py-2 rounded-full leading-none font-bold"
                  >
                    +
                  </button>
                </div>

                <span>₹ {getSum(index, product.printedPageCount)}</span>

                <button
                  onClick={() => {
                    handleDelete(product.value)
                  }}
                  className="bg-red-600 px-4 py-2 rounded-full leading-none text-white font-bold"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        })}
      </ul>
      <hr className="my-6" />

      <div className="text-right">
        <b className="mr-3">Grand Total:</b> ₹ {total}
      </div>

      <div className="text-right mt-6">
        <button
          onClick={handlePlaceOrder}
          className="bg-orange-500 px-4 py-2 rounded-full leading none text-white font-bold"
        >
          Place Order
        </button>
      </div>
    </div>
  ) : (
    //checking if products are added or not, when no products are added Empty Cart img
    //will be shown
    <img
      className="mx-auto w-1/2 mt-12"
      src="/images/empty-cart.png"
      alt="empty-cart"
    />
  )
}

export default Cart
