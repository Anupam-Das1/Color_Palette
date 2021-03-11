import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Picker} from "emoji-mart"
import 'emoji-mart/css/emoji-mart.css'
class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //open: true, 
      stage:"form",
      newPaletteName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  showEmojiPicker(){
    this.setState({stage: "emoji"})
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSubmit(newPalette);
  }
  render() {
    const { newPaletteName } = this.state;

    return (
        <div>
        <Dialog open={this.state.stage==='emoji'}>
          <DialogTitle>
            Choose A Palette Emoji
          </DialogTitle>
          <Picker title="Pick a Color Emoji" onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={this.state.stage==='form'}
          onClose={this.props.hideForm}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Choose A Palette Name</DialogTitle>
          <ValidatorForm
              onSubmit={this.showEmojiPicker}
            >
          <DialogContent>
              <DialogContentText>
                Please Enter A Name For Your Palette, Make Sure It is Unique
              </DialogContentText>
               
              <TextValidator
                label='Palette Name'
                value={newPaletteName}
                name='newPaletteName'
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}
              />             
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.hideForm} color='primary'>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
                Save Palette
              </Button>
          </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}
export default PaletteMetaForm;