import CreateTextBlock from "./createTextBlock";
import CreateImageBlock from "./createImageBlock"
import CreateDynamicBlock from "./createDynamicBlock";
import { useState } from "react";

export default function WorkspaceDropBlock({position, elements, updateElements}) {
    const [display, setDisplay] = useState({display:"block"})
    

    function setNewElement(newElement) {
        let newItems = Array.from(elements);
        newItems.push(newElement)
        
        updateElements(newItems)
        console.log(newElement)
        setDisplay({display:"none"})
    }

    return (
        <div className="workspace__drop-block" style={{...display, position:"fixed", left:`${position.left}px`, top:`${position.top}px`, background:"grey"}}>
            <CreateImageBlock newId={elements.length+1} setNewElement={setNewElement}></CreateImageBlock>
            <CreateTextBlock  newId={elements.length+1} setNewElement={setNewElement}></CreateTextBlock>
            {/* <CreateDynamicBlock newId={elements.length+1} setNewElement={setNewElement}></CreateDynamicBlock> */}
        </div>
    )
}