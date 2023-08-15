import React from 'react';
import { useUserAuth } from '../context/UserAuthContextProvider';
import { useNavigate } from 'react-router-dom';



const Navbar = ({  onSell }) => {

  const {logOut} = useUserAuth();
  const navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#FF5733',
    color: 'white',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '24px',
    marginRight: '20px', // Add spacing between title and buttons
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '10px',
    padding: '8px 12px', // Add padding to buttons
    borderRadius: '4px',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: 'white',
    color: '#FF5733',
  };
  const handleLogOut=() =>{
      console.log("Logging out");
      logOut();
      navigate("/login");
    
  }

  return (
    <nav style={navbarStyle}>
      <div style={titleStyle}>GIKI MARKET PLACE</div>
      <div>
        <button onClick={onSell} style={{ ...buttonStyle, ...buttonHoverStyle }}>
          Sell
        </button>
        <button onClick={handleLogOut} style={{ ...buttonStyle, ...buttonHoverStyle }}>
          Logout
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;
