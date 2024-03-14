import React from "react";
// import { useState } from "react";
import ItemsList from "./ItemsList";

const ListContent = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ItemsList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <h1>Todo list is empty</h1>
      )}
    </main>
  );
};

export default ListContent;
