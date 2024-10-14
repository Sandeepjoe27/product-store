import React, { useState } from 'react';
import './css/Home.controller.css';
import { Link } from "react-router-dom";

export default function Home() {
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),  
      });

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      setMessage("Here is your Product");
      const data = await response.json();
      setItems(data);  // Update the items state with the search result
    } catch (error) {
      console.error("Error fetching items:", error);
      setMessage("There is no such product");
    }
  };
 

  const handleWishlist = async (item) => { // Accept item as a parameter
    try {
      const response = await fetch("http://localhost:8000/wishlist", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productname: item.productname, // Pass item details
          category: item.category,
          price: item.price
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      await response.json();
      window.alert("Successfully added to wishlist");
      
    } catch (error) {
      setError(error.message);
    }
  }

  const handledelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/additem/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Update the UI after successful deletion
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      setMessage("Item deleted successfully");  
    } catch (error) {
      setError(error.message);
    }
        
      
  }

  return (
    <>
    <div className="homeContainer">

      <div className="addButtonContainer">
        <button className="addButton">
          <Link to="/additem">Add Items</Link>
        </button>
      </div>
      <div className="updateButtonContainer">
        <button className="updateButton">
          <Link to="/update">Update Items</Link>
        </button>
      </div>

      <form onSubmit={handleSearch} className="searchBarContainer">
        <input
          type="text"
          placeholder="Search by category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="searchBar"
        />
        <button type="submit" className="searchButton">Search</button>
      </form>

      <div className="itemsGrid">
        {items.map((item) => (
          <div className="card" key={item._id}>
            <h3>{item.productname}</h3>
            <p>Category: {item.category}</p>
            <p>Price: ₹{item.price}</p>
            <button onClick={() => handleWishlist(item)}>Add to wishlist</button> 
            <button onClick={() => handledelete(item._id)}>Delete Item</button>
          </div>
        ))}
        <p className="finalMessage">{message}</p>
      </div>
    </div>
    </>
  );
}
