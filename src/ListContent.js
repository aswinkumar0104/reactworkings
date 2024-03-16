import React from "react";
// import { useState } from "react";
import ItemsList from "./ItemsList";

const ListContent = ({ items, handleCheck, handleDelete }) => {
  return (
    <>
      {items.length ? (
        <ItemsList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <h1>Todo list is empty</h1>
      )}
    </>
  );
};

export default ListContent;
