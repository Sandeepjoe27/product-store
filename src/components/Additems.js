import React, { useState } from "react";
import styles from "./css/additem.controller.module.css";

export default function Additems() {
    const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  // const [image, setImage] = useState(null);
  const [, setError] = useState("");

  // const handleImageUpload = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({productname: productName, category, price }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      await response.json();
      window.alert("Item added successfully");
      setProductName("");
      setCategory("");
      setPrice("");
    } catch (error) {
      setError(error.message);
    }
  };
    return (
        <>
        <div className={styles.wholeform}>
            <div className={styles.formContainer}>
        <h2 className={styles.formHeader}>Add New Product</h2>
        <form onSubmit={handleSubmit} className={styles.productForm} method="POST" action="/additem">
            
            <div className={styles.inputContainer}>
            <label htmlFor="productName">Product Name:</label>
            <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />
            </div>

            <div className={styles.inputContainer}>
            <label htmlFor="category">Category:</label>
            <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            </div>

            <div className={styles.inputContainer}>
            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            </div>

            <div className={styles.inputContainer}>
            <label htmlFor="imageUpload">Upload Image:</label>
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                // onChange={handleImageUpload}
                // required
            />
            </div>

            <button type="submit" className={styles.submitButton}>
            Add Product
            </button>
        </form>
        </div>
        </div>
        </>
    )
}