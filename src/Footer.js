import React from "react";

const Footer = ({ length }) => {
  return (
    <footer>
      <p>
        {/* if items.length is 1 return "item" if it is not return "items*/}
        {length} list {length === 1 ? "item" : "items"}
      </p>
    </footer>
  );
};

export default Footer;
