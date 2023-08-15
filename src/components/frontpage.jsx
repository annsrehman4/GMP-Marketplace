import React from 'react';
import { Link } from 'react-router-dom';


function FrontPage() {
  
  

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    margin: '0.5rem',
    borderRadius: '5px',
  };

  

  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f4f4f4', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome to GIKI Marketplace!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Please select an option:</p>
      <Link to="/login">
      <button style={buttonStyle} >Login</button>
      </Link>
      <Link to="/signup">
      <button style={buttonStyle} >SignUp</button>
      </Link>
    </div>
  );
}

export default FrontPage;
