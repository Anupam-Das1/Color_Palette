import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import './Palette.css'

class Palette extends Component {
    constructor(props){
        super(props);
        this.state= { level: 500 , format: "hex"}
        this.changeLevel=this.changeLevel.bind(this)
        this.changeFormat=this.changeFormat.bind(this)
    }
    changeLevel(level){
        this.setState({ level })
    }
    changeFormat(val){
         this.setState({ format: val })
    }
    render(){
        const {colors,id} = this.props.palette
        const {level,format } = this.state
        const colorBoxes=this.props.palette.colors[this.state.level].map(color => (
            <ColorBox 
                background={color[format]} 
                name={color.name}
                key={color.id}
                id={color.id}
                paletteId={id}
                showLink={true}
                
            />
        )) 
        return( 
            <div className='Palette'>
                <Navbar 
                    level={level} 
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showingAllColors={true}
                />
                {/* Navbar goes here */}
                <div className='Palette-colors'>
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* footer eventually */}
                <footer className="Palette-footer">
                    {this.props.palette.paletteName}
                    <span className="emoji">{this.props.palette.emoji}</span>
                </footer>
            </div>
        )
    }
}
export default Palette;