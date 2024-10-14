import React, { useState } from "react";
import styles from "./css/Account.module.css"; // Import the same or a new CSS module
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password, confirmPassword }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      await response.json();
      window.alert("sucessfully registered")
      navigate("/account"); // Redirect to the login page after successful signup
    } catch (error) {
      setError(error.message);
    }
  };

  

  return (
    <>
    <div className={styles.body}>
    <div className={styles.loginContainer}>
      <h2 className={styles.loginHeader}>Create an Account</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" className={styles.loginButton}>
          Sign Up
        </button>
      </form>
      <p className={styles.signupLink}>
        Already have an Account <Link to="/account">Login</Link>
      </p>
    </div>
    </div>
    </>
  );
}
