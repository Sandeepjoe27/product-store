import React, { useEffect, useState } from 'react';
import './css/Home.controller.css'; // Assuming you're reusing the same styling

export default function Update() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [editItemId, setEditItemId] = useState(null); // Track which item is being edited
  const [newPrice, setNewPrice] = useState(""); // Store the updated price

  // Fetch all items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8000/additem"); // Fetch all items
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
        setMessage("Failed to load items.");
      }
    };

    fetchItems();
  }, []);

  // Handle the update action
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/additem/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: newPrice }), // Send the new price to the backend
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, price: updatedItem.price } : item
        )
      );
      setEditItemId(null); // Close the edit mode
      setMessage("Item updated successfully");
    } catch (error) {
      console.error("Error updating item:", error);
      setMessage("Failed to update item.");
    }
  };

  return (
    <div className="homeContainer">
      <h1>Update Items</h1>
      {message && <p>{message}</p>}
      <div className="itemsGrid">
        {items.map((item) => (
          <div className="card" key={item._id}>
            <h3>{item.productname}</h3>
            <p>Category: {item.category}</p>
            <p>
              Price: ₹
              {editItemId === item._id ? (
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              ) : (
                item.price
              )}
            </p>
            {editItemId === item._id ? (
              <button onClick={() => handleUpdate(item._id)}>Update</button>
            ) : (
              <button onClick={() => setEditItemId(item._id)}>Edit</button>
            )}
          </div>
        ))}
        {items.length === 0 && <p>No items to display.</p>}
      </div>
    </div>
  );
}
