import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles.css";
// const API_URL = "https://congenial-bassoon-q9576gq4xx92454w-5000.app.github.dev/api/auth/login";
// Correct way to construct the API URL
const API_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-5000.github.dev`
  : 'http://localhost:5000';  // Fallback to localhost for local dev
// const host = `${process.env.CODESPACE_NAME}-5000.${process.env.GITHUB_USER}.github.dev`;
const host = `${process.env.CODESPACE_NAME || 'localhost'}-5000.${process.env.GITHUB_USER || 'localhost'}.github.dev`;



export default () => {
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: ''
  });
  const { loginEmail, loginPassword } = formData;
  const navigate = useNavigate();
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (event) => {
    console.log("Access your app at:" + `https://${host}`)
    console.log("CODESPACE_NAME:", process.env.CODESPACE_NAME);
    console.log("GITHUB_USER:", process.env.GITHUB_USER);
    event.preventDefault();

    try {
      // const res = await axios.post('http://localhost:5000/api/auth/login', {
      // const res = await axios.post(`https://congenial-bassoon-q9576gq4xx92454w-5000.app.github.dev/api/auth/login`, {
        const res = await axios.post(`${API_URL}/api/auth/login`, {
        userEmail: loginEmail,
        userPassword: loginPassword,
      });

      console.log('Server Response:', res.data);


      // Store JWT token or other necessary data
      localStorage.setItem('token', res.data.token);

      alert('Login successful!');
      navigate('/dashboard');  // Redirect to a dashboard or home page after login
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Login</h1>

      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="loginEmail" className="form-label">Email:</label>
        <input
          type="email"
          id="loginEmail"
          name="loginEmail"
          className="form-input"
          required
          value={loginEmail}
          onChange={onChange}
        />

        <label htmlFor="loginPassword" className="form-label">Password:</label>
        <input
          type="password"
          id="loginPassword"
          name="loginPassword"
          className="form-input"
          required
          value={loginPassword}
          onChange={onChange}
        />

        <button type="submit" className="form-button">Login</button>

        {/* Reset Password Link */}
        <span className="form-reset-link" onClick={() => navigate('/reset-password')}>
          Forgot your password? Reset it here
        </span>

        <span className="form-switch-link" onClick={() => navigate('/register')}>
          Don't have an account? Register here
        </span>
      </form>
    </div>
  );
};
