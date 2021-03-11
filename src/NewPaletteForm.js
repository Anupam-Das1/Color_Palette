import React, { Component } from "react";
// import {ColorPickerForm} from "./ColorPickerForm"
import {Link} from "react-router-dom"
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from "./PaletteFormNav"
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {ChromePicker} from 'react-color'
import { Button, colors } from "@material-ui/core";
import DragableColorBox from './DragableColorBox'
import DraggableColorList from './DraggableColorList'
import {ValidatorForm,TextValidator} from "react-material-ui-form-validator"
import {arrayMove} from "react-sortable-hoc"
const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center",
  },
  drawerHeader: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: "90%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
  },
  buttons: {
    width: "100%",

  },
  button: {
    width: "50%",

  },
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",

  },
  colorNameInput: {
    width: "100%",
    height: "60px",
  },
});

class NewPaletteForm extends Component {
  constructor(props){
    super(props);
    this.state={
      open: true,
      currentColor: "teal",
      newColorName: "",
      colors: this.props.palette[0].colors,
      newPaletteName: "",

    }
    this.updateCurrentColor=this.updateCurrentColor.bind(this);
    this.addNewColor=this.addNewColor.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.removeColor=this.removeColor.bind(this);
    this.clearColors=this.clearColors.bind(this);
    this.addRandomColor=this.addRandomColor.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.state.colors.every(({ color }) => color !== this.state.currentColor)
    );
    ValidatorForm.addValidationRule("isPaletteUnique", value =>
      this.props.palette.every(({ paletteName }) =>paletteName.toLowerCase() 
      !== value.toLowerCase())
    );
    
  }
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  updateCurrentColor(newColor){
    this.setState({currentColor: newColor.hex})
  }
  addNewColor() {
    const newColor={
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.setState({colors: [...this.state.colors,newColor]})
  }
  handleChange(evt){
    this.setState({
    [evt.target.name]: evt.target.value
    })
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  handleSubmit(newPalette){ 
    newPalette.id=newPalette.paletteName.toLowerCase().replace(/ /g,"_");
    newPalette.colors=this.state.colors;
    this.props.savePalette(newPalette)
    this.props.history.push("/")
  }
  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }
  clearColors(){
    this.setState({colors: []})
  }
  addRandomColor(){
    //pic random color from existing palettes
    const allColors=this.props.palette.map(p=>p.colors).flat();
    var ran=Math.floor(Math.random()*allColors.length);
    const randomColor=allColors[ran];
    this.setState(
      {colors:[...this.state.colors,randomColor ]}
    )

  }
  render() {
    const { classes,palette } = this.props;
    const { open } = this.state;

    return (
      <div>
        <h1>New Palette Form!</h1>
      <div className={classes.root}>
        <PaletteFormNav 
          open={open}
          //classes={classes}
          palette={palette}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
          <Typography variant='h4' gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button variant="contained" color="secondary" onClick={this.clearColors } className={classes.button}>
              Clear Palette
            </Button>
            <Button variant="contained" color="primary" onClick={this.addRandomColor } className={classes.button}>
              Random Color
            </Button>
          </div>
          <div>
          <ChromePicker 
            color={this.state.currentColor}
            onChangeComplete={this.updateCurrentColor}
            className={classes.picker}
          />
          <ValidatorForm onSubmit={this.addNewColor} ref="form">
            <TextValidator 
              className={classes.colorNameInput}
              value={this.state.newColorName} 
              placeholder="Color Name"
              name='newColorName'
              variant="filled"
              margin="normal"
              onChange={this.handleChange} 
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "Enter a color name",
                "Color name must be unique", 
                "Color already used!"
              ]}
            />
            <Button className={classes.addColor} variant='contained' color='primary'
            type="submit"
            style={{backgroundColor: this.state.currentColor}}
            //onClick={this.addNewColor}  
            >
              Add Color
            </Button>
          </ValidatorForm>
          </div>
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
            colors={this.state.colors} 
            axis="xy"
            onSortEnd={this.onSortEnd}
            removeColor={this.removeColor}
          />
          {/* {this.state.colors.map(color => (
            <DragableColorBox color={color.color} name={color.name}/>
          ))} */}
          
        </main>
      </div>
      </div>
    );
  }
}
//export default NewPaletteForm;
export default withStyles(styles, { withTheme: true })(NewPaletteForm);