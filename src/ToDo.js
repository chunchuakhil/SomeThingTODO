import {
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@material-ui/core";
import React, { useState } from "react";
import "./ToDo.css";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Card from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function ToDoComponent(props) {
  console.log("ToDoComponent -> props", props);
  const [open, setopen] = useState(false);
  const [update, setupdate] = useState();
  return (
    <div>
      <Dialog open={open} onClose={() => setopen(false)}>
        <DialogTitle id="alert-dialog-title">{"Edit ToDo...."}</DialogTitle>
        <DialogContent>
          <Input
            onChange={(e) => setupdate(e.target.value)}
            defaultValue={props.todo.todo}
            inputProps={{ "aria-label": "description" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setopen(false);
              db.collection("todos").doc(props.todo.id).update({
                todo: update,
              });
            }}
            color="primary"
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <List className="todo_list">
        <Card>
          <ListItem>
            <ListItemText
              primary={props.todo.todo}
              secondary="Dead Line..."
            ></ListItemText>
            <Button onClick={(e) => setopen(true)}>
              <EditIcon></EditIcon>
            </Button>
            <Button
              onClick={(event) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
              variant="contained"
              color="secondary"
            >
              Delete <DeleteForeverIcon />
            </Button>
          </ListItem>
        </Card>
      </List>
    </div>
  );
}

export default ToDoComponent;
