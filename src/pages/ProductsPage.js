import React from "react"
import Products from "../components/Products"

const ProductsPage = ({ category }) => {
  return (
    <div className="p-20">
      <Products category={category} />
    </div>
  )
}

export default ProductsPage
