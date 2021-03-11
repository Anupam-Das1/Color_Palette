import React, { Component } from 'react'
import { withStyles } from "@material-ui/styles"
import DeleteIcon from "@material-ui/icons/Delete"
import { colors } from '@material-ui/core';
const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        position: "relative",
        padding: "0.5rem",
        Overflow: "hidden",
        cursor: "pointer",
        "&:hover svg": {
            opacity: 1,
        }
    },
    colors: {
        backgroudColor: "#dae1e4",
        height: "150px",
        width: "100%",
        borderRadius: "6px",
        Overflow: "hidden",
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        padding: "0.5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"   
    } ,
    delete: {

    },
    DeleteIcon: {
        color: "white",
        backgroundColor: "#eb3d30",
        width: "20px",
        height: "20px",
        position: "absolute",
        right: "0px",
        top: "0px",
        padding: "10px",
        zIndex: 8,
        opacity: 0,
        
    }

};
class MiniPalette extends Component {
    constructor(props){
        super(props);
        this.deletePalette=this.deletePalette.bind(this)
    }
    deletePalette(e){
        e.stopPropagation();
        //alert("Deleted");
        this.props.handleDelete(this.props.id)
    }
    render(){ 
        const {classes,paletteName,emoji,colors}=this.props;
        const miniColorBoxes = colors.map(color => (
            <div 
                className={classes.miniColor} 
                style={{backgroundColor: color.color}}
                key={color.name}
            />
        ))
        return(
        <div className={classes.root} onClick={this.props.handleClick}>
            <div className={classes.delete}>
                <DeleteIcon 
                    className={classes.DeleteIcon} 
                    style={{transition: "all 0.4s ease-in-out"}}
                    onClick={this.deletePalette}
                   // onClick={()=>alert("Click !")}
                />
            </div>
            <div className={classes.colors}>
                {/* mini color boxes */}
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
            
        </div>
    )
  }
}
export default withStyles(styles)(MiniPalette);