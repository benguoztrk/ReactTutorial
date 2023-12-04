import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";

function App() {
  // This useState and handleCheck, handleDelete functions initially inside the content.js component file. I want to display how many list items there are at the footer. They're all stored in the content component initially. So footer needs to access content component. But they are sibling components and we can't just reach over to the content component and get the data that we need. So that's why we need to take some of that data from the content component and move it up to app.js(parent component). Then drill it down to both content and footer components. This is called prop drilling

  //  const [items, setItems] = useState([
  //   {
  //     id: 1,
  //     checked: true,
  //     item: "One half pound bag of Cocoa Covered Almonds Unsalted",
  //   },
  //   {
  //     id: 2,
  //     checked: false,
  //     item: "Item 2",
  //   },
  //   {
  //     id: 3,
  //     checked: false,
  //     item: "Item 3",
  //   },
  // ]);

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist"))
  );

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppinglist", JSON.stringify(newItems)); // Store the state of listItems in localStorage
  };

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem]; //this is our new list
    setAndSaveItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ); //map the items array and change the items.checked value according to the ternary operator conditions
    setAndSaveItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id); //if the item.id is not equal to id, filter that out and put them into a new array
    setAndSaveItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //It's prevents reloading the page
    if (!newItem) return;
    //console.log(newItem);
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      {/* Sending header component to title props */}
      <Header title="Groceries List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        //sending items, handleCheck and handleDelete props
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )} //for search bar
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
