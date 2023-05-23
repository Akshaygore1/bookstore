import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navigation from "./components/Navigation"
import ProductsPage from "./pages/ProductsPage"
import Cart from "./pages/Cart"
import SingleProduct from "./pages/SingleProduct"
import { CartContext } from "./pages/CartContext"
import { useEffect, useState } from "react"
import { getCart, storeCart } from "./pages/helpers"

function App() {
  const [cart, setCart] = useState({})

  //fetch cart from local.storage

  useEffect(() => {
    getCart().then((cart) => {
      setCart(JSON.parse(cart))
    })
  }, [])

  return (
    <div className="bg-black">
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navigation />
          <Routes>
            <Route
              path="/"
              exact={false}
              element={<ProductsPage category="Money" />}
            />
            <Route
              path="/Fiction"
              exact={false}
              element={<ProductsPage category="Fiction" />}
            />
            <Route
              path="/Travel"
              exact={false}
              element={<ProductsPage category="Travel" />}
            />
            <Route
              path="/childrens"
              exact={false}
              element={<ProductsPage category="childrens" />}
            />
            <Route path="/books/:_id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartContext.Provider>
      </Router>
    </div>
  )
}

export default App
