import React from 'react';

const Contact = () => {
  const token = localStorage.getItem('access_token');
  console.log(token);

  return (
    <div>
      <h1>Contact Page</h1>
      <p>Feel free to reach out to us!</p>
      <p>Token: {token}</p>
      {/* Add your contact form or any other content here */}
    </div>
  );
};

export default Contact;
