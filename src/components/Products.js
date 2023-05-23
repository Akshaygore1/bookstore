import React, { useState, useEffect } from "react"
import Product from "./Product"
import { useLocation } from "react-router-dom"

const Products = ({ category }) => {
  console.log(category)
  const [books, setBooks] = useState([])
  const { location } = useLocation()
  async function fetchBooks() {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${category}&key=AIzaSyCS4ROvsyMQFPbHWyf2w4iRLivX36cohSQ`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }

      const data = await response.json()
      console.log(data)
      const fetchedBooks = data.items || []
      setBooks(fetchedBooks)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [category])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.slice(0, 8).map((book) => (
        <Product key={book.id} book={book.volumeInfo} id={book.id} />
      ))}
    </div>
  )
}

export default Products
