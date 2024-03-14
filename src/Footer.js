import React from "react";

const Footer = ({ checkItems, setCheckItems, updateCheckItems }) => {
  const year = new Date();
  // const getActiveCheckItems = () => {};
  return (
    <footer>
      Copyright &copy; {year.getFullYear()} - Total{" "}
      {checkItems === undefined ? 1 : checkItems.length} active todo's
    </footer>
  );
};

export default Footer;
