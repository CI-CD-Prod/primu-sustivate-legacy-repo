// src/components/NotFound.js
import React from 'react';

const NotFound = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    textAlign: 'center',
    flexDirection: 'column',
  };

  const headingStyle = {
    fontSize: '3em',
    marginBottom: '0.5em',
  };

  const paragraphStyle = {
    fontSize: '1.5em',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404 - Page Not Found</h1>
      <p style={paragraphStyle}>The page you are looking for does not exist.</p>
      <a href='/'>Go to homepage</a>
    </div>

  );
};

export default NotFound;
