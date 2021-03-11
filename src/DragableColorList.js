import React from 'react'
import DragableColorBox from './DragableColorBox'
import {SortableContainer} from "react-sortable-hoc"
const DragableColorList=SortableContainer( ({colors})=>{
    return (
        <div style={{height: "100%"}}>
          {
            colors.map((color,i)=>(
              <DragableColorBox 
                index={i}
                color={color.value} 
                name={color.name} 
             />
            ))
          }
        </div>
    )
})

export default DragableColorList