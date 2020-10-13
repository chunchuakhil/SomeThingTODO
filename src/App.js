import React, { useEffect, useState } from "react";
import { Button, Input, InputLabel, FormControl } from "@material-ui/core";

import ToDoComponent from "./ToDo";
import db from "./firebase";
import "./App.css";
import firebase from "firebase";

function App() {
  //when app loads=>listen to database. when we add/remove
  //todo => do same thing in database, and that data should be
  //stored in the todo variable

  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    //when app loads this will fire
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapShot) => {
        setTodo(
          snapShot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []); //if array is blank=>this will run only once, when app.js loads
  //if you put any variable inside array=> if that variable changes, then app.js will be called and useEffect

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="App">
      <h1>React ToDo App</h1>
      <form>
        <FormControl>
          <InputLabel>write ToDo</InputLabel>
          <Input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </FormControl>
        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add ToDo
        </Button>
      </form>

      <ul className="todo_items">
        {todo.map((todo, index) => {
          return <ToDoComponent todo={todo} />;
        })}
      </ul>
    </div>
  );
}

export default App;
