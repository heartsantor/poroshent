import React from 'react';

const IconReload = ({ isLoading }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={isLoading ? 'rotate' : ''}>
      <path
        d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C9.24 18 7 15.76 7 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5H12Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconReload;
