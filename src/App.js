import Header from "./Header";
import ListContent from "./ListContent";
// import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";
import AddItem from "./AddItem";
import SearchTodo from "./SearchTodo";

function App() {
  const [items, setItems] = useState(
    localStorage.getItem("todo_data") !== undefined
      ? JSON.parse(localStorage.getItem("todo_data"))
      : [
          { id: 1, checked: false, value: "Practice Coding" },
          { id: 2, checked: true, value: "Review tickets" },
          { id: 3, checked: true, value: "Do Exercise" },
        ]
  );

  const [checkItems, setCheckItems] = useState();

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    updateCheckItems(listItems);
    localStorage.setItem("todo_data", JSON.stringify(listItems));
  };

  const updateCheckItems = (listItems) => {
    const CheckItems = listItems.filter((item) => !item.checked);
    console.log(checkItems);
    setCheckItems(CheckItems);
  };

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    updateCheckItems(newItems);
    setItems(newItems);
  };

  const addItem = (value) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addnewitem = { id, checked: false, value };

    const listItems = [...items, addnewitem];
    console.log(listItems);
    updateCheckItems(listItems);
    setItems(listItems);
    setNewItem("");
    localStorage.setItem("todo_data", JSON.stringify(listItems));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    console.log(newItem);
  };

  return (
    <div className="App">
      <Header title="To do list - new" />
      {/* <Content /> */}
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchTodo search={search} setSearch={setSearch} />
      <ListContent
        items={items.filter((item) =>
          item.value.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer
        checkItems={checkItems}
        setCheckItems={setCheckItems}
        updateCheckItems={updateCheckItems}
      />
    </div>
  );
}

export default App;
