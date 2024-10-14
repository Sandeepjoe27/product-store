import React, { useState } from "react";
import styles from "./css/Account.module.css"; 
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      window.alert("Login credentils are accepted");
      navigate("/");
      console.log(data.message); // You can handle the successful login here
    } catch (error) {
      console.error(error.message);
      window.alert("there is no such email or password is exist");
      setError(error.message);
    }
  };
  

  return (
    <>
    <div className={styles.body}>
    <div className={styles.loginContainer}>
      <h2 className={styles.loginHeader}>Welcome Back!</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit} method="POST" action="/account">
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
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
        <p className={styles.signupLink}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
        
      </form>
    </div>
    </div>
    </>
  );
}
