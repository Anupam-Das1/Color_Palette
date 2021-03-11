import React, { Component } from 'react'
import NewPaletteForm from './NewPaletteForm'
import { Route, Switch} from 'react-router-dom'
import Palette from './Palette'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import seedColor from './seedColor'
import { generatePalette } from './colorHelper'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes=JSON.parse(window.localStorage.getItem("palettes"));
    this.state={
      palette: savedPalettes || seedColor
    }
    this.savePalette=this.savePalette.bind(this);
    this.findPalette=this.findPalette.bind(this);
    this.deletePalette=this.deletePalette.bind(this);
  }
  findPalette (id){
    return this.state.palette.find(function(palette){
      return palette.id===id
    })
  }
  deletePalette(id){
    this.setState(
      st=>( {palette: st.palette.filter(palette=>palette.id!==id)} ),
      this.syncLocalStorage
    )
  }
  savePalette(newPalette){
    //console.log(newPalette)
    this.setState({palette: [...this.state.palette,newPalette]},
        this.syncLocalStorage
    )
  }
  syncLocalStorage(){
    window.localStorage.setItem("palettes",JSON.stringify(this.state.palette));
  }
  render(){
    console.log(generatePalette(seedColor[4]))
    return(
      <Switch>
        <Route
          exact
          path="/palette/new"
          render= {
            (routeProps) => <NewPaletteForm palette={this.state.palette} savePalette={this.savePalette} {...routeProps} />
          }
        />
        <Route 
          exact 
          path='/' 
          render={(routeProps) => <PaletteList palette={this.state.palette
          } deletePalette={this.deletePalette} {...routeProps}/>} 
        />
        <Route exact path='/palette/:id' 
          render={(routeProps) => (
            <Palette palette={
             generatePalette( this.findPalette(routeProps.match.params.id))}
            />)}
        /> 
        <Route 
          exact
          path="/palette/:paletteId/:colorId" 
          render={(routeProps) => (
            <SingleColorPalette 
             colorId={routeProps.match.params.colorId}
             palette={generatePalette( 
               this.findPalette(routeProps.match.params.paletteId))}
            />)}
        />
      </Switch>
    )
  }
}

export default App;
