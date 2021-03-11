import React, { Component } from 'react'
import MiniPalette from './MiniPalette'
import {Link} from 'react-router-dom'
import { withStyles } from "@material-ui/styles"
import { colors } from '@material-ui/core';
import bg from "../src/styles/bg.svg"

const styles = {
    root: {
        //backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        /* background by SVGBackgrounds.com */
        backgroundColor: "#2e41aa",
        backgroundImage: `url(${bg})`,
        overflow: "scroll"
    },
    container: {
        
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
            color: "white"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)"
    }
};

class PaletteList extends Component {
    goToPalette(id){
        this.props.history.push(`palette/${id}`)
    }
    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.container}>
                    <nav className={this.props.classes.nav}>
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <div className={this.props.classes.palettes}>
                    {this.props.palette.map(palette =>(
                        //one way but not good way
                        // <Link to={`/palette/${palette.id}`}>
                        //     <MiniPalette {...palette} />
                        // </Link>      
                        
                        <MiniPalette {...palette} 
                           handleClick={() => this.goToPalette(palette.id)}
                           handleDelete={this.props.deletePalette}
                           key={palette.id}
                           id={palette.id}
                        />
                           
                        )
                      )}
                    </div>
                </div>
            </div>
        )
    }
}
export default withStyles(styles)(PaletteList);