import React from "react";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

const ListContent = () => {
  const [items, setItems] = useState([
    { id: 1, checked: false, value: "Practice Coding" },
    { id: 2, checked: true, value: "Review tickets" },
    { id: 3, checked: true, value: "Do Exercise" },
  ]);
  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id != id);
    setItems(newItems);
  };
  return (
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              <label
                style={item.checked ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => handleCheck(item.id)}
              >
                {item.value}
              </label>
              <FaTrashCan
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(item.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h1>Todo list is empty</h1>
      )}
    </main>
  );
};

export default ListContent;
