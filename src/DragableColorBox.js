
import React from "react";
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from "@material-ui/styles";
import {SortableElement} from "react-sortable-hoc"

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.8)"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0,0,0,0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },
  delete: {
    transition: "all 0.3s ease-in-out"
  }
};

const DragableColorBox=SortableElement((props)=> {
  const {classes}=props;
  return (
    <div
      className={props.classes.root}
      style={{ backgroundColor: props.color }}
    >
      <div className={classes.boxContent}>
        <span>{props.name}</span>
        <DeleteIcon className={classes.delete} onClick={props.handleClick}  />
      </div> 
    </div>
  );
})
export default withStyles(styles)(DragableColorBox);