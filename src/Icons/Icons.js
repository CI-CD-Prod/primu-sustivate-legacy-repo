// Icons.js

import React from "react";

export const GreenLeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <rect width="24" height="24" fill="none" />
    <path fill="#34d5a0" d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8" />
  </svg>
);

export const YellowLeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <rect width="24" height="24" fill="none" />
    <path fill="#fde230" d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8" />
  </svg>
);

export const RedLeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <rect width="24" height="24" fill="none" />
    <path fill="#ff0000" d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8" />
  </svg>
);

export const getLeafIcon = (score) => {
  if (score > 1.4) {
    return <GreenLeafIcon />;
  } else if (score >= 0.8 && score <= 1.4) {
    return <YellowLeafIcon />;
  } else {
    return <RedLeafIcon />;
  }
};
