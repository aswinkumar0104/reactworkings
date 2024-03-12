import React from "react";
import { useState } from "react";

const Content = () => {
  function handleQuoteNames() {
    const names = ["Saving", "Blessing", "Healing"];
    const int = Math.floor(Math.random() * 3);
    setQuotename(names[int]);
  }

  const [count, setCount] = useState(99);
  const [quotename, setQuotename] = useState("Guideing");

  const handleDoubleClick = (name) => {
    console.log("Double clikc", name);
  };
  const handleClick = (e) => {
    console.log("Event", e);
  };

  const increaseValue = () => {
    setCount((count) => count - 1);
    setCount((count) => count - 1);
  };

  return (
    <main>
      <p>Thanks for {quotename}</p>
      <button onClick={() => handleQuoteNames()}>Subscribe</button>
      <button onClick={() => increaseValue()}>-</button>
      <span>{count}</span>
      <button>+</button>
    </main>
  );
};

export default Content;
