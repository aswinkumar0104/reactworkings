import Header from "./Header";
import ListContent from "./ListContent";
// import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import SearchTodo from "./SearchTodo";
import APIRequest from "./APIRequest";

function App() {
  const API_URL = "http://localhost:7000/items";
  const [items, setItems] = useState(
    []
    // localStorage.getItem("todo_data") !== undefined
    //   ? JSON.parse(localStorage.getItem("todo_data"))
    //   : [
    //       { id: 1, checked: false, value: "Practice Coding" },
    //       { id: 2, checked: true, value: "Review tickets" },
    //       { id: 3, checked: true, value: "Do Exercise" },
    //     ]
  );

  const [checkItems, setCheckItems] = useState();

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");

  const [fetchError, SetFetchError] = useState(null);

  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    //JSON.parse(localStorage.getItem("todo_data"));
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data Not Received");
        //console.log(response);
        const listItems = await response.json();
        console.log(listItems);
        setItems(listItems);
        SetFetchError(null);
      } catch (err) {
        console.log(err.stack);
        SetFetchError(err.message);
      } finally {
        SetIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    updateCheckItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const requestURL = `${API_URL}/${id}`;
    const result = await APIRequest(requestURL, updateOptions);
    if (result) {
      SetFetchError(null);
    }
    //localStorage.setItem("todo_data", JSON.stringify(listItems));
  };

  const updateCheckItems = (listItems) => {
    const CheckItems = listItems.filter((item) => !item.checked);
    console.log(checkItems);
    setCheckItems(CheckItems);
  };

  const handleDelete = async (id) => {
    const newItems = items.filter((item) => item.id !== id);
    updateCheckItems(newItems);
    setItems(newItems);
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const requestURL = `${API_URL}/${id}`;
    const result = await APIRequest(requestURL, deleteOptions);
    if (result) {
      SetFetchError(null);
    }
  };

  const addItem = (value) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addnewitem = { id, checked: false, value };

    const listItems = [...items, addnewitem];
    console.log(listItems);
    updateCheckItems(listItems);
    setItems(listItems);
    setNewItem("");
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addnewitem),
    };

    const result = APIRequest(API_URL, postOptions);
    if (result) {
      SetFetchError(null);
    }
    //localStorage.setItem("todo_data", JSON.stringify(listItems));
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
      <main>
        {isLoading && <p>{`Data is Loading...`}</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <ListContent
            items={items.filter((item) =>
              item.value.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer
        checkItems={checkItems}
        setCheckItems={setCheckItems}
        updateCheckItems={updateCheckItems}
      />
    </div>
  );
}

export default App;
