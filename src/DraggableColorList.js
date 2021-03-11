
import React from "react";
import DraggableColorBox from "./DragableColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({ colors, removeColor, }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
          //handleRemove={handleRemove(color.name)}
        />
      ))}
    </div>
  );
});
export default DraggableColorList;