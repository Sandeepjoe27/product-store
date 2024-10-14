import React, { useEffect, useState } from 'react';
import './css/Home.controller.css';
import emptycart from './assests/emptycart.svg'

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/wishlist"); // Adjust the endpoint based on your backend
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist items");
        }
        const data = await response.json();
        setWishlistItems(data);  // Set the fetched wishlist items
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        setMessage("Failed to load wishlist items.");
      }
    };

    fetchWishlistItems();
  }, []);

  const handledeleteWishlist = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete wishlist item");
      }

      // Update the UI after successful deletion
      setWishlistItems((prevItems) => prevItems.filter(item => item._id !== id));
      setMessage("Item removed from wishlist");
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      setMessage("Failed to remove item from wishlist.");
    }
  };

  return (
    <div className="homeContainer">
      <h2>Your Wishlist</h2>
      {message && <p>{message}</p>}
      <div className="itemsGrid">
        {wishlistItems.map((item) => (
          <div className="card" key={item._id}>
            <h3>{item.productname}</h3>
            <p>Category: {item.category}</p>
            <p>Price: ₹{item.price}</p>
            <button onClick={() => handledeleteWishlist(item._id)}>Remove from wishlist</button>
          </div>
        ))}
        {wishlistItems.length === 0 && <div>No items in your wishlist &&  <img src={emptycart} alt="emptycart" /></div>}
      </div>
    </div>
  );
}
